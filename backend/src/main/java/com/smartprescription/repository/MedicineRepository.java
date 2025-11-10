package com.smartprescription.repository;

import com.smartprescription.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Medicine Repository
 * 
 * Provides database operations for Medicine entity.
 */
@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByBrandNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(
        String brandName, String genericName);
    List<Medicine> findTop10ByOrderByOccurrenceDesc();
}
