package com.citrix.microapps.bundlegen;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class TestUtils {
    // Work directory for unit tests is repository root in IntelliJ Idea, but submodule root in Maven.
    public static final String PREFIX = Files.exists(Paths.get("bundlegen/pom.xml")) ? "bundlegen/" : "";

    public static Path path(String path) {
        return Paths.get(PREFIX, path);
    }
}
