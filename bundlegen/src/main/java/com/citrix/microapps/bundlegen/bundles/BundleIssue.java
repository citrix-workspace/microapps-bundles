package com.citrix.microapps.bundlegen.bundles;

import lombok.Getter;

/**
 * One issue detected in a bundle.
 */
@Getter
public class BundleIssue {
    private final FsBundle bundle;
    private final ValidationException details;
    private final IssueSeverity severity;

    public BundleIssue(FsBundle bundle, ValidationException details, IssueSeverity severity) {
        this.bundle = bundle;
        this.details = details;
        this.severity = severity;
    }

    @Override
    public String toString() {
        return "BundleIssue{" +
                "bundle=" + bundle +
                ", details=" + details +
                '}';
    }
}
