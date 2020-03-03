package com.citrix.microapps.bundlegen.bundles;

import java.io.UncheckedIOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import static com.citrix.microapps.bundlegen.TestUtils.path;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BundlesFinderTest {
    private List<FsBundle> findBundles(Path path) {
        return new BundlesFinder(path)
                .findBundles()
                .sorted(Comparator.comparing(FsBundle::getPath))
                .collect(Collectors.toList());
    }

    @Test
    void findBundles() {
        List<FsBundle> actual = findBundles(path("src/test/resources/bundles"));

        List<FsBundle> expected = Arrays.asList(
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle1/0.0.1"),
                        Arrays.asList(
                                Paths.get("file.sapp"),
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("i18n", "es.json"),
                                Paths.get("i18n", "fr.json"),
                                Paths.get("i18n", "ja.json"),
                                Paths.get("i18n", "nl.json"),
                                Paths.get("i18n", "zh-CN.json"),
                                Paths.get("metadata.json")
                        )),
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle2/0.0.1"),
                        Collections.singletonList(Paths.get("metadata.json"))),
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor2/bundle1/0.0.1"),
                        Collections.singletonList(Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendor2/bundle2"),
                        Collections.singletonList(Paths.get("metadata.json")))
        );

        assertEquals(expected, actual);
    }

    @Test
    void unexpectedFileInDirectories() {
        assertThatThrownBy(() -> findBundles(path("src/test/resources/bundles_unexpected_file")))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Path is not a directory: ");
    }

    @Test
    void directoryDoesNotExist() {
        assertThatThrownBy(() -> findBundles(path("this/path/does/not/exist")))
                .isInstanceOf(UncheckedIOException.class)
                .hasMessageContaining("Listing of directory failed: ");
    }
}
