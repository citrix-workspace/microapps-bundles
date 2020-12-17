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

class FsIdpBundleTest {
    @Test
    void getters() {
        Path path = Paths.get("test", "identity_provider", "vendor", "id");
        FsIdpBundle bundle = new FsIdpBundle(path, Collections.singletonList(Paths.get("test.txt")));

        assertAll(
                () -> assertEquals(Type.IDENTITY_PROVIDER, bundle.getType()),
                () -> assertSame(path, bundle.getPath()),
                () -> assertEquals("vendor", bundle.getVendor()),
                () -> assertEquals("id", bundle.getId()),
                () -> assertEquals(Optional.empty(), bundle.getVersion()),
                () -> assertEquals("vendor_id", bundle.getArchiveName()),
                () -> assertEquals(Paths.get("somewhere/archives/vendor/vendor_id.zip"),
                        bundle.getArchivePath(Paths.get("somewhere", "archives"))),
                () -> assertEquals(URI.create("https://github.com/michaltc/workspace-microapps-bundles/blob/master" +
                                "/bundles/archives/vendor/vendor_id.zip"),
                        bundle.getDownloadUrl(URI.create("https://github.com/michaltc/workspace-microapps-bundles" +
                                "/blob" +
                                "/master/bundles/archives/"))),
                () -> assertEquals(URI.create("https://github.com/michaltc/workspace-microapps-bundles/blob/master" +
                                "/bundles/archives/vendor/vendor_id.zip"),
                        bundle.getDownloadUrl(URI.create("https://github.com/michaltc/workspace-microapps-bundles" +
                                "/blob" +
                                "/master/bundles/archives"))),
                () -> assertEquals(Paths.get("test/identity_provider/vendor/id/metadata.json"), bundle.getMetadataPath()),
                () -> assertEquals(Paths.get("test/identity_provider/vendor/id").toString(), bundle.toString()),
                () -> assertEquals(Collections.singletonList(Paths.get("test.txt")), bundle.getFiles())
        );
    }
}
