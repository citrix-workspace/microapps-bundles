package com.citrix.microapps.bundlegen.bundles;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Supplier;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.citrix.microapps.bundlegen.pojo.ComingSoonMetadata;
import com.citrix.microapps.bundlegen.pojo.DipMetadata;
import com.citrix.microapps.bundlegen.pojo.HttpMetadata;
import com.citrix.microapps.bundlegen.pojo.IconType;
import com.citrix.microapps.bundlegen.pojo.Metadata;
import com.citrix.microapps.bundlegen.pojo.ModelTranslation;
import com.citrix.microapps.bundlegen.pojo.TemplateFile;
import com.citrix.microapps.bundlegen.pojo.Type;
import com.citrix.microapps.bundlegen.pojo.template.Endpoint;
import com.citrix.microapps.bundlegen.pojo.template.EndpointParameter;
import com.citrix.microapps.bundlegen.pojo.template.ServiceAction;
import com.citrix.microapps.bundlegen.pojo.template.ServiceConfiguration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_ALLOWED_TRANSLATIONS;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_ALLOWED_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_COMING_SOON_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLE_MANDATORY_FILES;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.EXPORTED_ICON_URL_PREFIX;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TRANSLATIONS_DIR;
import static com.citrix.microapps.bundlegen.bundles.FsConstants.TRANSLATION_EXTENSION;
import static com.citrix.microapps.bundlegen.bundles.IssueSeverity.WARNING;
import static com.citrix.microapps.bundlegen.pojo.Category.COMING_SOON;
import static com.citrix.microapps.bundlegen.pojo.IconType.LIBRARY;
import static com.citrix.microapps.bundlegen.pojo.template.SecurityType.NONE;
import static java.lang.String.format;
import static java.util.Collections.emptyList;
import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Stream.concat;

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

    // e.g. `vendor: "Brick_Bridge_Consulting"`
    private static final String WORD_SEPARATOR = "_";

    private static final String TOKEN_PARAMETER_NAME = "token";
    private static final String BEARER_PARAMETER_NAME = "bearer";

    public Bundle loadBundle(FsBundle bundle) {
        logger.info("Loading bundle: {}", bundle);
        List<ValidationException> issues = new ArrayList<>();

        Optional<Metadata> metadata = loadAndValidateMetadata(issues, bundle);

        boolean comingSoonBundleFlag = metadata.map(m -> m.getCategories())
                .filter(c -> c.contains(COMING_SOON))
                .isPresent();

        boolean idpBundleFlag = metadata.map(m -> m.getType())
                .filter(t -> t == Type.IDENTITY_PROVIDER)
                .isPresent();

        issues.addAll(checkMandatoryFiles(bundle.getFiles(), comingSoonBundleFlag));
        issues.addAll(checkUnexpectedFiles(bundle.getFiles(), comingSoonBundleFlag));

        issues.addAll(checkLocalizations(
                bundle,
                loadAndValidateTemplateFile(issues, bundle, metadata)
                        .map(template -> template.getTranslationChecksum()),
                comingSoonBundleFlag || idpBundleFlag));

        return new Bundle(bundle, metadata.orElse(null), issues);
    }


    static Optional<Metadata> loadAndValidateMetadata(List<ValidationException> issues, FsBundle bundle) {
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
                case IDENTITY_PROVIDER:
                    HttpMetadata idpMetadata = BUNDLE_DATA_READER
                            .forType(HttpMetadata.class)
                            .readValue(metadataPath.toFile());
                    issues.addAll(validateHttpMetadata(bundle, idpMetadata, Type.IDENTITY_PROVIDER));
                    return Optional.of(idpMetadata);
                default:
                    throw new UnsupportedOperationException("Unexpected bundle type: " + bundle.getType());
            }
        } catch (IOException e) {
            issues.add(new ValidationException("Loading of bundle metadata failed: " + metadataPath, e));
            return Optional.empty();
        }
    }

    static Optional<TemplateFile> loadAndValidateTemplateFile(List<ValidationException> issues,
                                                              FsBundle bundle,
                                                              Optional<Metadata> metadata) {
        Path templateFilePath = bundle.getTemplatePath();

        try {
            switch (bundle.getType()) {
                case DIP:
                    return Optional.of(loadTemplateFileAndValidateChecksum(issues, templateFilePath));
                case HTTP:
                    TemplateFile httpTemplateFile = loadTemplateFileAndValidateChecksum(issues, templateFilePath);

                    Optional<ServiceConfiguration> serviceConfiguration = getServiceConfiguration(httpTemplateFile);
                    validateConfigurationIsUsingAuthentication(serviceConfiguration).ifPresent(issues::add);
                    validateServiceIconUrlConfiguration(serviceConfiguration, metadata).forEach(issues::add);
                    validateEndpoints(serviceConfiguration).forEach(issues::add);
                    validateServiceActions(serviceConfiguration).forEach(issues::add);
                    return Optional.of(httpTemplateFile);
                case IDENTITY_PROVIDER:
                    TemplateFile idpTemplateFile = loadTemplateFile(templateFilePath);

                    Optional<ServiceConfiguration> idpServiceConfiguration = getServiceConfiguration(idpTemplateFile);
                    validateConfigurationIsUsingAuthentication(idpServiceConfiguration).ifPresent(issues::add);
                    validateServiceIconUrlConfiguration(idpServiceConfiguration, metadata).forEach(issues::add);

                    return Optional.empty();
                case COMING_SOON:
                    return Optional.empty();
                default:
                    throw new UnsupportedOperationException("Unexpected bundle type: " + bundle.getType());
            }
        } catch (IOException e) {
            issues.add(new ValidationException("Loading of template file failed: " + templateFilePath, e));
            return Optional.empty();
        }
    }

    private static TemplateFile loadTemplateFile(Path templateFilePath) throws IOException {
        File file = templateFilePath.toFile();
        TemplateFile templateFile = BUNDLE_DATA_READER
                .forType(TemplateFile.class)
                .readValue(file);
        return templateFile;
    }

    private static TemplateFile loadTemplateFileAndValidateChecksum(List<ValidationException> issues,
                                                                    Path templateFilePath) throws IOException {
        File file = templateFilePath.toFile();
        TemplateFile templateFile = loadTemplateFile(templateFilePath);
        validateTranslationChecksum(file.getName(), templateFile).ifPresent(issues::add);
        return templateFile;
    }

    private static Optional<ServiceConfiguration> getServiceConfiguration(TemplateFile templateFile) {
        Optional<ServiceConfiguration> serviceConfiguration = Optional.ofNullable(templateFile.getServices())
                .filter(services -> !services.isEmpty())
                .map(service -> service.get(0))
                .filter(service -> service.getConfiguration() != null)
                .map(service -> service.getConfiguration());
        return serviceConfiguration;
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
        // check presence of just one or none Javascript file containing synchronization code
        PathMatcher scriptPathMatcher = FileSystems.getDefault().getPathMatcher("glob:*.js");
        AtomicBoolean scriptRemoved = new AtomicBoolean(false);
        copy.removeIf(file -> {
            if (scriptPathMatcher.matches(file) && !scriptRemoved.get()) {
                scriptRemoved.set(true);
                return true;
            } else {
                return false;
            }
        });

        return copy.stream()
                .map(path -> new ValidationException("Unexpected file: " + path))
                .collect(toList());
    }

    static List<ValidationException> checkLocalizations(FsBundle bundle,
                                                        Optional<String> translationChecksum,
                                                        boolean skipCheck) {
        if (skipCheck) {
            return emptyList();
        }
        List<ValidationException> issues = new ArrayList<>();

        List<ValidationException> checksumIssues = translationChecksum.map(checksum ->
                bundle.getFiles().stream()
                        .filter(path -> BUNDLE_ALLOWED_TRANSLATIONS.contains(path))
                        .map(path -> toValidationException(bundle, checksum, issues, path))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(toList())
        ).orElse(emptyList());

        issues.addAll(checksumIssues);
        return issues;
    }

    private static Optional<ValidationException> toValidationException(FsBundle bundle,
                                                                       String translationChecksum,
                                                                       List<ValidationException> issues,
                                                                       Path path) {
        return loadTranslationFile(issues, bundle.getPath().resolve(path))
                .filter(modelTranslation -> isTranslationValid(translationChecksum, modelTranslation))
                .map(modelTranslation ->
                        new ValidationException(format("Translation checksum mismatch %s", path.getFileName())));
    }

    private static boolean isTranslationValid(String translationChecksum, ModelTranslation modelTranslation) {
        return new TranslationValidator(modelTranslation).checksum()
                .map(checksum -> !Objects.equals(checksum, translationChecksum))
                .orElse(false);
    }

    private static List<ValidationException> validateCommonMetadata(FsBundle bundle, Metadata metadata) {
        List<ValidationException> issues = new ArrayList<>();

        validateFormat(DATE_PATTERN, "created", metadata.getCreated()).ifPresent(issues::add);
        validateFormat(VERSION_PATTERN, "masVersion", metadata.getMasVersion()).ifPresent(issues::add);

        if (metadata.getEolDateWithSupport() != null) {
            validateDate("eolDateWithSupport", metadata.getEolDateWithSupport()).ifPresent(issues::add);
        }

        if (metadata.getDeprecatedDate() != null) {
            validateDate("deprecatedDate", metadata.getDeprecatedDate()).ifPresent(issues::add);
        }

        if (metadata.getDeprecatedDate() != null
                && metadata.getEolDateWithSupport() != null
                && metadata.getDeprecatedDate().compareTo(metadata.getEolDateWithSupport()) > 0) {
            issues.add(new ValidationException(
                    String.format(
                            "Deprecated date `%s` is greater than eol date with support `%s`",
                            metadata.getEolDateWithSupport(),
                            metadata.getDeprecatedDate())));
        }

        validateSync(bundle::getType, "type", metadata.getType()).ifPresent(issues::add);
        validateSync(bundle::getVendor, "vendor", replaceWhitespacesWithUnderscores(metadata.getVendor()))
                .ifPresent(issues::add);

        validateLanguages(bundle, metadata.getI18nLanguages()).ifPresent(issues::add);

        if (metadata.getCategories() != null && metadata.getCategories().contains(COMING_SOON)) {
            issues.add(new ValidationException(
                    format("Category COMING_SOON is not allowed in directory: `%s`. " +
                                    "Please move it to comming_soon dir or remove the category from bundle ",
                            metadata.getType())));
        }

        // TODO: Rules for other validations.

        return issues;
    }

    private static Optional<ValidationException> validateSupportsOAuthForActions(boolean supportsOAuthForActions) {
        return !supportsOAuthForActions
                ? optionalValidationWarning("Integration does not use OAuth for writeback actions")
                : Optional.empty();
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

    static List<ValidationException> validateHttpMetadata(FsBundle bundle, HttpMetadata metadata, Type expectedType) {
        List<ValidationException> issues = validateCommonMetadata(bundle, metadata);

        if (metadata.getType() != expectedType) {
            issues.add(new ValidationException(
                    String.format("Invalid value: field `type`, value `%s`, expecting `%s`",
                            metadata.getType(), expectedType)));
        }

        // we don't validate unique bundle id because HTTP bundle may have not unique folder names      
        validateSupportsOAuthForActions(metadata.isSupportsOAuthForActions()).ifPresent(issues::add);

        return issues;
    }

    static List<ValidationException> validateHttpMetadata(FsBundle bundle, HttpMetadata metadata) {
        return validateHttpMetadata(bundle, metadata, Type.HTTP);
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

    static Optional<ValidationException> validateTranslationChecksum(String fileName, TemplateFile templateFile) {
        return templateFile.getTranslationChecksum() == null || templateFile.getTranslationChecksum().isEmpty() ?
                Optional.of(new ValidationException(
                        format("Missing the translation checksum %s", fileName))) : Optional.empty();
    }

    static Optional<ValidationException> validateConfigurationIsUsingAuthentication(
            Optional<ServiceConfiguration> serviceConfiguration) {
        return serviceConfiguration
                .filter(configuration -> configuration.getSecurity() != null)
                .map(configuration -> configuration.getSecurity())
                .map(security -> security.getType())
                .filter(type -> NONE.name().equals(type))
                .map(type -> validationWarning(
                        "Integration configuration is not using an authentication method"));
    }

    static List<ValidationException> validateServiceIconUrlConfiguration(
            Optional<ServiceConfiguration> serviceConfiguration,
            Optional<Metadata> metadata) {
        List<ValidationException> issues = new ArrayList<>();
        String iconUrl = serviceConfiguration.map(ServiceConfiguration::getIconUrl).orElse(null);
        String iconTypeName = serviceConfiguration.map(ServiceConfiguration::getIconType).orElse(null);
        String metadataIconUrl = metadata.map(Metadata::getIconUrl).map(URI::toString).orElse(null);
        if (isNull(iconUrl) || isNull(iconTypeName)) {
            issues.add(new ValidationException("Both iconUrl and iconType have to be specified"));
        }

        validateIconTypeAndUrl(iconTypeName, iconUrl).ifPresent(issues::add);

        if (isNull(iconUrl) || isNull(metadataIconUrl) || !Objects.equals(iconUrl, metadataIconUrl)) {
            issues.add(new ValidationException("Same iconUrl must be specified in both " +
                    "metadata.json and service configuration"));
        }
        return issues;
    }

    private static Optional<ValidationException> validateIconTypeAndUrl(String iconTypeName, String iconUrl) {
        Optional<IconType> iconTypeOptional = getIconType(iconTypeName);
        if (!iconTypeOptional.isPresent()) {
            return Optional.of(new ValidationException("Unsupported iconType: " + iconTypeName));
        } else if (LIBRARY == iconTypeOptional.get() && !isNull(iconUrl)
                && (URI.create(iconUrl).isAbsolute() || !iconUrl.startsWith(EXPORTED_ICON_URL_PREFIX))) {
            return Optional.of(new ValidationException(format("%s type iconUrl must be relative and start with `%s/`",
                    LIBRARY.name(),
                    EXPORTED_ICON_URL_PREFIX)));
        }
        return Optional.empty();
    }

    private static Optional<IconType> getIconType(String iconTypeName) {
        try {
            return Optional.of(IconType.valueOf(iconTypeName));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private static Stream<ValidationException> validateEndpoints(Optional<ServiceConfiguration> serviceConfiguration) {

        List<Endpoint> endpointStream = serviceConfiguration
                .map(configuration -> configuration.getDataEndpoints())
                .orElse(emptyList());

        Stream<ValidationException> noPaginationWarnings = endpointStream.stream()
                .filter(BundlesLoader::useNoPagination)
                .map(endpoint -> validationWarning(
                        format("Endpoint `%s` does not use pagination", endpoint.getName())));

        Stream<ValidationException> noIncrementalSynchronizationWarnings = endpointStream.stream()
                .filter(BundlesLoader::useNoIncrementalSync)
                .map(endpoint -> validationWarning(
                        format("Endpoint `%s` does not use incremental syncs", endpoint.getName())));

        Stream<ValidationException> noTokenWarnings = endpointStream.stream()
                .filter(BundlesLoader::useNoToken)
                .map(endpoint -> validationWarning(
                        format("Endpoint `%s` appears to implement a secret in plaintext", endpoint.getName())));

        return concat(concat(noPaginationWarnings, noIncrementalSynchronizationWarnings), noTokenWarnings);
    }

    private static boolean useNoToken(Endpoint endpoint) {
        return Stream.of(
                endpoint.getQueryParameters(),
                endpoint.getPathParameters(),
                endpoint.getHeaderParameters(),
                endpoint.getBodyParameters())
                .flatMap(list -> list.stream())
                .filter(BundlesLoader::filterTokenNames)
                .findAny()
                .isPresent();
    }

    private static boolean filterTokenNames(EndpointParameter parameter) {
        String name = parameter.getName();
        return name != null && (name.contains(TOKEN_PARAMETER_NAME) || name.contains(BEARER_PARAMETER_NAME));
    }

    private static boolean useNoIncrementalSync(Endpoint endpoint) {
        return endpoint.getIncrementalSyncQueryParameters() == null
                || endpoint.getIncrementalSyncQueryParameters().isEmpty();
    }

    private static boolean useNoPagination(Endpoint endpoint) {
        return endpoint.getPaginationMethod() == null;
    }

    private static Stream<ValidationException> validateServiceActions(
            Optional<ServiceConfiguration> serviceConfiguration) {
        List<ServiceAction> serviceActions = serviceConfiguration
                .map(c -> c.getServiceActions())
                .orElse(emptyList());

        Stream<ValidationException> preActionWarnings = serviceActions.stream()
                .filter(a -> a.getPreActionDataUpdates() == null || a.getPreActionDataUpdates().isEmpty())
                .map(serviceAction -> validationWarning(
                        format("Service action `%s` does not use update before action",
                                serviceAction.getName())));

        Stream<ValidationException> postActionWarnings = serviceActions.stream()
                .filter(a -> a.getPostActionDataUpdates() == null || a.getPostActionDataUpdates().isEmpty())
                .map(serviceAction -> validationWarning(
                        format("Service action `%s` does not use update after action",
                                serviceAction.getName())));

        return concat(preActionWarnings, postActionWarnings);
    }

    static Optional<ValidationException> validateDate(String field, String timestamp) {
        try {
            Instant.parse(timestamp);
            return Optional.empty();
        } catch (DateTimeParseException e) {
            return Optional.of(new ValidationException(
                    String.format("Invalid UTC timestamp format: field `%s`, value `%s`", field, timestamp)));
        }
    }

    /**
     * Validate that a value matches its expected format.
     */
    static Optional<ValidationException> validateFormat(Pattern pattern, String field, String value) {
        if (pattern.matcher(value).matches()) {
            return Optional.empty();
        }

        return optionalValidationIssue(
                format("Invalid value: field `%s`, value `%s`, pattern `%s`", field, value, pattern));
    }

    /**
     * Validate that value in metadata file matches name of directory in filesystem tree.
     */
    static <T> Optional<ValidationException> validateSync(Supplier<T> valueSupplier, String field, T value) {
        T fsValue = valueSupplier.get();
        if (fsValue.equals(value)) {
            return Optional.empty();
        }

        return optionalValidationIssue(
                format("Values mismatch: field `%s`, filesystem `%s` != metadata `%s`", field, fsValue, value));
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
            return optionalValidationIssue(
                    format("Values mismatch: field `i18nLanguages`, filesystem `%s` != metadata `%s`",
                            languagesFs, languagesMetadata));
        }

        return Optional.empty();
    }
    
    static List<ValidationException> validateUniqueness(Map<Bundle, List<FsBundle>> bundles) {
        List<ValidationException> validationIssues = new ArrayList<>();

        for (Entry<Bundle, List<FsBundle>> bundle : bundles.entrySet()) {
            List<FsBundle> duplicatedBundles = bundle.getValue();
            if (duplicatedBundles.size() > 1) {
                validationIssues.add(validationIssue(format("Bundles with same vendor `%s` and id `%s` - `%s`",
                        bundle.getKey().getMetadata().getVendor(),
                        bundle.getKey().getMetadata().getId(),
                        duplicatedBundles)));
            }
        }
        
        return validationIssues;
    }

    private static String replaceWhitespacesWithUnderscores(String text) {
        return text != null && !text.isEmpty() ? text.replaceAll("\\s", WORD_SEPARATOR) : text;
    }

    private static ValidationException validationIssue(String message) {
        return new ValidationException(message);
    }

    private static Optional<ValidationException> optionalValidationIssue(String message) {
        return Optional.of(validationIssue(message));
    }
    
    private static Optional<ValidationException> optionalValidationWarning(String message) {
        return Optional.of(validationWarning(message));
    }

    private static ValidationException validationWarning(String message) {
        return new ValidationException(message, WARNING);
    }

}
