package com.smartprescription.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.smartprescription.dto.DrugInteraction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class RxNavService {

    private static final Logger logger = LoggerFactory.getLogger(RxNavService.class);
    private final RestTemplate restTemplate;

    public RxNavService() {
        this.restTemplate = new RestTemplate();
    }

    public DrugInteraction getDrugInteractions(String drugName) {
        logger.info("Fetching drug interactions for: {}", drugName);

        try {
            String url = String.format(
                    "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"%s\" OR openfda.generic_name:\"%s\"&limit=1",
                    drugName, drugName);

            JsonNode response = restTemplate.getForObject(url, JsonNode.class);

            if (response == null || !response.has("results") || response.get("results").isEmpty()) {
                return createNoDataResponse(drugName, "No drug information found in FDA database");
            }

            JsonNode drugLabel = response.get("results").get(0);
            return extractInteractions(drugName, drugLabel);

        } catch (Exception e) {
            logger.error("Error: {}", e.getMessage());
            return createNoDataResponse(drugName, "Error: " + e.getMessage());
        }
    }

    private DrugInteraction extractInteractions(String searchTerm, JsonNode label) {
        List<DrugInteraction.Interaction> interactions = new ArrayList<>();
        String drugName = searchTerm;

        if (label.has("openfda") && label.get("openfda").has("generic_name")) {
            JsonNode genericName = label.get("openfda").get("generic_name");
            if (genericName.isArray() && genericName.size() > 0) {
                drugName = genericName.get(0).asText();
            }
        }

        if (label.has("ask_doctor_or_pharmacist")) {
            JsonNode askDoctor = label.get("ask_doctor_or_pharmacist");
            if (askDoctor.isArray()) {
                for (JsonNode node : askDoctor) {
                    String text = node.asText();
                    if (text.toLowerCase().contains("drug") || text.toLowerCase().contains("medication")) {
                        interactions.add(new DrugInteraction.Interaction(
                                "Drug Interactions",
                                "Moderate",
                                text,
                                "FDA Drug Label"));
                    }
                }
            }
        }

        if (interactions.isEmpty()) {
            interactions.add(new DrugInteraction.Interaction(
                    "No specific interactions found",
                    "Info",
                    "No specific drug interactions were found for " + drugName
                            + ". Consult with a healthcare provider for more information.",
                    "FDA Drug Label"));
        }

        return new DrugInteraction(drugName, searchTerm, interactions, "Information provided by FDA.");
    }

    private DrugInteraction createNoDataResponse(String drugName, String message) {
        List<DrugInteraction.Interaction> interactions = new ArrayList<>();
        interactions.add(new DrugInteraction.Interaction("No Data", "Info", message, "OpenFDA"));
        return new DrugInteraction(drugName, drugName, interactions, "Information provided by FDA.");
    }
}
