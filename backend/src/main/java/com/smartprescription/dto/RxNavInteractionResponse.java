package com.smartprescription.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

/**
 * DTO for RXNAV Drug Interaction Response
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RxNavInteractionResponse {
    private String nlmDisclaimer;
    private List<InteractionTypeGroup> interactionTypeGroup;
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class InteractionTypeGroup {
        private String sourceDisclaimer;
        private String sourceName;
        private List<InteractionType> interactionType;
    }
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class InteractionType {
        private String comment;
        private String minConceptItem;
        private List<InteractionPair> interactionPair;
    }
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class InteractionPair {
        private String severity;
        private String description;
        private List<InteractionConcept> interactionConcept;
    }
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class InteractionConcept {
        private MinConceptItem minConceptItem;
        private SourceConceptItem sourceConceptItem;
    }
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class MinConceptItem {
        private String rxcui;
        private String name;
        private String tty;
    }
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SourceConceptItem {
        private String id;
        private String name;
        private String url;
    }
}
