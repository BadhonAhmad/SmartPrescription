package com.smartprescription.domain.repository;

import com.smartprescription.domain.model.Patient;
import java.util.List;
import java.util.Optional;

/**
 * Patient Repository Port (Clean Architecture - Domain Layer)
 * 
 * Interface defining operations for Patient persistence.
 * This is a PORT - implementation will be in infrastructure layer.
 */
public interface PatientRepository {

    Patient save(Patient patient);

    Optional<Patient> findById(Long id);

    List<Patient> findAll();

    Optional<Patient> findByName(String name);

    void deleteById(Long id);

    boolean existsById(Long id);
}
