package com.citrix.microapps.bundlegen.bundles;

import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.citrix.microapps.bundlegen.pojo.Type;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

class FsDipBundleTest {
    @Test
    void getters() {
        Path path = Paths.get("test", "dip", "vendor", "id", "version");
        FsBundle bundle = new FsDipBundle(path, Collections.singletonList(Paths.get("test.txt")));

        assertAll(
                () -> assertEquals(Type.DIP, bundle.getType()),
                () -> assertSame(path, bundle.getPath()),
                () -> assertEquals("vendor", bundle.getVendor()),
                () -> assertEquals("id", bundle.getId()),
                () -> assertEquals(Optional.of("version"), bundle.getVersion()),
                () -> assertEquals("vendor_id_version", bundle.getArchiveName()),
                () -> assertEquals(Paths.get("somewhere/archives/vendor/vendor_id_version.zip"),
                        bundle.getArchivePath(Paths.get("somewhere", "archives"))),
                () -> assertEquals(URI.create("https://github.com/michaltc/workspace-microapps-bundles/blob/master" +
                                "/bundles/archives/vendor/vendor_id_version.zip"),
                        bundle.getDownloadUrl(URI.create("https://github.com/michaltc/workspace-microapps-bundles" +
                                "/blob/master/bundles/archives/"))),
                () -> assertEquals(URI.create("https://github.com/michaltc/workspace-microapps-bundles/blob/master" +
                                "/bundles/archives/vendor/vendor_id_version.zip"),
                        bundle.getDownloadUrl(URI.create("https://github.com/michaltc/workspace-microapps-bundles" +
                                "/blob/master/bundles/archives"))),
                () -> assertEquals(Paths.get("test/dip/vendor/id/version/metadata.json"), bundle.getMetadataPath()),
                () -> assertEquals(Paths.get("test/dip/vendor/id/version").toString(), bundle.toString()),
                () -> assertEquals(Collections.singletonList(Paths.get("test.txt")), bundle.getFiles())
        );
    }
}
