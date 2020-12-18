package com.citrix.microapps.bundlegen.bundles;

import lombok.Getter;

import static com.citrix.microapps.bundlegen.bundles.IssueSeverity.ERROR;

/**
 * Bundle catalog doesn't match expected structure or is somehow broken.
 */
@Getter
public class ValidationException extends RuntimeException {

    private IssueSeverity issueSeverity;

    public ValidationException(String message, IssueSeverity severity) {
        super(message);
        this.issueSeverity = severity;
    }

    public ValidationException(String message) {
        super(message);
        this.issueSeverity = ERROR;
    }

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
        this.issueSeverity = ERROR;
    }
}
