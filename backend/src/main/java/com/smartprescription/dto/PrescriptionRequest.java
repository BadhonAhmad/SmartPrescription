package com.smartprescription.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

/**
 * DTO for creating/updating prescriptions with validation
 */
@Data
public class PrescriptionRequest {
    
    @NotNull(message = "Prescription date is required")
    private LocalDate prescriptionDate;
    
    @NotBlank(message = "Patient name is required")
    private String patientName;
    
    @NotNull(message = "Patient age is required")
    @Min(value = 0, message = "Age must be at least 0")
    @Max(value = 150, message = "Age must be at most 150")
    private Integer patientAge;
    
    @NotBlank(message = "Gender is required")
    private String patientGender;
    
    private String diagnosis;
    
    private String medicines;
    
    private LocalDate nextVisitDate;
    
    // Additional fields for complete prescription
    private String chiefComplaint;
    private String history;
    private String onExamination;
    private String investigation;
    private String treatmentPlan;
    private String advice;
    private String followUp;
    private String specialNotes;
}
