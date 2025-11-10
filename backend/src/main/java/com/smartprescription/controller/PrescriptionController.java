package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.entity.PatientVisit;
import com.smartprescription.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Prescription Controller
 * 
 * REST endpoints for prescription/patient visit management:
 * GET    /prescriptions - Get all prescriptions
 * GET    /prescriptions/{id} - Get prescription by ID
 * POST   /prescriptions - Create new prescription
 * PUT    /prescriptions/{id} - Update prescription
 * DELETE /prescriptions/{id} - Delete prescription
 * GET    /prescriptions/patient/{patientId} - Get patient history
 */
@RestController
@RequestMapping("/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PatientVisit>>> getAllPrescriptions() {
        List<PatientVisit> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseEntity.ok(ApiResponse.success(prescriptions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientVisit>> getPrescriptionById(@PathVariable Long id) {
        try {
            PatientVisit prescription = prescriptionService.getPrescriptionById(id);
            return ResponseEntity.ok(ApiResponse.success(prescription));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Prescription not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PatientVisit>> createPrescription(
            @RequestBody PatientVisit patientVisit) {
        PatientVisit newPrescription = prescriptionService.createPrescription(patientVisit);
        return ResponseEntity.ok(ApiResponse.success("Prescription created successfully", newPrescription));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientVisit>> updatePrescription(
            @PathVariable Long id, 
            @RequestBody PatientVisit patientVisit) {
        try {
            PatientVisit updated = prescriptionService.updatePrescription(id, patientVisit);
            return ResponseEntity.ok(ApiResponse.success("Prescription updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Update failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePrescription(@PathVariable Long id) {
        try {
            prescriptionService.deletePrescription(id);
            return ResponseEntity.ok(ApiResponse.success("Prescription deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<PatientVisit>>> getPatientHistory(
            @PathVariable Long patientId) {
        List<PatientVisit> history = prescriptionService.getPatientHistory(patientId);
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PatientVisit>>> searchByPatientName(
            @RequestParam String name) {
        List<PatientVisit> prescriptions = prescriptionService.searchByPatientName(name);
        return ResponseEntity.ok(ApiResponse.success(prescriptions));
    }
}
