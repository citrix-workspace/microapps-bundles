package com.citrix.microapps.bundlegen.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * Script metadata properties loaded from `metadata.json` for HTTP integrations.
 */
@Getter
@SuperBuilder(toBuilder = true)
public class ScriptMetadata {

    private final String originalFileName;
    private final String storedFileName;
    private final String checksum;
    private final String apiVersion;

    @JsonCreator
    public ScriptMetadata(
            @JsonProperty(value = "originalFileName", required = true) String originalFileName,
            @JsonProperty(value = "storedFileName", required = true) String storedFileName,
            @JsonProperty(value = "checksum", required = true) String checksum,
            @JsonProperty(value = "apiVersion", required = true) String apiVersion) {
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.checksum = checksum;
        this.apiVersion = apiVersion;
    }
}

