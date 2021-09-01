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
 * Metadata loaded from `metadata.json` for DIP integrations.
 */
@Getter
@SuperBuilder(toBuilder = true)
public class DipMetadata extends Metadata {
    private final String version;  // TODO: Remove it from source json?

    @JsonCreator
    public DipMetadata(
            @JsonProperty(value = "type", required = true) Type type,
            @JsonProperty(value = "vendor", required = true) String vendor,
            @JsonProperty(value = "id", required = true) String id,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "trackingUuid") UUID trackingUuid,
            @JsonProperty(value = "version", required = true) String version,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "description") String description,
            @JsonProperty(value = "iconUrl", required = true) URI iconUrl,
            @JsonProperty(value = "masVersion", required = true) String masVersion,
            @JsonProperty(value = "categories", required = true) List<Category> categories,
            @JsonProperty(value = "created", required = true) String created,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "deprecatedDate") String deprecatedDate,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "eolDateWithSupport") String eolDateWithSupport,
            @JsonProperty(value = "supportsOAuthForActions") boolean supportsOAuthForActions,
            @JsonProperty(value = "i18nLanguages") List<String> i18nLanguages,
            @JsonProperty(value = "apps") List<App> apps,
            @JsonProperty(value = "tags") List<Tag> tags
    ) {
        super(id,
                type,
                vendor,
                trackingUuid,
                title,
                description,
                iconUrl,
                masVersion,
                categories,
                created,
                deprecatedDate,
                eolDateWithSupport,
                supportsOAuthForActions,
                i18nLanguages,
                apps,
                tags,
                false);

        this.version = version;
    }
}
