package com.citrix.microapps.bundlegen.bundles;

import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.citrix.microapps.bundlegen.pojo.Type;

/**
 * One HTTP bundle located in filesystem.
 * <p>
 * The structure of directories is `.../vendor/bundle ID/...`.
 */
public class FsHttpBundle implements FsBundle {
    private final Path path;
    private final List<Path> files;

    public FsHttpBundle(Path path, List<Path> files) {
        this.path = path;
        this.files = Collections.unmodifiableList(files);
    }

    @Override
    public Type getType() {
        return Type.HTTP;
    }

    @Override
    public Path getPath() {
        return path;
    }

    @Override
    public List<Path> getFiles() {
        return files;
    }

    @Override
    public String getVendor() {
        return path.getParent().getFileName().toString();
    }

    @Override
    public String getId() {
        return path.getFileName().toString();
    }

    @Override
    public Optional<String> getVersion() {
        return Optional.empty();
    }

    @Override
    public String getArchiveName() {
        return getVendor() + "_" + getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FsHttpBundle that = (FsHttpBundle) o;

        if (!path.equals(that.path)) return false;
        return files.equals(that.files);
    }

    @Override
    public int hashCode() {
        int result = path.hashCode();
        result = 31 * result + files.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return path.toString();
    }
}
