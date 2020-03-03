package com.citrix.microapps.bundlegen.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TemplateFile {

    private final String translationChecksum;

    @JsonCreator
    public TemplateFile(
            @JsonProperty(value = "translationChecksum", required = true) String translationChecksum) {
        this.translationChecksum = translationChecksum;
    }

    public String getTranslationChecksum() {
        return translationChecksum;
    }

}