package com.citrix.microapps.bundlegen.pojo;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.net.URI;
import java.util.List;

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
    private final String title;
    private final String description;
    private final URI iconUrl;
    private final String masVersion;
    private final List<Category> categories;
    private final String created;
    private final boolean supportsOAuthForActions;
    private final List<String> i18nLanguages;
    private final List<App> apps;
    private final List<VaResolver> vaResolvers;
    private final List<Tag> tags;

    public Metadata(
            Type type,
            String vendor,
            String title,
            String description,
            URI iconUrl,
            String masVersion,
            List<Category> categories,
            String created,
            boolean supportsOAuthForActions,
            List<String> i18nLanguages,
            List<App> apps,
            List<VaResolver> vaResolvers,
            List<Tag> tags
    ) {
        this.type = type;
        this.vendor = vendor;
        this.title = title;
        this.description = ofNullable(description).orElse("");
        this.iconUrl = iconUrl;
        this.masVersion = masVersion;
        this.categories = ofNullable(categories).orElse(emptyList());
        this.created = created;
        this.supportsOAuthForActions = supportsOAuthForActions;
        this.i18nLanguages = ofNullable(i18nLanguages).orElse(emptyList());
        this.apps = ofNullable(apps).orElse(emptyList());
        this.vaResolvers = ofNullable(vaResolvers).orElse(emptyList());
        this.tags = ofNullable(tags).orElse(emptyList());
    }
}
