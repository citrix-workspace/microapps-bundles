package com.citrix.microapps.bundlegen.bundles;

import java.util.Collections;
import java.util.List;

import com.citrix.microapps.bundlegen.pojo.Metadata;

import static java.util.Objects.hash;
import static java.util.stream.Collectors.toList;

/**
 * Bundle with all information from filesystem and metadata file.
 */
public class Bundle {
    private final FsBundle fs;
    private final Metadata metadata;
    private final List<ValidationException> issues;

    public Bundle(FsBundle fs, Metadata metadata, List<ValidationException> issues) {
        this.fs = fs;
        this.metadata = metadata;
        this.issues = issues;
    }

    public FsBundle getFs() {
        return fs;
    }

    public Metadata getMetadata() {
        if (metadata == null) {
            throw new IllegalStateException(String.format("Bundle: '%s' contains no metadata, " +
                            "validations should have prevented this", this));
        }
        
        return metadata;
    }

    public List<BundleIssue> getIssues() {
        if (issues.isEmpty()) {
            return Collections.emptyList();
        } else {
            return issues.stream()
                    .map(e -> new BundleIssue(fs, e, e.getIssueSeverity()))
                    .collect(toList());
        }
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (obj == this) {
            return true;
        }
        if (obj.getClass() != getClass()) {
            return false;
        }
        
        Bundle other = (Bundle) obj;
        
        return metadata != null 
                && other.metadata != null 
                && metadata.getVendor().equals(other.metadata.getVendor())
                && metadata.getId().equals(other.metadata.getId());
    }
    
    @Override
    public int hashCode() {
        if (metadata != null) {
            return hash(metadata.getVendor(), metadata.getId());
        } else {
            return super.hashCode();
        }
    }

    @Override
    public String toString() {
        return fs.toString();
    }
}
