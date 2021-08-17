package com.citrix.microapps.bundlegen.bundles;

import java.io.File;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.citrix.microapps.bundlegen.pojo.DipMetadata;
import com.citrix.microapps.bundlegen.pojo.HttpMetadata;
import com.citrix.microapps.bundlegen.pojo.Metadata;
import com.citrix.microapps.bundlegen.pojo.ScriptMetadata;
import com.citrix.microapps.bundlegen.pojo.TemplateFile;
import com.citrix.microapps.bundlegen.pojo.Type;

import static com.citrix.microapps.bundlegen.TestUtils.path;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.METADATA_FILE;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TEMPLATE_FILE;
import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BundlesLoaderTest {

    private static final String BUNDLE_ID = "00b31529-bc3f-4dab-84c9-b0a539d51d73";

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesOkProvider")
    void checkMandatoryFilesOk(List<Path> input) {
        assertListEqualsInAnyOrder(Collections.emptyList(), BundlesLoader.checkMandatoryFiles(input, false));
    }

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesOkProviderForComingSoon")
    void checkMandatoryFilesOkForComingSoon(List<Path> input) {
        assertListEqualsInAnyOrder(Collections.emptyList(), BundlesLoader.checkMandatoryFiles(input, true));
    }

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesIssuesProvider")
    void checkMandatoryFilesIssues(List<Path> input, boolean comingSoonBundleFlag, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.checkMandatoryFiles(input, comingSoonBundleFlag);
        assertListEqualsInAnyOrder(toMessages(issues), expectedMessages);
    }

    @Test
    void checkTranslationChecksumOk() {
        FsDipBundle fsDipBundle = new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle1/0.0.1"),
                asList(
                        Paths.get("i18n", "de.json"),
                        Paths.get("i18n", "en.json"),
                        Paths.get("i18n", "es.json"),
                        Paths.get("i18n", "fr.json"),
                        Paths.get("i18n", "ja.json"),
                        Paths.get("i18n", "nl.json"),
                        Paths.get("i18n", "zh-CN.json"),
                        Paths.get("file.sapp")));

        assertListEqualsInAnyOrder(Collections.emptyList(), BundlesLoader.checkLocalizations(
                fsDipBundle,
                Optional.of("C0F2F04FD59370AC01C7525DAB3163D7"),
                false));
    }

    @Test
    void checkTranslationWithIncreasedNumberOfTranslationKeys() {
        FsDipBundle fsDipBundle =
                new FsDipBundle(path("src/test/resources/bundles_broken_translation_keys/dip/vendor/bundle/0.0.1"),
                        asList(
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("file.sapp")));

        List<ValidationException> validationExceptions = BundlesLoader.checkLocalizations(
                fsDipBundle,
                Optional.of("C0F2F04FD59370AC01C7525DAB3163D7"),
                false);
        assertListEqualsInAnyOrder(Collections.singletonList("Translation checksum mismatch en.json"),
                toMessages(validationExceptions));
    }

    @Test
    void checkTranslationWithIncreasedNumberOfTranslationKeysForComingSoon() {
        FsComingSoonBundle fsDipBundle =
                new FsComingSoonBundle(
                        path("src/test/resources/bundles_broken_translation_keys/dip/vendor/bundle/0.0.1"),
                        asList(
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("file.sapp")));

        List<ValidationException> validationExceptions = BundlesLoader.checkLocalizations(
                fsDipBundle,
                Optional.of("C0F2F04FD59370AC01C7525DAB3163D7"),
                true);
        assertListEqualsInAnyOrder(Collections.emptyList(), validationExceptions);
    }

    @Test
    void checkBestPractisesMetadataFile() {
        FsHttpBundle bundle =
                new FsHttpBundle(
                        path("src/test/resources/bundles/http/vendor1/SAP-SuccessFactors-EC-2"),
                        asList(Paths.get("metadata.json")));
        List<ValidationException> validationWarnings = new ArrayList<>();
        Optional<Metadata> metadata = BundlesLoader.loadAndValidateMetadata(validationWarnings, bundle);

        assertThat(metadata).isPresent();
        assertListEqualsInAnyOrder(Collections.singletonList("Integration does not use OAuth for writeback actions"),
                toMessages(validationWarnings));
    }

    @Test
    void checkBestPractisesTemplateFile() {
        FsHttpBundle bundle =
                new FsHttpBundle(
                        path("src/test/resources/bundles/http/vendor1/SAP-SuccessFactors-EC-2"),
                        asList(Paths.get("file.sapp"), Paths.get("metadata.json")));
        List<ValidationException> validationWarnings = new ArrayList<>();
        Optional<Metadata> metadata = BundlesLoader.loadAndValidateMetadata(validationWarnings, bundle);
        Optional<TemplateFile> templateFile = BundlesLoader.loadAndValidateTemplateFile(validationWarnings,
                bundle, metadata);

        assertThat(templateFile).isPresent();
        assertListEqualsInAnyOrder(asList(
                "Integration configuration is not using an authentication method",
                "Endpoint `testEndpoint` does not use pagination",
                "Endpoint `testEndpoint` does not use incremental syncs",
                "Endpoint `testEndpoint` appears to implement a secret in plaintext",
                "Service action `testAction` does not use update before action",
                "Service action `testAction` does not use update after action",
                "Integration does not use OAuth for writeback actions"),
                toMessages(validationWarnings));
    }

    @Test
    void checkAbsoluteUrlForLibraryIcon() {
        FsHttpBundle bundle =
                new FsHttpBundle(
                        path("src/test/resources/bundles/http/vendorForIconUrlTest/SAP-SuccessFactors-EC"),
                        asList(Paths.get("file.sapp"), Paths.get("metadata.json")));
        List<ValidationException> validationWarnings = new ArrayList<>();
        Optional<Metadata> metadata = BundlesLoader.loadAndValidateMetadata(validationWarnings, bundle);
        Optional<TemplateFile> templateFile = BundlesLoader.loadAndValidateTemplateFile(validationWarnings,
                bundle, metadata);

        assertThat(templateFile).isPresent();
        assertListEqualsInAnyOrder(asList(
                "LIBRARY type iconUrl must be relative and start with `exported/`",
                "Same iconUrl must be specified in both metadata.json and service configuration"),
                toMessages(validationWarnings));
    }

    @Test
    void checkIconTypeMissing() {
        FsHttpBundle bundle =
                new FsHttpBundle(
                        path("src/test/resources/bundles/http/vendorForIconUrlTest" +
                                "/SAP-SuccessFactors-EC-2"),
                        asList(Paths.get("file.sapp"), Paths.get("metadata.json")));
        List<ValidationException> validationWarnings = new ArrayList<>();
        Optional<Metadata> metadata = BundlesLoader.loadAndValidateMetadata(validationWarnings, bundle);
        Optional<TemplateFile> templateFile = BundlesLoader.loadAndValidateTemplateFile(validationWarnings,
                bundle, metadata);

        assertThat(templateFile).isPresent();
        assertListEqualsInAnyOrder(toMessages(validationWarnings), asList(
                "Loading of bundle metadata failed: " +
                        "src/test/resources/bundles/http/vendorForIconUrlTest/SAP-SuccessFactors-EC-2/metadata.json"
                                .replace('/', File.separatorChar),
                "Both iconUrl and iconType have to be specified",
                "Unsupported iconType: null",
                "Same iconUrl must be specified in both metadata.json and service configuration"));
    }

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesOkProvider")
    void checkUnexpectedFilesOk(List<Path> input) {
        assertListEqualsInAnyOrder(Collections.emptyList(), BundlesLoader.checkUnexpectedFiles(input, false));
    }

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesOkProviderForComingSoon")
    void checkUnexpectedFilesOkForComingSoon(List<Path> input) {
        assertListEqualsInAnyOrder(Collections.emptyList(), BundlesLoader.checkUnexpectedFiles(input, true));
    }

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesIssuesProvider")
    void checkUnexpectedFilesIssues(List<Path> input, boolean comingSoonBundleFlag, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.checkUnexpectedFiles(input, comingSoonBundleFlag);
        assertListEqualsInAnyOrder(expectedMessages, toMessages(issues));
    }

    @Test
    void checkUnexpectedScriptFilesIssues() {
        // quick test for unexpected JS file, can't be part of parameterized checkUnexpectedFilesIssues because
        // can't distinguish between valid and invalid file on different OS/environments
        List<Path> input = toPaths("script1.js", "script2.js");
        List<ValidationException> issues = BundlesLoader.checkUnexpectedFiles(input, false);
        assertThat(toMessages(issues))
                .containsAnyElementsOf(asList("Unexpected file: script1.js", "Unexpected file: script2.js"));
        assertEquals(issues.size(), 1);
    }

    @ParameterizedTest
    @MethodSource("validateLanguagesOkProvider")
    void validateLanguagesOk(FsBundle bundle, List<String> languages) {
        assertEquals(Optional.empty(), BundlesLoader.validateLanguages(bundle, languages));
    }

    @ParameterizedTest
    @MethodSource("validateLanguagesIssuesProvider")
    void validateLanguagesIssues(FsBundle bundle, List<String> languages, String expectedMessage) {
        Optional<ValidationException> issue = BundlesLoader.validateLanguages(bundle, languages);
        assertEquals(Optional.of(expectedMessage), issue.map(Throwable::getMessage));
    }

    @ParameterizedTest
    @MethodSource("validateDipMetadataOkProvider")
    void validateCommonMetadataOk(FsBundle bundle, DipMetadata metadata) {
        List<ValidationException> issues = BundlesLoader.validateDipMetadata(bundle, metadata);
        assertListEqualsInAnyOrder(Collections.emptyList(), toMessages(issues));
    }

    @ParameterizedTest
    @MethodSource("validateDipMetadataOkMasVersion")
    void validateCommonMetadataMasVersionOk(FsBundle bundle, DipMetadata metadata) {
        List<ValidationException> issues = BundlesLoader.validateDipMetadata(bundle, metadata);
        assertListEqualsInAnyOrder(Collections.emptyList(), toMessages(issues));
    }

    @ParameterizedTest
    @MethodSource("validateDipMetadataIssuesProvider")
    void validateDipMetadataIssues(FsBundle bundle, DipMetadata metadata, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.validateDipMetadata(bundle, metadata);
        assertListEqualsInAnyOrder(expectedMessages, toMessages(issues));
    }

    @ParameterizedTest
    @MethodSource("validateHttpMetadataOkProvider")
    void validateHttpMetadataOkOk(FsBundle bundle, HttpMetadata metadata) {
        List<ValidationException> issues = BundlesLoader.validateHttpMetadata(bundle, metadata);
        assertListEqualsInAnyOrder(Collections.emptyList(), issues);
    }

    @ParameterizedTest
    @MethodSource("validateHttpMetadataIssuesProvider")
    void validateHttpMetadataIssues(FsBundle bundle, HttpMetadata metadata, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.validateHttpMetadata(bundle, metadata);
        assertListEqualsInAnyOrder(expectedMessages, toMessages(issues));
    }
    
    @Test
    void validateHttpUniquenessOk() {
        Bundle bundle1 = new Bundle(
                new FsHttpBundle(Paths.get("http", "vendor", "name"), emptyList()),
                defaultHttpMetadata, 
                emptyList());
        
        Bundle bundle2 = new Bundle(
                new FsHttpBundle(Paths.get("http", "vendor", "name2"), emptyList()), 
                defaultHttpMetadata.toBuilder()
                                   .id("some-other-id")
                                   .build(), 
                emptyList());
        
        List<ValidationException> uniquenessIssues = BundlesLoader.validateHttpUniqueness(Arrays.asList(bundle1, bundle2));
        
        assertThat(uniquenessIssues).isEmpty();
    }
    
    @Test
    void validateHttpUniquenessIssues() {
        Bundle bundle1 = new Bundle(
                new FsHttpBundle(Paths.get("http", "vendor", "name"), emptyList()),
                defaultHttpMetadata, 
                emptyList());
        
        Bundle bundle2 = new Bundle(
                new FsHttpBundle(Paths.get("http", "vendor", "name2"), emptyList()), 
                defaultHttpMetadata, 
                emptyList());
        
        List<Bundle> bundles = Arrays.asList(bundle1, bundle2);
        List<ValidationException> uniquenessIssues = BundlesLoader.validateHttpUniqueness(bundles);
        
        String expectedMessage = format(
                "Bundles with same vendor `%s` and id `%s` in paths `%s`", 
                "vendor", 
                BUNDLE_ID,
                bundles.stream()
                       .map(Bundle::getFs)
                       .collect(toList()));
        
        assertThat(Arrays.asList(expectedMessage)).containsExactlyInAnyOrderElementsOf(toMessages(uniquenessIssues));
    }
    
    @Test
    void validateDipUniquenessOk() {
        Bundle bundle1 = new Bundle(
                new FsDipBundle(Paths.get("dip", "vendor", "v1.0", "name"), emptyList()),
                getDipMetadata().toBuilder().version("1.0").build(), 
                emptyList());
        
        Bundle bundle2 = new Bundle(
                new FsDipBundle(Paths.get("dip", "vendor", "2.0", "name"), emptyList()), 
                getDipMetadata().toBuilder().version("2.0").build(), 
                emptyList());
        
        List<ValidationException> uniquenessIssues = BundlesLoader.validateHttpUniqueness(Arrays.asList(bundle1, bundle2));
        
        assertThat(uniquenessIssues).isEmpty();
    }

    private static List<Path> toPaths(String... paths) {
        return Stream.of(paths)
                .map(Paths::get)
                .collect(Collectors.toList());
    }

    private List<String> toMessages(List<ValidationException> issues) {
        return issues.stream()
                .map(Throwable::getMessage)
                .collect(Collectors.toList());
    }

    private static <T> void assertListEqualsInAnyOrder(List<T> arg1, List<T> arg2) {
        assertThat(arg1).containsExactlyInAnyOrderElementsOf(arg2);
    }

    private static String buildFileName(String... parts) {
        if (parts == null || parts.length == 0) {
            throw new IllegalArgumentException("Filename path parts cannot be empty or null");
        }
        if (parts.length == 1) {
            return Paths.get(parts[0]).toString();
        } else {
            return Paths.get(parts[0], Arrays.copyOfRange(parts, 1, parts.length)).toString();
        }
    }

    private static String missingMandatoryFile(String... paths) {
        return String.format("Missing mandatory file: %s", buildFileName(paths));
    }

    private static Stream<Arguments> checkMandatoryFilesOkProvider() {
        return Stream.of(
                Arguments.of(new ArrayList<>(BUNDLE_MANDATORY_FILES)),
                Arguments.of(toPaths(METADATA_FILE, TEMPLATE_FILE, "i18n/en.json")),
                Arguments.of(toPaths(METADATA_FILE, TEMPLATE_FILE, "i18n/en.json", "more.txt", "files.bin"))
        );
    }

    private static Stream<Arguments> checkMandatoryFilesOkProviderForComingSoon() {
        return Stream.of(
                Arguments.of(new ArrayList<>(BUNDLE_COMING_SOON_MANDATORY_FILES)),
                Arguments.of(toPaths(METADATA_FILE))
        );
    }

    private static Stream<Arguments> checkMandatoryFilesIssuesProvider() {
        return Stream.of(
                Arguments.of(toPaths(),
                        false,
                        asList(missingMandatoryFile("metadata.json"),
                                missingMandatoryFile("file.sapp"),
                                missingMandatoryFile("i18n", "en.json"))),

                Arguments.of(toPaths(),
                        true,
                        asList(missingMandatoryFile("metadata.json"))),

                Arguments.of(toPaths(METADATA_FILE),
                        false,
                        asList(missingMandatoryFile("file.sapp"),
                                missingMandatoryFile("i18n", "en.json"))),

                Arguments.of(toPaths(TEMPLATE_FILE),
                        false,
                        asList(missingMandatoryFile("metadata.json"),
                                missingMandatoryFile("i18n", "en.json"))),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        false,
                        asList(missingMandatoryFile("metadata.json"),
                                missingMandatoryFile("file.sapp"),
                                missingMandatoryFile("i18n", "en.json"))),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        true,
                        asList(missingMandatoryFile("metadata.json")))
        );
    }

    private static Stream<Arguments> checkUnexpectedFilesOkProvider() {
        return Stream.of(
                Arguments.of(toPaths()),
                Arguments.of(new ArrayList<>(BUNDLE_ALLOWED_FILES)),
                Arguments.of(toPaths(METADATA_FILE)),
                Arguments.of(toPaths(TEMPLATE_FILE)),
                Arguments.of(toPaths("i18n/en.json", "i18n/de.json"))
        );
    }

    private static Stream<Arguments> checkUnexpectedFilesOkProviderForComingSoon() {
        return Stream.of(
                Arguments.of(toPaths()),
                Arguments.of(new ArrayList<>(BUNDLE_COMING_SOON_ALLOWED_FILES)),
                Arguments.of(toPaths(METADATA_FILE))
        );
    }

    private static Stream<Arguments> checkUnexpectedFilesIssuesProvider() {
        return Stream.of(
                Arguments.of(toPaths(METADATA_FILE, "unexpected.txt"),
                        false,
                        Collections.singletonList("Unexpected file: unexpected.txt")),

                Arguments.of(toPaths(METADATA_FILE, "unexpected.txt"),
                        true,
                        Collections.singletonList("Unexpected file: unexpected.txt")),

                Arguments.of(toPaths(TEMPLATE_FILE, "unexpected.txt"),
                        false,
                        Collections.singletonList("Unexpected file: unexpected.txt")),

                Arguments.of(toPaths(TEMPLATE_FILE, "unexpected.txt"),
                        true,
                        asList("Unexpected file: file.sapp", "Unexpected file: unexpected.txt")),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        false,
                        asList("Unexpected file: other.txt", "Unexpected file: files.bin")),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        true,
                        asList("Unexpected file: other.txt", "Unexpected file: files.bin"))
        );
    }

    private static Stream<Arguments> validateLanguagesOkProvider() {
        return Stream.of(
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths()),
                        Collections.emptyList()),

                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.json")),
                        Collections.singletonList("en")),

                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.json", "i18n/ja.json")),
                        asList("en", "ja"))
        );
    }

    private static Stream<Arguments> validateLanguagesIssuesProvider() {
        return Stream.of(
                Arguments.of(
                        new FsDipBundle(Paths.get("bundle"), toPaths()),
                        Collections.singletonList("en"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[]` != metadata `[en]`"),

                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.json")),
                        Collections.emptyList(),
                        "Values mismatch: field `i18nLanguages`, filesystem `[en]` != metadata `[]`"),

                // `en.json` instead of `i18n/en.json`
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("en.json", "i18n/ja.json")),
                        asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`"),

                // `lang` instead of `i18n`
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("lang/en.json", "i18n/ja.json")),
                        asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`"),

                // `.csv` instead of `.json`
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.csv", "i18n/ja.json")),
                        asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`")
        );
    }

    private static Stream<Arguments> validateDipMetadataOkProvider() {
        return Stream.of(
                Arguments.of(
                        getFsDipBundle(),
                        getDipMetadata()
                )
        );
    }

    private static Stream<Arguments> validateDipMetadataOkMasVersion() {
        return Stream.of(
                Arguments.of(getFsDipBundle(), getDipMetadata("1")),
                Arguments.of(getFsDipBundle(), getDipMetadata("1.2")),
                Arguments.of(getFsDipBundle(), getDipMetadata("1.2.3")),
                Arguments.of(getFsDipBundle(), getDipMetadata("1.2.3-SNAPSHOT")),
                Arguments.of(getFsDipBundle(),
                        getDipMetadata("1.2.3.7000220123bc7b76717a6be72fc8f8ad47cf216e")),
                Arguments.of(getFsDipBundle(),
                        getDipMetadata("1.2.3.7000220123bc7b76717a6be72fc8f8ad47cf216e-SNAPSHOT"))
        );
    }

    private static Stream<Arguments> validateDipMetadataIssuesProvider() {
        return Stream.of(
                Arguments.of(
                        new FsDipBundle(
                                Paths.get("dip", "vendor", "id", "42.42.42"),
                                toPaths()),
                        new DipMetadata(Type.HTTP, // bad
                                "bad vendor",
                                "bad id",
                                null,
                                "bad 42.42.42",
                                "bad title",
                                "bad description",
                                URI.create("https://icon.com/"),
                                "bad 1.0.0",
                                Collections.emptyList(),
                                "bad 2019-12-18T11:36:00",
                                "bad 2019-12-18T11:36:00",
                                "bad 2019-12-19T11:36:00",
                                true,
                                Collections.singletonList("bad"),
                                Collections.emptyList(),
                                Collections.emptyList()),
                        asList(
                                "Invalid value: field `created`, value `bad 2019-12-18T11:36:00`, pattern " +
                                        "`[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}`",
                                "Invalid value: field `masVersion`, value `bad 1.0.0`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(\\.[0-9a-f]{40})?(-SNAPSHOT)?`",
                                "Invalid UTC timestamp format: field `eolDateWithSupport`, value `bad " +
                                        "2019-12-19T11:36:00`",
                                "Invalid UTC timestamp format: field `deprecatedDate`, value `bad 2019-12-18T11:36:00`",
                                "Values mismatch: field `type`, filesystem `DIP` != metadata `HTTP`",
                                "Values mismatch: field `vendor`, filesystem `vendor` != metadata `bad_vendor`",
                                "Values mismatch: field `i18nLanguages`, filesystem `[]` != metadata `[bad]`",
                                "Invalid value: field `type`, value `HTTP`, expecting `DIP`",
                                "Invalid value: field `id`, value `bad id`, pattern `[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*`",
                                "Invalid value: field `version`, value `bad 42.42.42`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(\\.[0-9a-f]{40})?(-SNAPSHOT)?`",
                                "Values mismatch: field `id`, filesystem `id` != metadata `bad id`",
                                "Values mismatch: field `version`, filesystem `42.42.42` != metadata `bad 42.42.42`"
                        )
                )
        );
    }

    private static final HttpMetadata defaultHttpMetadata = new HttpMetadata(Type.HTTP,
            "vendor",
            UUID.fromString(BUNDLE_ID),
            UUID.fromString("e555da00-55f8-4275-878e-d2facae817f5"),
            "title",
            "description",
            URI.create("https://icon.com/"),
            "1.0.0",
            Collections.emptyList(),
            "2019-12-18T11:36:00",
            "2020-12-08T06:39:48.517497Z",
            "2020-12-09T06:39:48.517497Z",
            true,
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            null,
            false);

    private static Stream<Arguments> validateHttpMetadataOkProvider() {
        return Stream.of(
                Arguments.of(
                        new FsHttpBundle(
                                Paths.get("http", "vendor", BUNDLE_ID),
                                toPaths()),
                        defaultHttpMetadata
                ),
                Arguments.of(
                        new FsHttpBundle(
                                Paths.get("http", "vendor", BUNDLE_ID),
                                toPaths()),
                        defaultHttpMetadata
                                .toBuilder()
                                .scriptMetadata(new ScriptMetadata(
                                        "jira.js",
                                        "433debf6-c450-4a95-9a6f-901932fac76d.js",
                                        "4F3E7A9EB4B76C8B8E5841BFC6D75030",
                                        "1.0"))
                                .build()
                )
        );
    }

    private static Stream<Arguments> validateHttpMetadataIssuesProvider() {
        return Stream.of(
                Arguments.of(
                        new FsHttpBundle(
                                Paths.get(
                                        "http",
                                        "Vendor_Name_With_Whitespaces",
                                        "bad 00b31529-bc3f-4dab-84c9-b0a539d51d73"),
                                toPaths()),
                        defaultHttpMetadata
                                .toBuilder()
                                .trackingUuid(UUID.fromString("332d82b2-12cb-480d-8edb-9b9bca59a8c9"))
                                .type(Type.DIP)
                                .vendor("Vendor Name With Whitespaces")
                                .title("bad title")
                                .description("bad description")
                                .masVersion("bad 1.0.0")
                                .created("bad 2019-12-18T11:36:00")
                                .deprecatedDate("2020-10-09T06:39:48.517497Z")
                                .eolDateWithSupport("2020-10-10T06:39:48.517497Z")
                                .i18nLanguages(Collections.singletonList("bad"))
                                .build(),
                        asList(
                                "Invalid value: field `created`, value `bad 2019-12-18T11:36:00`, pattern " +
                                        "`[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}`",
                                "Invalid value: field `masVersion`, value `bad 1.0.0`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(\\.[0-9a-f]{40})?(-SNAPSHOT)?`",
                                "Values mismatch: field `type`, filesystem `HTTP` != metadata `DIP`",
                                "Values mismatch: field `i18nLanguages`, filesystem `[]` != metadata `[bad]`",
                                "Invalid value: field `type`, value `DIP`, expecting `HTTP`"/*
                                                                                             * ,
                                                                                             * "Values mismatch: field `id`, filesystem `bad 00b31529-bc3f-4dab-84c9-b0a539d51d73` "
                                                                                             * +
                                                                                             * "!= metadata `00b31529-bc3f-4dab-84c9-b0a539d51d73`"
                                                                                             */
                        )
                )
        );
    }

    private static FsDipBundle getFsDipBundle() {
        return new FsDipBundle(
                Paths.get("dip", "vendor", "id", "42.42.42"),
                toPaths());
    }

    private static DipMetadata getDipMetadata(String masVersion) {
        return new DipMetadata(Type.DIP,
                "vendor",
                "id",
                UUID.fromString("00b31529-bc3f-4dab-84c9-b0a539d51d74"),
                "42.42.42",
                "title",
                "description",
                URI.create("https://icon.com/"),
                masVersion,
                Collections.emptyList(),
                "2019-12-18T11:36:00",
                "2020-10-09T06:39:48.517497Z",
                "2020-10-09T06:39:48.517497Z",
                true,
                Collections.emptyList(),
                Collections.emptyList(),
                Collections.emptyList());
    }

    private static DipMetadata getDipMetadata() {
        return new DipMetadata(Type.DIP,
                "vendor",
                "id",
                UUID.fromString("00b31529-bc3f-4dab-84c9-b0a539d51d74"),
                "42.42.42",
                "title",
                "description",
                URI.create("https://icon.com/"),
                "1.0.0",
                Collections.emptyList(),
                "2019-12-18T11:36:00",
                null,
                null,
                true,
                Collections.emptyList(),
                Collections.emptyList(),
                Collections.emptyList());
    }
}
