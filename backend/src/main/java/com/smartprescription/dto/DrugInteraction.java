package com.smartprescription.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Simplified DTO for Drug Interactions
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrugInteraction {
    private String drugName;
    private String rxcui;
    private List<Interaction> interactions;
    private String disclaimer;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Interaction {
        private String interactingDrug;
        private String severity;
        private String description;
        private String source;
    }
}
