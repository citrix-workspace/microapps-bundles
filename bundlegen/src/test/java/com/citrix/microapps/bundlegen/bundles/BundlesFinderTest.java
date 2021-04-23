package com.citrix.microapps.bundlegen.bundles;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import static com.citrix.microapps.bundlegen.TestUtils.path;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

        List<FsBundle> expected = asList(
                new FsComingSoonBundle(path("src/test/resources/bundles/coming_soon/vendor3/bundle3"),
                        singletonList(Paths.get("metadata.json"))),
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle1/0.0.1"),
                        asList(
                                Paths.get("file.sapp"),
                                Paths.get("i18n", "de.json"),
                                Paths.get("i18n", "en.json"),
                                Paths.get("i18n", "es.json"),
                                Paths.get("i18n", "fr.json"),
                                Paths.get("i18n", "ja.json"),
                                Paths.get("i18n", "nl.json"),
                                Paths.get("i18n", "zh-CN.json"),
                                Paths.get("metadata.json"))),
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor1/bundle2/0.0.1"),
                        singletonList(Paths.get("metadata.json"))),
                new FsDipBundle(path("src/test/resources/bundles/dip/vendor2/bundle1/0.0.1"),
                        singletonList(Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendor1/SAP-SuccessFactors-EC"),
                        singletonList(Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendor1/SAP-SuccessFactors-EC-2"),
                        asList(
                                Paths.get("file.sapp"),
                                Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendor2/bundle2"),
                        singletonList(Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendorForIconUrlTest" +
                        "/SAP-SuccessFactors-EC"),
                        asList(Paths.get("file.sapp"), Paths.get("metadata.json"))),
                new FsHttpBundle(path("src/test/resources/bundles/http/vendorForIconUrlTest" +
                        "/SAP-SuccessFactors-EC-2"),
                        asList(Paths.get("file.sapp"), Paths.get("metadata.json"))),
                new FsIdpBundle(path("src/test/resources/bundles/identity_provider/vendor1/bundle1"),
                        singletonList(Paths.get("metadata.json")))
        );

        assertThat(actual).containsExactlyInAnyOrderElementsOf(expected);
    }

    @Test
    void unexpectedFileInDirectories() {
        assertThatThrownBy(() -> findBundles(path("src/test/resources/bundles_unexpected_file")))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Path is not a directory: ");
    }

    @Test
    void directoryDoesNotExist() {
        List<FsBundle> bundles = findBundles(path("this/path/does/not/exist"));
        assertTrue(bundles.isEmpty());
    }
}
