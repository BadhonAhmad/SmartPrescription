package com.smartprescription.domain.repository;

import com.smartprescription.domain.model.Medicine;
import java.util.List;
import java.util.Optional;

/**
 * Medicine Repository Port (Clean Architecture - Domain Layer)
 * 
 * Interface defining operations for Medicine persistence.
 * This is a PORT - implementation will be in infrastructure layer.
 */
public interface MedicineRepository {

    Medicine save(Medicine medicine);

    Optional<Medicine> findById(Long id);

    List<Medicine> findAll();

    List<Medicine> findByGenericName(String genericName);

    List<Medicine> findByBrandName(String brandName);

    List<Medicine> searchByName(String keyword);

    void deleteById(Long id);

    boolean existsById(Long id);
}
