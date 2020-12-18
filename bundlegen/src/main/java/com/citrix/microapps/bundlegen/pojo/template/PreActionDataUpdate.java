package com.citrix.microapps.bundlegen.pojo.template;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PreActionDataUpdate {

    @JsonCreator
    public PreActionDataUpdate() {
    }
}
