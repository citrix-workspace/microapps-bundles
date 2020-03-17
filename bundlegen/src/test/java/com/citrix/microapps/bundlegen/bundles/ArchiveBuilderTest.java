package com.citrix.microapps.bundlegen.bundles;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import static com.citrix.microapps.bundlegen.TestUtils.path;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ArchiveBuilderTest {
    private static final List<Path> TEST_BUNDLE_FILES = Arrays.asList(
            Paths.get("i18n", "de.json"),
            Paths.get("i18n", "en.json"),
            Paths.get("i18n", "es.json"),
            Paths.get("i18n", "fr.json"),
            Paths.get("i18n", "ja.json"),
            Paths.get("i18n", "nl.json"),
            Paths.get("i18n", "zh-CN.json"),
            Paths.get("metadata.json"),
            Paths.get("file.sapp")
    );

    private static final FsBundle TEST_BUNDLE =
            new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle1/0.0.1"), TEST_BUNDLE_FILES);

    private List<String> listEntriesInZip(byte[] content) throws IOException {
        List<String> result = new ArrayList<>();

        try (ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream(content))) {
            ZipEntry entry = zipStream.getNextEntry();
            while (entry != null) {
                result.add(entry.getName());
                entry = zipStream.getNextEntry();
            }
        }

        return result;
    }

    /**
     * @see #TEST_BUNDLE
     */
    private void assertContent(byte[] content) {
        List<String> expectedEntries = Arrays.asList(
                "vendor1_bundle1_0.0.1/i18n/de.json",
                "vendor1_bundle1_0.0.1/i18n/en.json",
                "vendor1_bundle1_0.0.1/i18n/es.json",
                "vendor1_bundle1_0.0.1/i18n/fr.json",
                "vendor1_bundle1_0.0.1/i18n/ja.json",
                "vendor1_bundle1_0.0.1/i18n/nl.json",
                "vendor1_bundle1_0.0.1/i18n/zh-CN.json",
                "vendor1_bundle1_0.0.1/metadata.json",
                "vendor1_bundle1_0.0.1/file.sapp"
        );

        assertAll(
                () -> assertThat(BundlesArchiver.shaHex(content)).satisfiesAnyOf(
                        hash -> assertEquals("ad8a78f8d64b3573c4ce620cb2077a16f44daa9fabc94a01b530e13a15ec1c97", hash, // UNIX
                                "Produced zip should be always exactly same on byte level"),
                        hash -> assertEquals("ad8a78f8d64b3573c4ce620cb2077a16f44daa9fabc94a01b530e13a15ec1c97", hash, // WINDOWS
                                "Produced zip should be always exactly same on byte level")
                ),
                () -> assertEquals(expectedEntries, listEntriesInZip(content))
        );
    }

    @Test
    void buildArchive(@TempDir Path tempDir) {
        byte[] content = new BundlesArchiver(tempDir).buildArchive(TEST_BUNDLE);
        assertContent(content);
    }

    @Test
    void directoryDoesNotExist(@TempDir Path tempDir) {
        FsBundle bundle = new FsDipBundle(path("this/path/does/not/exist"),
                Collections.singletonList(Paths.get("metadata.json")));

        assertThatThrownBy(() -> new BundlesArchiver(tempDir).buildArchive(bundle))
                .isInstanceOf(UncheckedIOException.class)
                .hasMessageContaining("Adding of file to zip archive failed: ");
    }

    @Test
    void buildAndStore(@TempDir Path tempDir) throws Exception {
        BundlesArchiver builder = new BundlesArchiver(tempDir);
        byte[] content = builder.buildArchive(TEST_BUNDLE);
        Path path = builder.storeArchive(TEST_BUNDLE, content);

        assertEquals(tempDir.resolve("vendor1").resolve("vendor1_bundle1_0.0.1.zip"), path);
        assertTrue(Files.exists(path), "Path should exist: " + path);

        byte[] loadedContent = Files.readAllBytes(path);
        assertContent(loadedContent);
    }

    @Test
    void overwriteExisting(@TempDir Path tempDir) throws Exception {
        // No exception should occur if the file is already there.
        buildAndStore(tempDir);
        buildAndStore(tempDir);
        buildAndStore(tempDir);
    }
}
