package com.citrix.microapps.bundlegen.pojo;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * Metadata loaded from `metadata.json` for Coming Soon integrations.
 */
@Getter
@SuperBuilder(toBuilder = true)
public class ComingSoonMetadata extends Metadata {

    private final String version;

    @JsonCreator
    public ComingSoonMetadata(
            @JsonProperty(value = "type", required = true) Type type,
            @JsonProperty(value = "vendor", required = true) String vendor,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "trackingUuid") UUID trackingUuid,
            @JsonProperty(value = "id", required = true) String id,
            @JsonProperty(value = "version") String version,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "description") String description,
            @JsonProperty(value = "iconUrl", required = true) URI iconUrl,
            @JsonProperty(value = "categories") List<Category> categories,
            @JsonProperty(value = "created") String created,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "deprecatedDate") String deprecatedDate,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "eolDateWithSupport") String eolDateWithSupport,
            @JsonProperty(value = "tags") List<Tag> tags
    ) {
        super(id, 
                type,
                vendor,
                trackingUuid,
                title,
                description,
                iconUrl,
                null,
                categories,
                created,
                deprecatedDate,
                eolDateWithSupport,
                false,
                null,
                null,
                null,
                tags,
                false);
        this.version = version;
    }
}
