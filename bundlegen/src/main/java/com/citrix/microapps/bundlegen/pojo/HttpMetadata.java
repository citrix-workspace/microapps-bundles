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
 * Metadata loaded from `metadata.json` for HTTP integrations.
 */
@Getter
@SuperBuilder(toBuilder = true)
public class HttpMetadata extends Metadata {

    private final UUID id;  // TODO: Remove it from source json?
    private final ScriptMetadata scriptMetadata;

    @JsonCreator
    public HttpMetadata(
            @JsonProperty(value = "type", required = true) Type type,
            @JsonProperty(value = "vendor", required = true) String vendor,
            @JsonProperty(value = "id", required = true) UUID id,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "trackingUuid") UUID trackingUuid,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "description") String description,
            @JsonProperty(value = "iconUrl", required = true) URI iconUrl,
            @JsonProperty(value = "masVersion", required = true) String masVersion,
            @JsonProperty(value = "categories") List<Category> categories,
            @JsonProperty(value = "created", required = true) String created,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            @JsonProperty(value = "deprecatedDate") String deprecatedDate,
            @JsonProperty(value = "supportsOAuthForActions") boolean supportsOAuthForActions,
            @JsonProperty(value = "i18nLanguages") List<String> i18nLanguages,
            @JsonProperty(value = "apps") List<App> apps,
            @JsonProperty(value = "vaResolvers") List<VaResolver> vaResolvers,
            @JsonProperty(value = "tags") List<Tag> tags,
            @JsonProperty(value = "scriptMetadata") ScriptMetadata scriptMetadata,
            @JsonProperty(value = "hideAddButton") boolean hideAddButton
    ) {
        super(type,
                vendor,
                trackingUuid,
                title,
                description,
                iconUrl,
                masVersion,
                categories,
                created,
                deprecatedDate,
                supportsOAuthForActions,
                i18nLanguages,
                apps,
                vaResolvers,
                tags,
                hideAddButton);

        this.id = id;
        this.scriptMetadata = scriptMetadata;
    }
}
