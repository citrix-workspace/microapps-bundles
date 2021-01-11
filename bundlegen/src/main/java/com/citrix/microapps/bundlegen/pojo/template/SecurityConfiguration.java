package com.citrix.microapps.bundlegen.pojo.template;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SecurityConfiguration {
    private final String type;

    @JsonCreator
    public SecurityConfiguration(@JsonProperty(value = "type") String type) {
        this.type = type;
    }
}
