package com.citrix.microapps.bundlegen.bundles;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.citrix.microapps.bundlegen.pojo.Metadata;

/**
 * Bundle with all information from filesystem and metadata file.
 */
@SuppressWarnings("OptionalUsedAsFieldOrParameterType")
public class Bundle {
    private final FsBundle fs;
    private final Optional<Metadata> metadata;
    private final List<ValidationException> issues;

    public Bundle(FsBundle fs, Optional<Metadata> metadata, List<ValidationException> issues) {
        this.fs = fs;
        this.metadata = metadata;
        this.issues = issues;
    }

    public FsBundle getFs() {
        return fs;
    }

    public Metadata getMetadata() {
        return metadata
                .orElseThrow(() -> new UnsupportedOperationException("No metadata, validations should prevent this"));
    }

    public List<BundleIssue> getIssues() {
        if (issues.isEmpty()) {
            return Collections.emptyList();
        } else {
            return issues.stream()
                    .map(e -> new BundleIssue(fs, e))
                    .collect(Collectors.toList());
        }
    }

    @Override
    public String toString() {
        return fs.toString();
    }
}
