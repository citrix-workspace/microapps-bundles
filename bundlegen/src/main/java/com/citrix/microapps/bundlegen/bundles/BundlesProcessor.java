package com.citrix.microapps.bundlegen.bundles;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.URI;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.citrix.microapps.bundlegen.pojo.Bundles;
import com.citrix.microapps.bundlegen.pojo.OutMetadata;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import static com.citrix.microapps.bundlegen.bundles.FsConstants.BUNDLES_JSON;

/**
 * Reader of input bundles and writer of the output ones.
 */
public class BundlesProcessor {
    private static final Logger logger = LoggerFactory.getLogger(BundlesProcessor.class);

    private static final ObjectWriter METADATA_WRITER = new ObjectMapper()
            .writerWithDefaultPrettyPrinter();

    private final BundlesFinder finder;
    private final BundlesLoader loader;
    private final BundlesArchiver archiver;

    private final Path distDir;
    private final URI bundlesRepository;

    public BundlesProcessor(BundlesFinder finder,
                            BundlesLoader loader,
                            BundlesArchiver archiver,
                            Path distDir,
                            URI bundlesRepository) {
        this.finder = finder;
        this.loader = loader;
        this.archiver = archiver;
        this.distDir = distDir;
        this.bundlesRepository = bundlesRepository;
    }

    public boolean processAllBundles() {
        List<Bundle> allBundles = finder
                .findBundles()
                .map(loader::loadBundle)
                .collect(Collectors.toList());

        List<BundleIssue> issues = allBundles.stream()
                .flatMap(bundle -> bundle.getIssues().stream())
                .collect(Collectors.toList());

        if (!issues.isEmpty()) {
            logger.error("Bundles validation failed: {} issues detected", issues.size());
            issues.forEach(this::reportIssue);
            return false;
        }

        logger.info("Bundles validation successful, no issue detected");

        List<OutMetadata> archivedBundles = allBundles.stream()
                .map(this::archiveOneBundle)
                .collect(Collectors.toList());

        writeBundlesJson(archivedBundles, distDir.resolve(BUNDLES_JSON));
        return true;
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
}
