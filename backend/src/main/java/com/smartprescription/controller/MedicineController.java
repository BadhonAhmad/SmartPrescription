package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.entity.Medicine;
import com.smartprescription.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Medicine Controller
 * 
 * REST endpoints for medicine management:
 * GET    /medicines - Get all medicines
 * GET    /medicines/{id} - Get medicine by ID
 * POST   /medicines - Create new medicine
 * PUT    /medicines/{id} - Update medicine
 * DELETE /medicines/{id} - Delete medicine
 * GET    /medicines/search?q=xyz - Search medicines
 * GET    /medicines/top - Get frequently used medicines
 */
@RestController
@RequestMapping("/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Medicine>>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();
        return ResponseEntity.ok(ApiResponse.success(medicines));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Medicine>> getMedicineById(@PathVariable Long id) {
        try {
            Medicine medicine = medicineService.getMedicineById(id);
            return ResponseEntity.ok(ApiResponse.success(medicine));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Medicine not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Medicine>> createMedicine(@RequestBody Medicine medicine) {
        Medicine newMedicine = medicineService.createMedicine(medicine);
        return ResponseEntity.ok(ApiResponse.success("Medicine created successfully", newMedicine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Medicine>> updateMedicine(
            @PathVariable Long id, 
            @RequestBody Medicine medicine) {
        try {
            Medicine updatedMedicine = medicineService.updateMedicine(id, medicine);
            return ResponseEntity.ok(ApiResponse.success("Medicine updated successfully", updatedMedicine));
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
    public ResponseEntity<ApiResponse<List<Medicine>>> searchMedicines(@RequestParam String q) {
        List<Medicine> medicines = medicineService.searchMedicines(q);
        return ResponseEntity.ok(ApiResponse.success(medicines));
    }

    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<Medicine>>> getTopMedicines() {
        List<Medicine> medicines = medicineService.getTopMedicines();
        return ResponseEntity.ok(ApiResponse.success(medicines));
    }

    @PostMapping("/{id}/increment")
    public ResponseEntity<ApiResponse<String>> incrementOccurrence(@PathVariable Long id) {
        try {
            medicineService.incrementOccurrence(id);
            return ResponseEntity.ok(ApiResponse.success("Occurrence incremented", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed: " + e.getMessage()));
        }
    }
}
