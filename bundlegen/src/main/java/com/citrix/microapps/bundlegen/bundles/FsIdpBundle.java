package com.citrix.microapps.bundlegen.bundles;

import java.nio.file.Path;
import java.util.List;

import com.citrix.microapps.bundlegen.pojo.Type;

public class FsIdpBundle extends FsHttpBundle {

    public FsIdpBundle(Path path, List<Path> files) {
        super(path, files);
    }

    @Override
    public Type getType() {
        return Type.IDENTITY_PROVIDER;
    }
}
