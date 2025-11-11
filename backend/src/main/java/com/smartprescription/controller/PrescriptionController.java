package com.smartprescription.controller;

import com.smartprescription.application.port.input.PrescriptionUseCase;
import com.smartprescription.domain.model.Prescription;
import com.smartprescription.dto.ApiResponse;
import com.smartprescription.infrastructure.web.dto.PrescriptionResponseDto;
import com.smartprescription.infrastructure.web.mapper.PrescriptionWebMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Prescription Controller (Clean Architecture - Infrastructure Web Layer)
 * 
 * REST API adapter that depends on use case interfaces.
 * This is part of the ADAPTER layer (infrastructure).
 * 
 * REST endpoints for prescription/patient visit management:
 * GET /prescriptions - Get all prescriptions
 * GET /prescriptions/{id} - Get prescription by ID
 * POST /prescriptions - Create new prescription
 * PUT /prescriptions/{id} - Update prescription
 * DELETE /prescriptions/{id} - Delete prescription
 * GET /prescriptions/patient/{patientId} - Get patient history
 */
@RestController
@RequestMapping("/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionUseCase prescriptionUseCase;
    private final PrescriptionWebMapper mapper;

    public PrescriptionController(PrescriptionUseCase prescriptionUseCase,
            PrescriptionWebMapper mapper) {
        this.prescriptionUseCase = prescriptionUseCase;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PrescriptionResponseDto>>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionUseCase.getAllPrescriptions();
        List<PrescriptionResponseDto> dtos = prescriptions.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PrescriptionResponseDto>> getPrescriptionById(@PathVariable Long id) {
        try {
            Prescription prescription = prescriptionUseCase.getPrescriptionById(id);
            PrescriptionResponseDto dto = mapper.toDto(prescription);
            return ResponseEntity.ok(ApiResponse.success(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Prescription not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PrescriptionResponseDto>> createPrescription(
            @RequestBody PrescriptionResponseDto requestDto) {
        Prescription prescription = mapper.toDomain(requestDto);
        Prescription created = prescriptionUseCase.createPrescription(prescription);
        PrescriptionResponseDto responseDto = mapper.toDto(created);
        return ResponseEntity.ok(ApiResponse.success("Prescription created successfully", responseDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PrescriptionResponseDto>> updatePrescription(
            @PathVariable Long id,
            @RequestBody PrescriptionResponseDto requestDto) {
        try {
            Prescription prescription = mapper.toDomain(requestDto);
            Prescription updated = prescriptionUseCase.updatePrescription(id, prescription);
            PrescriptionResponseDto responseDto = mapper.toDto(updated);
            return ResponseEntity.ok(ApiResponse.success("Prescription updated successfully", responseDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Update failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePrescription(@PathVariable Long id) {
        try {
            prescriptionUseCase.deletePrescription(id);
            return ResponseEntity.ok(ApiResponse.success("Prescription deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<List<PrescriptionResponseDto>>> getPatientHistory(
            @PathVariable Long patientId) {
        List<Prescription> history = prescriptionUseCase.getPrescriptionsByPatientId(patientId);
        List<PrescriptionResponseDto> dtos = history.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PrescriptionResponseDto>>> searchByPatientName(
            @RequestParam String name) {
        List<Prescription> prescriptions = prescriptionUseCase.getPrescriptionsByPatientName(name);
        List<PrescriptionResponseDto> dtos = prescriptions.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}
