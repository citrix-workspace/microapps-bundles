package com.citrix.microapps.bundlegen;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import com.citrix.microapps.bundlegen.bundles.BundlesArchiver;
import com.citrix.microapps.bundlegen.bundles.BundlesFinder;
import com.citrix.microapps.bundlegen.bundles.BundlesLoader;
import com.citrix.microapps.bundlegen.bundles.BundlesProcessor;

import static com.citrix.microapps.bundlegen.bundles.FsConstants.ARCHIVES_DIR;

/**
 * Application runner with `main()`.
 */
public class BundlegenMain {
    private static final Logger logger = LoggerFactory.getLogger(BundlegenMain.class);

    public static void main(String[] args) {
        // Maven injects "com.citrix.microapps.bundlegen.BundlegenMain.main()"
        Thread.currentThread().setName("main");

        logLifeCycleEvent("STARTING APPLICATION");
        Thread.setDefaultUncaughtExceptionHandler((thread, e) -> logger.error("Uncaught exception: {}", thread, e));

        if (args.length < 3) {
            logger.info("Usage:   bundlegen bundles-dir dist-dir link-bundles");
            logger.info("Example: bundlegen bundles bundles-dist https://github" +
                    ".com/michaltc/workspace-microapps-bundles/tree/master/bundles/");

            logger.error("Missing mandatory arguments");
            System.exit(1);
        }

        Path bundlesDir = Paths.get(args[0]);
        Path distDir = Paths.get(args[1]);
        Path archivesDir = distDir.resolve(ARCHIVES_DIR);
        URI bundlesRepository = URI.create(
                args[2].endsWith("/")
                        ? args[2] + ARCHIVES_DIR
                        : args[2] + "/" + ARCHIVES_DIR);

        if (!Files.isDirectory(bundlesDir) || !Files.isReadable(bundlesDir)) {
            logger.error("Input path with bundles does not exist or is not a readable directory: {}", bundlesDir);
            System.exit(1);
        }

        createDirectories(distDir);
        createDirectories(archivesDir);

        BundlesFinder finder = new BundlesFinder(bundlesDir);
        BundlesLoader loader = new BundlesLoader();
        BundlesArchiver archiver = new BundlesArchiver(archivesDir);
        BundlesProcessor processor = new BundlesProcessor(finder, loader, archiver, distDir, bundlesRepository);

        if (!processor.processAllBundles()) {
            logger.error("Bundles processing failed");
            System.exit(1);
        }

        logLifeCycleEvent("APPLICATION STOPPED");
        logger.debug("Stopping logging subsystem");
        ((LoggerContext) LoggerFactory.getILoggerFactory()).stop();
    }

    private static void createDirectories(Path directory) {
        try {
            Files.createDirectories(directory);
        } catch (IOException e) {
            throw new RuntimeException("Creation of directory failed: " + directory, e);
        }
    }

    private static void logLifeCycleEvent(String message) {
        logger.info("====================== {} ======================", message.toUpperCase());
    }
}
