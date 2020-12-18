package com.citrix.microapps.bundlegen.pojo;

import java.util.List;

import com.citrix.microapps.bundlegen.pojo.template.Service;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TemplateFile {

    private final String translationChecksum;

    private final List<Service> services;

    @JsonCreator
    public TemplateFile(
            @JsonProperty(value = "services", required = true) List<Service> services,
            @JsonProperty(value = "translationChecksum", required = true) String translationChecksum) {
        this.services = services;
        this.translationChecksum = translationChecksum;
    }

}