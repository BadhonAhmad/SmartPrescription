package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.dto.PrescriptionRequest;
import com.smartprescription.entity.PatientVisit;
import com.smartprescription.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API v1 Controller for Prescription Management
 * Implements all assignment requirements
 */
@RestController
@RequestMapping("/API/v1")
@CrossOrigin(origins = "*")
public class ApiV1PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    /**
     * GET /API/v1/prescription - Get all prescriptions as JSON
     */
    @GetMapping("/prescription")
    public ResponseEntity<List<PatientVisit>> getAllPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    /**
     * POST /API/v1/prescription - Create new prescription
     */
    @PostMapping("/prescription")
    public ResponseEntity<ApiResponse<PatientVisit>> createPrescription(
            @Valid @RequestBody PrescriptionRequest request) {
        
        PatientVisit pv = new PatientVisit();
        pv.setVisit(request.getPrescriptionDate());
        pv.setName(request.getPatientName());
        pv.setPatientAge(request.getPatientAge());
        pv.setGender(request.getPatientGender());
        pv.setDiagnosis(request.getDiagnosis());
        pv.setMedicine(request.getMedicines());
        pv.setNextVisit(request.getNextVisitDate());
        pv.setComplaint(request.getChiefComplaint());
        pv.setHistory(request.getHistory());
        pv.setOnExamination(request.getOnExamination());
        pv.setInvestigation(request.getInvestigation());
        pv.setTreatmentPlan(request.getTreatmentPlan());
        pv.setAdvice(request.getAdvice());
        pv.setFollowUp(request.getFollowUp());
        pv.setNotes(request.getSpecialNotes());
        pv.setId(0L); // Default patient ID
        
        PatientVisit saved = prescriptionService.createPrescription(pv);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Prescription created successfully", saved));
    }

    /**
     * PUT /API/v1/prescription/{id} - Update prescription
     */
    @PutMapping("/prescription/{id}")
    public ResponseEntity<ApiResponse<PatientVisit>> updatePrescription(
            @PathVariable Long id,
            @Valid @RequestBody PrescriptionRequest request) {
        
        PatientVisit pv = prescriptionService.getPrescriptionById(id);
        pv.setVisit(request.getPrescriptionDate());
        pv.setName(request.getPatientName());
        pv.setPatientAge(request.getPatientAge());
        pv.setGender(request.getPatientGender());
        pv.setDiagnosis(request.getDiagnosis());
        pv.setMedicine(request.getMedicines());
        pv.setNextVisit(request.getNextVisitDate());
        pv.setComplaint(request.getChiefComplaint());
        pv.setHistory(request.getHistory());
        pv.setOnExamination(request.getOnExamination());
        pv.setInvestigation(request.getInvestigation());
        pv.setTreatmentPlan(request.getTreatmentPlan());
        pv.setAdvice(request.getAdvice());
        pv.setFollowUp(request.getFollowUp());
        pv.setNotes(request.getSpecialNotes());
        
        PatientVisit updated = prescriptionService.updatePrescription(id, pv);
        return ResponseEntity.ok(ApiResponse.success("Prescription updated successfully", updated));
    }

    /**
     * DELETE /API/v1/prescription/{id} - Delete prescription
     */
    @DeleteMapping("/prescription/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.ok(ApiResponse.success("Prescription deleted successfully", null));
    }

    /**
     * GET /API/v1/prescription/report/daywise - Day-wise prescription count
     */
    @GetMapping("/prescription/report/daywise")
    public ResponseEntity<List<Object[]>> getDayWiseReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(prescriptionService.getDayWiseReport(start, end));
    }

    /**
     * Exception handler for validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
