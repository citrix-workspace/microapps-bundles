package com.citrix.microapps.bundlegen.bundles;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.URI;
import java.nio.file.Path;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.citrix.microapps.bundlegen.pojo.Bundles;
import com.citrix.microapps.bundlegen.pojo.OutMetadata;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLES_JSON;
import static com.citrix.microapps.bundlegen.bundles.IssueSeverity.ERROR;
import static com.citrix.microapps.bundlegen.bundles.IssueSeverity.WARNING;
import static java.util.stream.Collectors.toList;

/**
 * Reader of input bundles and writer of the output ones.
 */
public class BundlesProcessor {
    private static final Logger logger = LoggerFactory.getLogger(BundlesProcessor.class);

    private static final ObjectWriter METADATA_WRITER = new ObjectMapper()
            .writerWithDefaultPrettyPrinter();

    private static final DateTimeFormatter CREATION_DATETIME_FORMATTER = new DateTimeFormatterBuilder()
            .append(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            .optionalStart()
            .appendOffsetId()
            .toFormatter()
            .withZone(ZoneOffset.UTC);

    private final BundlesFinder finder;
    private final BundlesLoader loader;
    private final BundlesArchiver archiver;

    private final Path distDir;
    private final URI bundlesRepository;
    private final Instant bestPractisesValidationLimit;

    public BundlesProcessor(BundlesFinder finder,
                            BundlesLoader loader,
                            BundlesArchiver archiver,
                            Path distDir,
                            URI bundlesRepository,
                            Instant bestPractisesValidationLimit) {
        this.finder = finder;
        this.loader = loader;
        this.archiver = archiver;
        this.distDir = distDir;
        this.bundlesRepository = bundlesRepository;
        this.bestPractisesValidationLimit = bestPractisesValidationLimit;
    }

    public boolean processAllBundles() {
        List<Bundle> allBundles = finder
                .findBundles()
                .map(loader::loadBundle)
                .collect(toList());

        List<BundleIssue> issues = allBundles.stream()
                .flatMap(bundle -> bundle.getIssues().stream()
                        .filter(issue -> isWarningIssueOnlyForValidatedBundle(bundle, issue)))
                .collect(toList());

        List<BundleIssue> errors = getIssuesByType(issues, ERROR);
        List<BundleIssue> warnings = getIssuesByType(issues, WARNING);

        if (!errors.isEmpty()) {
            logger.error("Bundles validation failed: {} issues detected", errors.size());
            errors.forEach(this::reportIssue);
            return false;
        }

        if (!warnings.isEmpty()) {
            logger.warn("Bundles validation: {} warnings detected", warnings.size());
            logger.warn("Please provide a justification for any configuration warnings");
            warnings.forEach(this::reportWarningIssue);
        }

        logger.info("Bundles validation successful, no error detected");

        List<OutMetadata> archivedBundles = allBundles.stream()
                .map(this::archiveOneBundle)
                .collect(toList());

        writeBundlesJson(archivedBundles, distDir.resolve(BUNDLES_JSON));
        return true;
    }

    private boolean isWarningIssueOnlyForValidatedBundle(Bundle bundle, BundleIssue issue) {
        return (issue.getSeverity() == WARNING && createdAfterBestPractisesValidationLimit(bundle))
                || issue.getSeverity() == ERROR;
    }

    private List<BundleIssue> getIssuesByType(List<BundleIssue> issues, IssueSeverity severity) {
        return issues.stream()
                .filter(issue -> issue.getSeverity().equals(severity))
                .sorted(Comparator.comparing(issue -> issue.getBundle().getPath()))
                .collect(toList());
    }

    /**
     * The validations are collected in {@link BundlesLoader}, this is only reporting.
     */
    private void reportIssue(BundleIssue issue) {
        logger.error("\tBundle {}: {}", issue.getBundle(), issue.getDetails().getMessage());

        Throwable cause = issue.getDetails().getCause();
        while (cause != null) {
            logger.error("\t\tCause: {}", cause.toString()); // No stack trace for now
            cause = cause.getCause();
        }
    }

    /**
     * The validations are collected in {@link BundlesLoader}, this is only warning reporting.
     */
    private void reportWarningIssue(BundleIssue issue) {
        logger.warn("\tBundle {}: {}", issue.getBundle(), issue.getDetails().getMessage());

        Throwable cause = issue.getDetails().getCause();
        while (cause != null) {
            logger.warn("\t\tCause: {}", cause.toString()); // No stack trace for now
            cause = cause.getCause();
        }
    }

    public OutMetadata archiveOneBundle(Bundle bundle) {
        logger.info("Building bundle archive: {}", bundle);
        byte[] content = archiver.buildArchive(bundle.getFs());
        Path archivePath = archiver.storeArchive(bundle.getFs(), content);
        String hash = BundlesArchiver.shaHex(content);
        URI downloadUrl = bundle.getFs().getDownloadUrl(bundlesRepository);
        logger.info("Bundle archive created: {}, {} B, hash {}", archivePath, content.length, hash);

        return new OutMetadata(bundle.getMetadata(), downloadUrl, hash);
    }

    public void writeBundlesJson(List<OutMetadata> allBundles, Path bundlesJson) {
        try {
            logger.info("Storing output metadata: {} bundles, {}", allBundles.size(), bundlesJson);
            Bundles bundles = new Bundles(allBundles);
            METADATA_WRITER.writeValue(bundlesJson.toFile(), bundles);
        } catch (IOException e) {
            throw new UncheckedIOException("Writing bundles JSON failed", e);
        }
    }

    private boolean createdAfterBestPractisesValidationLimit(Bundle bundle) {
        try {
            return Instant.from(CREATION_DATETIME_FORMATTER.parse(bundle.getMetadata().getCreated()))
                    .isAfter(bestPractisesValidationLimit);
        } catch (UnsupportedOperationException e) {
            return false;
        }
    }
}
