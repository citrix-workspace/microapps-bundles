package com.citrix.microapps.bundlegen.pojo;

import java.util.List;

/**
 * Data to be written to `bundles.json`.
 */
public class Bundles {
    private final List<OutMetadata> bundles;

    public Bundles(List<OutMetadata> bundles) {
        this.bundles = bundles;
    }

    public List<OutMetadata> getBundles() {
        return bundles;
    }
}
