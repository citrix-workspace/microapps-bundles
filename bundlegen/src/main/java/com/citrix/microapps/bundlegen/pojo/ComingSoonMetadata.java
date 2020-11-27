package com.citrix.microapps.bundlegen.pojo;

import java.net.URI;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * Metadata loaded from `metadata.json` for Coming Soon integrations.
 */
@Getter
@SuperBuilder(toBuilder = true)
public class ComingSoonMetadata extends Metadata {

    private final String id;
    private final String version;

    @JsonCreator
    public ComingSoonMetadata(
            @JsonProperty(value = "type", required = true) Type type,
            @JsonProperty(value = "vendor", required = true) String vendor,
            @JsonProperty(value = "id", required = true) String id,
            @JsonProperty(value = "version") String version,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "description") String description,
            @JsonProperty(value = "iconUrl", required = true) URI iconUrl,
            @JsonProperty(value = "categories") List<Category> categories,
            @JsonProperty(value = "created") String created,
            @JsonProperty(value = "tags") List<Tag> tags
    ) {
        super(type,
                vendor,
                title,
                description,
                iconUrl,
                null,
                categories,
                created,
                false,
                null,
                null,
                null,
                tags);
        this.id = id;
        this.version = version;
    }
}
