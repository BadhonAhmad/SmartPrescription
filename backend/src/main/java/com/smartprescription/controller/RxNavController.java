package com.smartprescription.controller;

import com.smartprescription.dto.DrugInteraction;
import com.smartprescription.service.RxNavService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Drug Interaction functionality using OpenFDA API
 */
@RestController
@RequestMapping("/API/v1/rxnav")
@Tag(name = "Drug Interactions", description = "Endpoints for checking drug interactions using FDA Drug Database")
@SecurityRequirement(name = "Bearer Authentication")
public class RxNavController {
    
    @Autowired
    private RxNavService rxNavService;
    
    /**
     * Get drug interactions by RXCUI or drug name
     */
    @GetMapping("/interactions/{rxcui}")
    @Operation(
        summary = "Get drug interactions by RXCUI or drug name",
        description = "Fetches drug interaction information from FDA Drug Database using RXCUI or drug name (e.g., 'warfarin', 'aspirin')"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved drug interactions",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = DrugInteraction.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input provided",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error fetching data from FDA API",
            content = @Content
        )
    })
    public ResponseEntity<DrugInteraction> getDrugInteractions(
            @Parameter(description = "RXCUI or drug name (e.g., 'warfarin', 'aspirin', '341248')", example = "warfarin")
            @PathVariable String rxcui
    ) {
        DrugInteraction interactions = rxNavService.getDrugInteractions(rxcui);
        return ResponseEntity.ok(interactions);
    }
}
