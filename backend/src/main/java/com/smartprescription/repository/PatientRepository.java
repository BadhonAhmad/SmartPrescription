package com.smartprescription.repository;

import com.smartprescription.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Patient Repository
 * 
 * Provides database operations for Patient entity.
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByNameContainingIgnoreCase(String name);
    List<Patient> findByPhoneContaining(String phone);
}
