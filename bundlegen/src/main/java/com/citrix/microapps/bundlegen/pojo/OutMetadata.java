package com.citrix.microapps.bundlegen.pojo;

import java.net.URI;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

/**
 * Metadata of one bundle written to `bundles.json`.
 */
public class OutMetadata {
    private final Metadata metadata;
    private final URI downloadUrl;
    private final String hashChecksum;

    public OutMetadata(Metadata metadata,
                       URI downloadUrl,
                       String hashChecksum) {
        this.metadata = metadata;
        this.downloadUrl = downloadUrl;
        this.hashChecksum = hashChecksum;
    }

    @JsonUnwrapped
    public Metadata getMetadata() {
        return metadata;
    }

    public URI getDownloadUrl() {
        return downloadUrl;
    }

    public String getHashChecksum() {
        return hashChecksum;
    }
}
