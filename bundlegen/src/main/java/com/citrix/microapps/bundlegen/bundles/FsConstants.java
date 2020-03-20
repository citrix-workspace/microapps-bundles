package com.citrix.microapps.bundlegen.bundles;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toSet;

/**
 * Names of standard files and directories in filesystem.
 */
public class FsConstants {
    public static final String DIP_DIR = "dip";
    public static final String HTTP_DIR = "http";
    public static final String COMING_SOON_DIR = "coming_soon";
    public static final String METADATA_FILE = "metadata.json";
    public static final String TEMPLATE_FILE = "file.sapp";
    public static final String TRANSLATIONS_DIR = "i18n";
    public static final String TRANSLATION_EXTENSION = ".json";
    public static final String TRANSLATION_DEFAULT_LANGUAGE = "en.json";

    public static final String ARCHIVES_DIR = "archives";
    public static final String ARCHIVE_EXTENSION = ".zip";
    public static final String BUNDLES_JSON = "bundles.json";

    /**
     * Only these files and directories are allowed in the bundle.
     */
    public static final Set<Path> BUNDLE_MANDATORY_FILES = Collections.unmodifiableSet(new HashSet<>(asList(
            Paths.get(METADATA_FILE),
            Paths.get(TEMPLATE_FILE),
            Paths.get(TRANSLATIONS_DIR, TRANSLATION_DEFAULT_LANGUAGE)
    )));

    /**
     * Only these files and directories are allowed in the bundle with coming soon category.
     */
    public static final Set<Path> BUNDLE_COMING_SOON_MANDATORY_FILES = Collections.unmodifiableSet(new HashSet<>(asList(
            Paths.get(METADATA_FILE)
    )));

    /**
     * Only these translation files are allowed in the bundle.
     */
    public static final Set<Path> BUNDLE_ALLOWED_TRANSLATIONS = Collections.unmodifiableSet(new HashSet<>(asList(
            Paths.get(TRANSLATIONS_DIR, TRANSLATION_DEFAULT_LANGUAGE),
            Paths.get(TRANSLATIONS_DIR, "de.json"),
            Paths.get(TRANSLATIONS_DIR, "es.json"),
            Paths.get(TRANSLATIONS_DIR, "fr.json"),
            Paths.get(TRANSLATIONS_DIR, "ja.json"),
            Paths.get(TRANSLATIONS_DIR, "nl.json"),
            Paths.get(TRANSLATIONS_DIR, "zh-CN.json"),
            Paths.get(TRANSLATIONS_DIR, "pt-BR.json")
    )));

    /**
     * Only these files and directories are allowed in the bundle.
     */
    public static final Set<Path> BUNDLE_ALLOWED_FILES = Collections.unmodifiableSet(
            Stream.concat(asList(
                    Paths.get(METADATA_FILE),
                    Paths.get(TEMPLATE_FILE)).stream(),
                    BUNDLE_ALLOWED_TRANSLATIONS.stream())
                    .collect(toSet()));
    /**
     * Only these files and directories are allowed in the bundle with coming soon category.
     */
    public static final Set<Path> BUNDLE_COMING_SOON_ALLOWED_FILES = Collections.unmodifiableSet(new HashSet<>(asList(
            Paths.get(METADATA_FILE)
    )));

}
