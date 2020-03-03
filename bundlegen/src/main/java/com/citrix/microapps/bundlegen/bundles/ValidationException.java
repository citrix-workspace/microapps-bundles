package com.citrix.microapps.bundlegen.bundles;

/**
 * Bundle catalog doesn't match expected structure or is somehow broken.
 */
public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
