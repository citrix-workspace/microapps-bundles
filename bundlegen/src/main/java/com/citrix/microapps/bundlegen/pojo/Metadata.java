package com.citrix.microapps.bundlegen.pojo;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import static java.util.Collections.emptyList;
import static java.util.Optional.ofNullable;

/**
 * Metadata of a bundle loaded from `metadata.json`, common parts.
 */

@Getter
@SuperBuilder(toBuilder = true)
public abstract class Metadata {

    private final Type type;
    private final String vendor;
    private final UUID trackingUuid;
    private final String title;
    private final String description;
    private final URI iconUrl;
    private final String masVersion;
    private final List<Category> categories;
    private final String created;
    private final String deprecatedDate;
    private final boolean supportsOAuthForActions;
    private final List<String> i18nLanguages;
    private final List<App> apps;
    private final List<VaResolver> vaResolvers;
    private final List<Tag> tags;
    private final boolean hideAddButton;

    public Metadata(
            Type type,
            String vendor,
            UUID trackingUuid,
            String title,
            String description,
            URI iconUrl,
            String masVersion,
            List<Category> categories,
            String created,
            String deprecatedDate,
            boolean supportsOAuthForActions,
            List<String> i18nLanguages,
            List<App> apps,
            List<VaResolver> vaResolvers,
            List<Tag> tags,
            boolean hideAddButton
    ) {
        this.type = type;
        this.vendor = vendor;
        this.trackingUuid = trackingUuid;
        this.title = title;
        this.description = ofNullable(description).orElse("");
        this.iconUrl = iconUrl;
        this.masVersion = masVersion;
        this.categories = ofNullable(categories).orElse(emptyList());
        this.created = created;
        this.deprecatedDate = deprecatedDate;
        this.supportsOAuthForActions = supportsOAuthForActions;
        this.i18nLanguages = ofNullable(i18nLanguages).orElse(emptyList());
        this.apps = ofNullable(apps).orElse(emptyList());
        this.vaResolvers = ofNullable(vaResolvers).orElse(emptyList());
        this.tags = ofNullable(tags).orElse(emptyList());
        this.hideAddButton = ofNullable(hideAddButton).orElse(false);
    }
}
