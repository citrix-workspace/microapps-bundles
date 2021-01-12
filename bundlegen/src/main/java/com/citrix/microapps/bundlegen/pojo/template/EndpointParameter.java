package com.citrix.microapps.bundlegen.pojo.template;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class EndpointParameter {
    private final String name;

    @JsonCreator
    public EndpointParameter(@JsonProperty(value = "name") String name) {
        this.name = name;
    }
}
