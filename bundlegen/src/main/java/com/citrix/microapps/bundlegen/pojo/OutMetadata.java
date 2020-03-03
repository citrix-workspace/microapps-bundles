package com.citrix.microapps.bundlegen.pojo;

import java.net.URI;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

/**
 * Metadata of one bundle written to `bundles.json`.
 */
public class OutMetadata {
    private final Metadata metadata;
    private final URI downloadUrl;
    private final String md5Checksum;

    public OutMetadata(Metadata metadata,
                       URI downloadUrl,
                       String md5Checksum) {
        this.metadata = metadata;
        this.downloadUrl = downloadUrl;
        this.md5Checksum = md5Checksum;
    }

    @JsonUnwrapped
    public Metadata getMetadata() {
        return metadata;
    }

    public URI getDownloadUrl() {
        return downloadUrl;
    }

    public String getMd5Checksum() {
        return md5Checksum;
    }
}
