package com.citrix.microapps.bundlegen.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Tag {
    private final String tag;
    private final String value;

    @JsonCreator
    public Tag(
            @JsonProperty(value = "tag", required = true) String tag,
            @JsonProperty(value = "value", required = true) String value
    ) {
        this.tag = tag;
        this.value = value;
    }

    public String getTag() {
        return tag;
    }

    public String getValue() {
        return value;
    }
}
