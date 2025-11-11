package com.smartprescription.application.usecase;

import com.smartprescription.application.port.input.MedicineUseCase;
import com.smartprescription.domain.model.Medicine;
import com.smartprescription.domain.repository.MedicineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Medicine Use Case Implementation (Clean Architecture - Application Layer)
 * 
 * Contains business logic for medicine operations.
 * Depends only on domain interfaces (ports).
 */
@Service
@Transactional
public class MedicineUseCaseImpl implements MedicineUseCase {

    private final MedicineRepository medicineRepository;

    public MedicineUseCaseImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public Medicine createMedicine(Medicine medicine) {
        // Business logic: validate medicine data
        if (medicine.getBrandName() == null || medicine.getBrandName().trim().isEmpty()) {
            throw new RuntimeException("Medicine brand name is required");
        }

        // Initialize occurrence counter
        if (medicine.getOccurrence() == null) {
            medicine.setOccurrence(0);
        }

        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine updateMedicine(Long id, Medicine medicine) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
        }
        medicine.setId(id);
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public List<Medicine> searchMedicines(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return medicineRepository.findAll();
        }
        return medicineRepository.searchByName(keyword);
    }

    @Override
    public void deleteMedicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
        }
        medicineRepository.deleteById(id);
    }
}
