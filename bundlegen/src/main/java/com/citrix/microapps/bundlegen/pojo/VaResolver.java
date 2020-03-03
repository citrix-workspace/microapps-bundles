package com.citrix.microapps.bundlegen.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class VaResolver {
    private final String name;
    private final String intentName;

    @JsonCreator
    public VaResolver(
            @JsonProperty(value = "name", required = true) String name,
            @JsonProperty(value = "intentName", required = true) String intentName
    ) {
        this.name = name;
        this.intentName = intentName;
    }

    public String getName() {
        return name;
    }

    public String getIntentName() {
        return intentName;
    }
}
