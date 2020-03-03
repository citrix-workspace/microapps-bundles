package com.citrix.microapps.bundlegen.pojo;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class App {
    private final UUID uuid;
    private final String title;
    private final boolean action;
    private final int numberOfEvents;

    @JsonCreator
    public App(
            @JsonProperty(value = "uuid", required = true) UUID uuid,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "action") boolean action,
            @JsonProperty(value = "numberOfEvents") int numberOfEvents
    ) {
        this.uuid = uuid;
        this.title = title;
        this.action = action;
        this.numberOfEvents = numberOfEvents;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getTitle() {
        return title;
    }

    public boolean isAction() {
        return action;
    }

    public int getNumberOfEvents() {
        return numberOfEvents;
    }
}
