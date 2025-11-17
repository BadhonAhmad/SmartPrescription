package com.smartprescription.controller;

import com.smartprescription.service.PatientService;
import com.smartprescription.dto.ApiResponse;
import com.smartprescription.dto.PatientResponseDto;
import com.smartprescription.dto.PatientMapper;
import com.smartprescription.entity.PatientJpaEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Patient Controller (Layered Architecture)
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

    private final PatientService patientService;
    private final PatientMapper mapper;

    public PatientController(PatientService patientService, PatientMapper mapper) {
        this.patientService = patientService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PatientResponseDto>>> getAllPatients() {
        List<PatientJpaEntity> patients = patientService.getAllPatients();
        List<PatientResponseDto> dtos = patients.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponseDto>> getPatientById(@PathVariable Long id) {
        try {
            PatientJpaEntity patient = patientService.getPatientById(id);
            PatientResponseDto dto = mapper.toDto(patient);
            return ResponseEntity.ok(ApiResponse.success(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Patient not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PatientResponseDto>> createPatient(@RequestBody PatientResponseDto requestDto) {
        PatientJpaEntity patient = mapper.toEntity(requestDto);
        PatientJpaEntity created = patientService.createPatient(patient);
        PatientResponseDto responseDto = mapper.toDto(created);
        return ResponseEntity.ok(ApiResponse.success("Patient created successfully", responseDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientResponseDto>> updatePatient(
            @PathVariable Long id,
            @RequestBody PatientResponseDto requestDto) {
        try {
            PatientJpaEntity patient = mapper.toEntity(requestDto);
            PatientJpaEntity updated = patientService.updatePatient(id, patient);
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
            patientService.deletePatient(id);
            return ResponseEntity.ok(ApiResponse.success("Patient deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PatientResponseDto>>> searchPatientByName(@RequestParam String name) {
        try {
            List<PatientJpaEntity> patients = patientService.searchPatientsByName(name);
            List<PatientResponseDto> dtos = patients.stream()
                    .map(mapper::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.success(dtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Search failed: " + e.getMessage()));
        }
    }
}
