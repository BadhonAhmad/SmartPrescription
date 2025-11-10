package com.smartprescription.service;

import com.smartprescription.entity.Medicine;
import com.smartprescription.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Medicine Service
 * 
 * Business logic for medicine management:
 * - CRUD operations for medicines
 * - Search medicines by name
 * - Get frequently used medicines
 * - Update occurrence count for suggestions
 */
@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    public Medicine createMedicine(Medicine medicine) {
        medicine.setOccurrence(0);
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine medicineDetails) {
        Medicine medicine = getMedicineById(id);
        
        medicine.setManufacturerName(medicineDetails.getManufacturerName());
        medicine.setBrandName(medicineDetails.getBrandName());
        medicine.setGenericName(medicineDetails.getGenericName());
        medicine.setStrength(medicineDetails.getStrength());
        medicine.setMedicineType(medicineDetails.getMedicineType());
        medicine.setDosageDescription(medicineDetails.getDosageDescription());
        
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        Medicine medicine = getMedicineById(id);
        medicineRepository.delete(medicine);
    }

    public List<Medicine> searchMedicines(String query) {
        return medicineRepository.findByBrandNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(
            query, query);
    }

    public List<Medicine> getTopMedicines() {
        return medicineRepository.findTop10ByOrderByOccurrenceDesc();
    }

    public void incrementOccurrence(Long id) {
        Medicine medicine = getMedicineById(id);
        medicine.setOccurrence(medicine.getOccurrence() + 1);
        medicineRepository.save(medicine);
    }
}
