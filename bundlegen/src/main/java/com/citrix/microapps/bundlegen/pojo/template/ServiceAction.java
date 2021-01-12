package com.citrix.microapps.bundlegen.pojo.template;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ServiceAction {
    private final String name;
    private final List<PreActionDataUpdate> preActionDataUpdates;
    private final List<PostActionDataUpdate> postActionDataUpdates;

    @JsonCreator
    public ServiceAction(@JsonProperty(value = "name") String name,
                         @JsonProperty(value = "preActionDataUpdates") List<PreActionDataUpdate> preActionDataUpdates,
                         @JsonProperty(value = "postActionDataUpdates")
                                 List<PostActionDataUpdate> postActionDataUpdates) {
        this.name = name;
        this.preActionDataUpdates = preActionDataUpdates;
        this.postActionDataUpdates = postActionDataUpdates;
    }
}
