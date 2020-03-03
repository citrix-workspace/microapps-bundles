package com.citrix.microapps.bundlegen.bundles;

/**
 * One issue detected in a bundle.
 */
public class BundleIssue {
    private final FsBundle bundle;
    private final ValidationException details;

    public BundleIssue(FsBundle bundle, ValidationException details) {
        this.bundle = bundle;
        this.details = details;
    }

    public FsBundle getBundle() {
        return bundle;
    }

    public ValidationException getDetails() {
        return details;
    }

    @Override
    public String toString() {
        return "BundleIssue{" +
                "bundle=" + bundle +
                ", details=" + details +
                '}';
    }
}
