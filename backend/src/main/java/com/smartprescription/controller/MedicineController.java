package com.smartprescription.controller;

import com.smartprescription.service.MedicineService;
import com.smartprescription.entity.Medicine;
import com.smartprescription.dto.ApiResponse;
import com.smartprescription.dto.MedicineResponseDto;
import com.smartprescription.dto.MedicineMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Medicine Controller (Layered Architecture)
 * 
 * REST endpoints for medicine management:
 * GET /medicines - Get all medicines
 * GET /medicines/{id} - Get medicine by ID
 * POST /medicines - Create new medicine
 * PUT /medicines/{id} - Update medicine
 * DELETE /medicines/{id} - Delete medicine
 * GET /medicines/search?q=xyz - Search medicines
 */
@RestController
@RequestMapping("/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    private final MedicineService medicineService;
    private final MedicineMapper mapper;

    public MedicineController(MedicineService medicineService, MedicineMapper mapper) {
        this.medicineService = medicineService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicineResponseDto>>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();
        List<MedicineResponseDto> dtos = medicines.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineResponseDto>> getMedicineById(@PathVariable Long id) {
        try {
            Medicine medicine = medicineService.getMedicineById(id);
            MedicineResponseDto dto = mapper.toDto(medicine);
            return ResponseEntity.ok(ApiResponse.success(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Medicine not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MedicineResponseDto>> createMedicine(
            @RequestBody MedicineResponseDto requestDto) {
        Medicine medicine = mapper.toEntity(requestDto);
        Medicine created = medicineService.createMedicine(medicine);
        MedicineResponseDto responseDto = mapper.toDto(created);
        return ResponseEntity.ok(ApiResponse.success("Medicine created successfully", responseDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineResponseDto>> updateMedicine(
            @PathVariable Long id,
            @RequestBody MedicineResponseDto requestDto) {
        try {
            Medicine medicine = mapper.toEntity(requestDto);
            Medicine updated = medicineService.updateMedicine(id, medicine);
            MedicineResponseDto responseDto = mapper.toDto(updated);
            return ResponseEntity.ok(ApiResponse.success("Medicine updated successfully", responseDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Update failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteMedicine(@PathVariable Long id) {
        try {
            medicineService.deleteMedicine(id);
            return ResponseEntity.ok(ApiResponse.success("Medicine deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<MedicineResponseDto>>> searchMedicines(@RequestParam String q) {
        List<Medicine> medicines = medicineService.searchMedicines(q);
        List<MedicineResponseDto> dtos = medicines.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}
