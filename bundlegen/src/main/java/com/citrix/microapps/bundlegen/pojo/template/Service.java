package com.citrix.microapps.bundlegen.pojo.template;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Service {
    private final ServiceConfiguration configuration;

    @JsonCreator
    public Service(@JsonProperty(value = "configuration") ServiceConfiguration configuration) {
        this.configuration = configuration;
    }
}
