package com.smartprescription.controller;

import com.smartprescription.application.port.input.PatientUseCase;
import com.smartprescription.domain.model.Patient;
import com.smartprescription.dto.ApiResponse;
import com.smartprescription.infrastructure.web.dto.PatientResponseDto;
import com.smartprescription.infrastructure.web.mapper.PatientWebMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Patient Controller (Clean Architecture - Infrastructure Web Layer)
 * 
 * REST API adapter that depends on use case interfaces.
 * 
 * REST endpoints for patient management:
 * GET /patients - Get all patients
 * GET /patients/{id} - Get patient by ID
 * POST /patients - Create new patient
 * PUT /patients/{id} - Update patient
 * DELETE /patients/{id} - Delete patient
 * GET /patients/search?name=xyz - Search by name
 */
@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientUseCase patientUseCase;
    private final PatientWebMapper mapper;

    public PatientController(PatientUseCase patientUseCase, PatientWebMapper mapper) {
        this.patientUseCase = patientUseCase;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PatientResponseDto>>> getAllPatients() {
        List<Patient> patients = patientUseCase.getAllPatients();
        List<PatientResponseDto> dtos = patients.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponseDto>> getPatientById(@PathVariable Long id) {
        try {
            Patient patient = patientUseCase.getPatientById(id);
            PatientResponseDto dto = mapper.toDto(patient);
            return ResponseEntity.ok(ApiResponse.success(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Patient not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PatientResponseDto>> createPatient(@RequestBody PatientResponseDto requestDto) {
        Patient patient = mapper.toDomain(requestDto);
        Patient created = patientUseCase.createPatient(patient);
        PatientResponseDto responseDto = mapper.toDto(created);
        return ResponseEntity.ok(ApiResponse.success("Patient created successfully", responseDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponseDto>> updatePatient(
            @PathVariable Long id,
            @RequestBody PatientResponseDto requestDto) {
        try {
            Patient patient = mapper.toDomain(requestDto);
            Patient updated = patientUseCase.updatePatient(id, patient);
            PatientResponseDto responseDto = mapper.toDto(updated);
            return ResponseEntity.ok(ApiResponse.success("Patient updated successfully", responseDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Update failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePatient(@PathVariable Long id) {
        try {
            patientUseCase.deletePatient(id);
            return ResponseEntity.ok(ApiResponse.success("Patient deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PatientResponseDto>> searchPatientByName(@RequestParam String name) {
        try {
            Patient patient = patientUseCase.getPatientByName(name);
            PatientResponseDto dto = mapper.toDto(patient);
            return ResponseEntity.ok(ApiResponse.success(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Patient not found: " + e.getMessage()));
        }
    }
}
