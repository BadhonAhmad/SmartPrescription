package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.entity.Patient;
import com.smartprescription.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Patient Controller
 * 
 * REST endpoints for patient management:
 * GET    /patients - Get all patients
 * GET    /patients/{id} - Get patient by ID
 * POST   /patients - Create new patient
 * PUT    /patients/{id} - Update patient
 * DELETE /patients/{id} - Delete patient
 * GET    /patients/search?name=xyz - Search by name
 * GET    /patients/search?phone=123 - Search by phone
 */
@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Patient>>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(ApiResponse.success(patients));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Patient>> getPatientById(@PathVariable Long id) {
        try {
            Patient patient = patientService.getPatientById(id);
            return ResponseEntity.ok(ApiResponse.success(patient));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Patient not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Patient>> createPatient(@RequestBody Patient patient) {
        Patient newPatient = patientService.createPatient(patient);
        return ResponseEntity.ok(ApiResponse.success("Patient created successfully", newPatient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Patient>> updatePatient(
            @PathVariable Long id, 
            @RequestBody Patient patient) {
        try {
            Patient updatedPatient = patientService.updatePatient(id, patient);
            return ResponseEntity.ok(ApiResponse.success("Patient updated successfully", updatedPatient));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Update failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePatient(@PathVariable Long id) {
        try {
            patientService.deletePatient(id);
            return ResponseEntity.ok(ApiResponse.success("Patient deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Patient>>> searchPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone) {
        
        if (name != null) {
            List<Patient> patients = patientService.searchPatientsByName(name);
            return ResponseEntity.ok(ApiResponse.success(patients));
        } else if (phone != null) {
            List<Patient> patients = patientService.searchPatientsByPhone(phone);
            return ResponseEntity.ok(ApiResponse.success(patients));
        } else {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Please provide name or phone parameter"));
        }
    }
}
