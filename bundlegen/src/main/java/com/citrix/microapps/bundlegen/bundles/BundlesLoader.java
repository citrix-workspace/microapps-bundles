package com.citrix.microapps.bundlegen.bundles;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.citrix.microapps.bundlegen.pojo.ComingSoonMetadata;
import com.citrix.microapps.bundlegen.pojo.DipMetadata;
import com.citrix.microapps.bundlegen.pojo.HttpMetadata;
import com.citrix.microapps.bundlegen.pojo.Metadata;
import com.citrix.microapps.bundlegen.pojo.ModelTranslation;
import com.citrix.microapps.bundlegen.pojo.TemplateFile;
import com.citrix.microapps.bundlegen.pojo.Type;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_TRANSLATIONS;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TRANSLATIONS_DIR;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TRANSLATION_EXTENSION;
import static com.citrix.microapps.bundlegen.pojo.Category.COMING_SOON;
import static java.util.stream.Collectors.toList;

/**
 * Loader and validator of bundles.
 */
public class BundlesLoader {
    private static final Logger logger = LoggerFactory.getLogger(BundlesLoader.class);

    private static final ObjectReader BUNDLE_DATA_READER = new ObjectMapper()
            .reader();

    // e.g. `id: "com.sapho.services.salesforce.SalesforceService"`
    private static final Pattern ID_PATTERN = Pattern.compile("[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*");

    // e.g. `created: "2019-18-16T00:00:00"`
    private static final Pattern DATE_PATTERN =
            Pattern.compile("[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}");

    // e.g. `version: "2.5.0"`
    // e.g. `masVersion: "0.8.0"`
    private static final Pattern VERSION_PATTERN =
            Pattern.compile("[0-9]+(?:\\.[0-9]+)*(\\.[0-9a-f]{40})?(-SNAPSHOT)?");

    public Bundle loadBundle(FsBundle bundle) {
        logger.info("Loading bundle: {}", bundle);
        List<ValidationException> issues = new ArrayList<>();

        Optional<Metadata> metadata = loadAndValidateMetadata(issues, bundle);

        boolean comingSoonBundleFlag = metadata.map(m -> m.getCategories())
                .filter(c -> c.contains(COMING_SOON))
                .isPresent();

        issues.addAll(checkMandatoryFiles(bundle.getFiles(), comingSoonBundleFlag));
        issues.addAll(checkUnexpectedFiles(bundle.getFiles(), comingSoonBundleFlag));
        issues.addAll(checkLocalizations(bundle, comingSoonBundleFlag));

        return new Bundle(bundle, metadata, issues);
    }



    private Optional<Metadata> loadAndValidateMetadata(List<ValidationException> issues, FsBundle bundle) {
        Path metadataPath = bundle.getMetadataPath();

        try {
            switch (bundle.getType()) {
                case DIP:
                    DipMetadata dipMetadata = BUNDLE_DATA_READER
                            .forType(DipMetadata.class)
                            .readValue(metadataPath.toFile());
                    issues.addAll(validateDipMetadata(bundle, dipMetadata));
                    return Optional.of(dipMetadata);

                case HTTP:
                    HttpMetadata httpMetadata = BUNDLE_DATA_READER
                            .forType(HttpMetadata.class)
                            .readValue(metadataPath.toFile());
                    issues.addAll(validateHttpMetadata(bundle, httpMetadata));
                    return Optional.of(httpMetadata);
                case COMING_SOON:
                    ComingSoonMetadata comingSoonMetadata = BUNDLE_DATA_READER
                            .forType(ComingSoonMetadata.class)
                            .readValue(metadataPath.toFile());
                    issues.addAll(validateComingSoonMetadata(bundle, comingSoonMetadata));
                    return Optional.of(comingSoonMetadata);
                default:
                    throw new UnsupportedOperationException("Unexpected bundle type: " + bundle.getType());
            }
        } catch (IOException e) {
            issues.add(new ValidationException("Loading of bundle metadata failed: " + metadataPath, e));
            return Optional.empty();
        }
    }

    private static Optional<TemplateFile> loadAndValidateTemplateFile(List<ValidationException> issues,
                                                                      FsBundle bundle) {
        Path templateFilePath = bundle.getTemplatePath();

        try {
            File file = templateFilePath.toFile();
            TemplateFile templateFile = BUNDLE_DATA_READER
                    .forType(TemplateFile.class)
                    .readValue(file);
            isChecksumEmpty(file.getName(), templateFile).ifPresent(issues::add);
            return Optional.of(templateFile);
        } catch (IOException e) {
            issues.add(new ValidationException("Loading of template file failed: " + templateFilePath, e));
            return Optional.empty();
        }
    }

    private static Optional<ModelTranslation> loadTranslationFile(List<ValidationException> issues,
                                                                  Path translationPath) {
        try {
            ModelTranslation modelTranslation = BUNDLE_DATA_READER
                    .forType(ModelTranslation.class)
                    .readValue(translationPath.toFile());
            return Optional.of(modelTranslation);
        } catch (IOException e) {
            issues.add(new ValidationException("Loading of translation file failed: " + translationPath, e));
            return Optional.empty();
        }
    }

    static List<ValidationException> checkMandatoryFiles(List<Path> bundleFiles, boolean comingSoonBundleFlag) {
        Set<Path> mandatoryFiles = comingSoonBundleFlag ? BUNDLE_COMING_SOON_MANDATORY_FILES : BUNDLE_MANDATORY_FILES;
        return mandatoryFiles
                .stream()
                .filter(path -> !bundleFiles.contains(path))
                .map(path -> new ValidationException("Missing mandatory file: " + path))
                .collect(toList());
    }

    static List<ValidationException> checkUnexpectedFiles(List<Path> bundleFiles, boolean comingSoonBundleFlag) {
        HashSet<Path> copy = new HashSet<>(bundleFiles);
        copy.removeAll(comingSoonBundleFlag ? BUNDLE_COMING_SOON_ALLOWED_FILES : BUNDLE_ALLOWED_FILES);
        // FIXME make proper validation of bundled Javascript files
        copy.removeIf(file -> {
            // TODO use PathMatcher?
            boolean result = file.toFile().getName().toLowerCase().endsWith(".js");
            System.out.printf("Testing %s, result=%s\n", file, result);
            return result;
        });

        return copy.stream()
                .map(path -> new ValidationException("Unexpected file: " + path))
                .collect(toList());
    }

    static List<ValidationException> checkLocalizations(FsBundle bundle, boolean comingSoonBundleFlag) {
        if (comingSoonBundleFlag) {
            return Collections.emptyList();
        }
        List<ValidationException> issues = new ArrayList<>();
        List<ValidationException> checksumIssues = loadAndValidateTemplateFile(issues, bundle).map(template ->
                bundle.getFiles().stream()
                        .filter(path -> BUNDLE_ALLOWED_TRANSLATIONS.contains(path))
                        .map(path -> toValidationException(bundle, template, issues, path))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(toList())
        ).orElse(Collections.emptyList());

        issues.addAll(checksumIssues);
        return issues;
    }

    private static Optional<ValidationException> toValidationException(FsBundle bundle,
                                                                       TemplateFile template,
                                                                       List<ValidationException> issues,
                                                                       Path path) {
        return loadTranslationFile(issues, bundle.getPath().resolve(path))
                .filter(modelTranslation -> isTranslationValid(template, modelTranslation))
                .map(modelTranslation ->
                        new ValidationException(String.format("Translation checksum mismatch %s", path.getFileName())));
    }

    private static boolean isTranslationValid(TemplateFile template, ModelTranslation modelTranslation) {
        return new TranslationValidator(modelTranslation).checksum()
                .map(checksum -> !Objects.equals(checksum, template.getTranslationChecksum()))
                .orElse(false);
    }

    private static List<ValidationException> validateCommonMetadata(FsBundle bundle, Metadata metadata) {
        List<ValidationException> issues = new ArrayList<>();

        validateFormat(DATE_PATTERN, "created", metadata.getCreated()).ifPresent(issues::add);
        validateFormat(VERSION_PATTERN, "masVersion", metadata.getMasVersion()).ifPresent(issues::add);

        validateSync(bundle::getType, "type", metadata.getType()).ifPresent(issues::add);
        validateSync(bundle::getVendor, "vendor", metadata.getVendor()).ifPresent(issues::add);

        validateLanguages(bundle, metadata.getI18nLanguages()).ifPresent(issues::add);

        if (metadata.getCategories() != null && metadata.getCategories().contains(COMING_SOON)) {
            issues.add(new ValidationException(
                    String.format("Category COMING_SOON is not allowed in directory: `%s`. " +
                            "Please move it to comming_soon dir or remove the category from bundle ",
                            metadata.getType())));
        }

        // TODO: Rules for other validations.

        return issues;
    }

    static List<ValidationException> validateDipMetadata(FsBundle bundle, DipMetadata metadata) {
        List<ValidationException> issues = validateCommonMetadata(bundle, metadata);

        if (metadata.getType() != Type.DIP) {
            issues.add(new ValidationException(
                    String.format("Invalid value: field `type`, value `%s`, expecting `%s`",
                            metadata.getType(), Type.DIP)));
        }

        validateFormat(ID_PATTERN, "id", metadata.getId()).ifPresent(issues::add);
        validateFormat(VERSION_PATTERN, "version", metadata.getVersion()).ifPresent(issues::add);

        validateSync(bundle::getId, "id", metadata.getId()).ifPresent(issues::add);
        bundle.getVersion()
                .flatMap(version -> validateSync(() -> version, "version", metadata.getVersion()))
                .ifPresent(issues::add);

        return issues;
    }

    static List<ValidationException> validateHttpMetadata(FsBundle bundle, HttpMetadata metadata) {
        List<ValidationException> issues = validateCommonMetadata(bundle, metadata);

        if (metadata.getType() != Type.HTTP) {
            issues.add(new ValidationException(
                    String.format("Invalid value: field `type`, value `%s`, expecting `%s`",
                            metadata.getType(), Type.HTTP)));
        }

        validateSync(bundle::getId, "id", metadata.getId().toString()).ifPresent(issues::add);

        return issues;
    }

    static List<ValidationException> validateComingSoonMetadata(FsBundle bundle, ComingSoonMetadata metadata) {
        List<ValidationException> issues = new ArrayList<>();

        validateFormat(DATE_PATTERN, "created", metadata.getCreated()).ifPresent(issues::add);
        validateSync(bundle::getVendor, "vendor", metadata.getVendor()).ifPresent(issues::add);
        validateSync(bundle::getId, "id", metadata.getId()).ifPresent(issues::add);

        if (metadata.getCategories() == null || !metadata.getCategories().contains(COMING_SOON)) {
            issues.add(new ValidationException(
                    String.format("Missing required category: `%s`", metadata.getType(), Type.COMING_SOON)));
        }

        return issues;
    }

    static Optional<ValidationException> isChecksumEmpty(String fileName, TemplateFile templateFile) {
        return templateFile.getTranslationChecksum() == null || templateFile.getTranslationChecksum().isEmpty() ?
                Optional.of(new ValidationException(
                        String.format("Missing the translation checksum %s", fileName))) : Optional.empty();
    }

    /**
     * Validate that a value matches its expected format.
     */
    static Optional<ValidationException> validateFormat(Pattern pattern, String field, String value) {
        if (pattern.matcher(value).matches()) {
            return Optional.empty();
        }

        return validationIssue(
                String.format("Invalid value: field `%s`, value `%s`, pattern `%s`", field, value, pattern));
    }

    /**
     * Validate that value in metadata file matches name of directory in filesystem tree.
     */
    static <T> Optional<ValidationException> validateSync(Supplier<T> valueSupplier, String field, T value) {
        T fsValue = valueSupplier.get();
        if (fsValue.equals(value)) {
            return Optional.empty();
        }

        return validationIssue(
                String.format("Values mismatch: field `%s`, filesystem `%s` != metadata `%s`", field, fsValue, value));
    }

    static Optional<ValidationException> validateLanguages(FsBundle bundle, List<String> languages) {
        Path transDir = bundle.getPath().resolve(TRANSLATIONS_DIR);

        List<String> languagesMetadata = languages
                .stream()
                .sorted()
                .collect(toList());

        List<String> languagesFs = bundle.getFiles()
                .stream()
                .filter(path -> path.startsWith(TRANSLATIONS_DIR))
                .map(transDir::relativize)
                .map(path -> path.getFileName().toString())
                .filter(fileName -> fileName.endsWith(TRANSLATION_EXTENSION))
                .map(fileName -> fileName.replace(TRANSLATION_EXTENSION, ""))
                .collect(toList());

        if (!languagesMetadata.equals(languagesFs)) {
            return validationIssue(
                    String.format("Values mismatch: field `i18nLanguages`, filesystem `%s` != metadata `%s`",
                            languagesFs, languagesMetadata));
        }

        return Optional.empty();
    }

    private static Optional<ValidationException> validationIssue(String message) {
        return Optional.of(new ValidationException(message));
    }
}
