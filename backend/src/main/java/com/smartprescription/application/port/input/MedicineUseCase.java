package com.smartprescription.application.port.input;

import com.smartprescription.domain.model.Medicine;
import java.util.List;

/**
 * Medicine Use Case Port (Clean Architecture - Application Layer)
 * 
 * Defines input port (interface) for medicine operations.
 * Controllers will depend on this interface.
 */
public interface MedicineUseCase {

    Medicine createMedicine(Medicine medicine);

    Medicine updateMedicine(Long id, Medicine medicine);

    Medicine getMedicineById(Long id);

    List<Medicine> getAllMedicines();

    List<Medicine> searchMedicines(String keyword);

    void deleteMedicine(Long id);
}
