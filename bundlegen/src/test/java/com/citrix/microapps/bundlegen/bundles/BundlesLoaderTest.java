package com.citrix.microapps.bundlegen.bundles;

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
import com.citrix.microapps.bundlegen.pojo.Type;

import static com.citrix.microapps.bundlegen.TestUtils.path;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.METADATA_FILE;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TEMPLATE_FILE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BundlesLoaderTest {
    private static List<Path> toPaths(String... paths) {
        return Stream.of(paths)
                .map(path -> Paths.get(path))
                .collect(Collectors.toList());
    }

    private List<String> toMessages(List<ValidationException> issues) {
        return issues.stream()
                .map(Throwable::getMessage)
                .collect(Collectors.toList());
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

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesOkProvider")
    void checkMandatoryFilesOk(List<Path> input) {
        assertEquals(Collections.emptyList(), BundlesLoader.checkMandatoryFiles(input, false));
    }

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesOkProviderForComingSoon")
    void checkMandatoryFilesOkForComingSoon(List<Path> input) {
        assertEquals(Collections.emptyList(), BundlesLoader.checkMandatoryFiles(input, true));
    }

    private static Stream<Arguments> checkMandatoryFilesIssuesProvider() {
        return Stream.of(
                Arguments.of(toPaths(),
                        false,
                        Arrays.asList("Missing mandatory file: metadata.json",
                                "Missing mandatory file: file.sapp",
                                "Missing mandatory file: i18n/en.json")),
                Arguments.of(toPaths(),
                        true,
                        Arrays.asList("Missing mandatory file: metadata.json")),

                Arguments.of(toPaths(METADATA_FILE),
                        false,
                        Arrays.asList("Missing mandatory file: file.sapp",
                                "Missing mandatory file: i18n/en.json")),

                Arguments.of(toPaths(TEMPLATE_FILE),
                        false,
                        Arrays.asList("Missing mandatory file: metadata.json",
                                "Missing mandatory file: i18n/en.json")),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        false,
                        Arrays.asList("Missing mandatory file: metadata.json",
                                "Missing mandatory file: file.sapp",
                                "Missing mandatory file: i18n/en.json")),
                Arguments.of(toPaths("other.txt", "files.bin"),
                        true,
                        Arrays.asList("Missing mandatory file: metadata.json"))

        );
    }

    @ParameterizedTest
    @MethodSource("checkMandatoryFilesIssuesProvider")
    void checkMandatoryFilesIssues(List<Path> input, boolean comingSoonBundleFlag, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.checkMandatoryFiles(input, comingSoonBundleFlag);
        assertThat(toMessages(issues)).containsExactlyInAnyOrder(expectedMessages.toArray(new String[0]));
    }

    @Test
    void checkTranslationChecksumOk() {
        FsDipBundle fsDipBundle = new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle1/0.0.1"),
                Arrays.asList(
                        Paths.get("i18n", "de.json"),
                        Paths.get("i18n", "en.json"),
                        Paths.get("i18n", "es.json"),
                        Paths.get("i18n", "fr.json"),
                        Paths.get("i18n", "ja.json"),
                        Paths.get("i18n", "nl.json"),
                        Paths.get("i18n", "zh-CN.json"),
                        Paths.get("file.sapp")));

        assertEquals(Collections.emptyList(), BundlesLoader.checkLocalizations(fsDipBundle, false));
    }

    @Test
    void checkTranslationWithIncreasedNumberOfTranslationKeys() {
        FsDipBundle fsDipBundle =
                new FsDipBundle(path("src/test/resources/bundles_broken_translation_keys/dip/vendor/bundle/0.0.1"),
                        Arrays.asList(
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("file.sapp")));

        List<ValidationException> validationExceptions = BundlesLoader.checkLocalizations(fsDipBundle,
                false);
        assertEquals(Collections.singletonList("Translation checksum mismatch en.json"),
                toMessages(validationExceptions));
    }

    @Test
    void checkTranslationWithIncreasedNumberOfTranslationKeysForComingSoon() {
        FsComingSoonBundle fsDipBundle =
                new FsComingSoonBundle(path("src/test/resources/bundles_broken_translation_keys/dip/vendor/bundle/0.0.1"),
                        Arrays.asList(
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("file.sapp")));

        List<ValidationException> validationExceptions = BundlesLoader.checkLocalizations(fsDipBundle,
                true);
        assertEquals(Collections.emptyList(), validationExceptions);
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

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesOkProvider")
    void checkUnexpectedFilesOk(List<Path> input) {
        assertEquals(Collections.emptyList(), BundlesLoader.checkUnexpectedFiles(input, false));
    }

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesOkProviderForComingSoon")
    void checkUnexpectedFilesOkForComingSoon(List<Path> input) {
        assertEquals(Collections.emptyList(), BundlesLoader.checkUnexpectedFiles(input, true));
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
                        Arrays.asList("Unexpected file: file.sapp", "Unexpected file: unexpected.txt")),

                Arguments.of(toPaths("other.txt", "files.bin"),
                        false,
                        Arrays.asList("Unexpected file: other.txt", "Unexpected file: files.bin")),
                Arguments.of(toPaths("other.txt", "files.bin"),
                        true,
                        Arrays.asList("Unexpected file: other.txt", "Unexpected file: files.bin"))
        );
    }

    @ParameterizedTest
    @MethodSource("checkUnexpectedFilesIssuesProvider")
    void checkUnexpectedFilesIssues(List<Path> input, boolean comingSoonBundleFlag, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.checkUnexpectedFiles(input, comingSoonBundleFlag);
        assertEquals(expectedMessages, toMessages(issues));
    }


    private static Stream<Arguments> validateLanguagesOkProvider() {
        return Stream.of(
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths()),
                        Collections.emptyList()),

                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.json")),
                        Collections.singletonList("en")),

                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.json", "i18n/ja.json")),
                        Arrays.asList("en", "ja"))
        );
    }

    @ParameterizedTest
    @MethodSource("validateLanguagesOkProvider")
    void validateLanguagesOk(FsBundle bundle, List<String> languages) {
        assertEquals(Optional.empty(), BundlesLoader.validateLanguages(bundle, languages));
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
                        Arrays.asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`"),

                // `lang` instead of `i18n`
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("lang/en.json", "i18n/ja.json")),
                        Arrays.asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`"),

                // `.csv` instead of `.json`
                Arguments.of(new FsDipBundle(Paths.get("bundle"), toPaths("i18n/en.csv", "i18n/ja.json")),
                        Arrays.asList("en", "ja"),
                        "Values mismatch: field `i18nLanguages`, filesystem `[ja]` != metadata `[en, ja]`")
        );
    }

    @ParameterizedTest
    @MethodSource("validateLanguagesIssuesProvider")
    void validateLanguagesIssues(FsBundle bundle, List<String> languages, String expectedMessage) {
        Optional<ValidationException> issue = BundlesLoader.validateLanguages(bundle, languages);
        assertEquals(Optional.of(expectedMessage), issue.map(Throwable::getMessage));
    }


    private static Stream<Arguments> validateDipMetadataOkProvider() {
        UUID uuid = UUID.randomUUID();
        System.err.println(uuid);
        return Stream.of(
                Arguments.of(
                        new FsDipBundle(
                                Paths.get("dip", "vendor", "id", "42.42.42"),
                                toPaths()),
                        new DipMetadata(Type.DIP,
                                "vendor",
                                "id",
                                "42.42.42",
                                "title",
                                "description",
                                URI.create("https://icon.com/"),
                                "1.0.0",
                                Collections.emptyList(),
                                "2019-12-18T11:36:00",
                                true,
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList())
                )
        );
    }

    @ParameterizedTest
    @MethodSource("validateDipMetadataOkProvider")
    void validateCommonMetadataOk(FsBundle bundle, DipMetadata metadata) {
        List<ValidationException> issues = BundlesLoader.validateDipMetadata(bundle, metadata);
        assertEquals(Collections.emptyList(), toMessages(issues));
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
                                "bad 42.42.42",
                                "bad title",
                                "bad description",
                                URI.create("https://icon.com/"),
                                "bad 1.0.0",
                                Collections.emptyList(),
                                "bad 2019-12-18T11:36:00",
                                true,
                                Collections.singletonList("bad"),
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList()),
                        Arrays.asList(
                                "Invalid value: field `created`, value `bad 2019-12-18T11:36:00`, pattern " +
                                        "`[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}`",
                                "Invalid value: field `masVersion`, value `bad 1.0.0`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(-SNAPSHOT)?`",
                                "Values mismatch: field `type`, filesystem `DIP` != metadata `HTTP`",
                                "Values mismatch: field `vendor`, filesystem `vendor` != metadata `bad vendor`",
                                "Values mismatch: field `i18nLanguages`, filesystem `[]` != metadata `[bad]`",
                                "Invalid value: field `type`, value `HTTP`, expecting `DIP`",
                                "Invalid value: field `id`, value `bad id`, pattern `[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*`",
                                "Invalid value: field `version`, value `bad 42.42.42`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(-SNAPSHOT)?`",
                                "Values mismatch: field `id`, filesystem `id` != metadata `bad id`",
                                "Values mismatch: field `version`, filesystem `42.42.42` != metadata `bad 42.42.42`"
                        )
                )
        );
    }

    @ParameterizedTest
    @MethodSource("validateDipMetadataIssuesProvider")
    void validateDipMetadataIssues(FsBundle bundle, DipMetadata metadata, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.validateDipMetadata(bundle, metadata);
        assertEquals(expectedMessages, toMessages(issues));
    }


    private static Stream<Arguments> validateHttpMetadataOkProvider() {
        return Stream.of(
                Arguments.of(
                        new FsHttpBundle(
                                Paths.get("http", "vendor", "00b31529-bc3f-4dab-84c9-b0a539d51d73"),
                                toPaths()),
                        new HttpMetadata(Type.HTTP,
                                "vendor",
                                UUID.fromString("00b31529-bc3f-4dab-84c9-b0a539d51d73"),
                                "title",
                                "description",
                                URI.create("https://icon.com/"),
                                "1.0.0",
                                Collections.emptyList(),
                                "2019-12-18T11:36:00",
                                true,
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList())
                )
        );
    }

    @ParameterizedTest
    @MethodSource("validateHttpMetadataOkProvider")
    void validateHttpMetadataOkOk(FsBundle bundle, HttpMetadata metadata) {
        List<ValidationException> issues = BundlesLoader.validateHttpMetadata(bundle, metadata);
        assertEquals(Collections.emptyList(), toMessages(issues));
    }


    private static Stream<Arguments> validateHttpMetadataIssuesProvider() {
        return Stream.of(
                Arguments.of(
                        new FsHttpBundle(
                                Paths.get("http", "vendor", "bad 00b31529-bc3f-4dab-84c9-b0a539d51d73"),
                                toPaths()),
                        new HttpMetadata(Type.DIP, // bad
                                "bad vendor",
                                UUID.fromString("00b31529-bc3f-4dab-84c9-b0a539d51d73"),
                                "bad title",
                                "bad description",
                                URI.create("https://icon.com/"),
                                "bad 1.0.0",
                                Collections.emptyList(),
                                "bad 2019-12-18T11:36:00",
                                true,
                                Collections.singletonList("bad"),
                                Collections.emptyList(),
                                Collections.emptyList(),
                                Collections.emptyList()),
                        Arrays.asList(
                                "Invalid value: field `created`, value `bad 2019-12-18T11:36:00`, pattern " +
                                        "`[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}`",
                                "Invalid value: field `masVersion`, value `bad 1.0.0`, pattern `[0-9]+(?:\\.[0-9]+)*" +
                                        "(-SNAPSHOT)?`",
                                "Values mismatch: field `type`, filesystem `HTTP` != metadata `DIP`",
                                "Values mismatch: field `vendor`, filesystem `vendor` != metadata `bad vendor`",
                                "Values mismatch: field `i18nLanguages`, filesystem `[]` != metadata `[bad]`",
                                "Invalid value: field `type`, value `DIP`, expecting `HTTP`",
                                "Values mismatch: field `id`, filesystem `bad 00b31529-bc3f-4dab-84c9-b0a539d51d73` " +
                                        "!= metadata `00b31529-bc3f-4dab-84c9-b0a539d51d73`"
                        )
                )
        );
    }

    @ParameterizedTest
    @MethodSource("validateHttpMetadataIssuesProvider")
    void validateHttpMetadataIssues(FsBundle bundle, HttpMetadata metadata, List<String> expectedMessages) {
        List<ValidationException> issues = BundlesLoader.validateHttpMetadata(bundle, metadata);
        assertEquals(expectedMessages, toMessages(issues));
    }
}
