package com.citrix.microapps.bundlegen.pojo.template;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Endpoint {

    @JsonCreator
    public Endpoint(@JsonProperty(value = "name") String name,
                    @JsonProperty(value = "paginationMethod") PaginationMethod paginationMethod,
                    @JsonProperty(value = "incrementalSyncQueryParameters")
                            List<IncrementalSyncQueryParameter> incrementalSyncQueryParameters,
                    @JsonProperty(value = "queryParameters") List<EndpointParameter> queryParameters,
                    @JsonProperty(value = "pathParameters") List<EndpointParameter> pathParameters,
                    @JsonProperty(value = "headerParameters") List<EndpointParameter> headerParameters,
                    @JsonProperty(value = "bodyParameters") List<EndpointParameter> bodyParameters) {
        this.name = name;
        this.paginationMethod = paginationMethod;
        this.incrementalSyncQueryParameters = incrementalSyncQueryParameters;
        this.queryParameters = queryParameters;
        this.pathParameters = pathParameters;
        this.headerParameters = headerParameters;
        this.bodyParameters = bodyParameters;
    }

    private final String name;
    private final PaginationMethod paginationMethod;
    private final List<IncrementalSyncQueryParameter> incrementalSyncQueryParameters;
    private final List<EndpointParameter> queryParameters;
    private final List<EndpointParameter> pathParameters;
    private final List<EndpointParameter> headerParameters;
    private final List<EndpointParameter> bodyParameters;
}
