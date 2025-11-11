package com.smartprescription.domain.repository;

import com.smartprescription.domain.model.Prescription;
import java.util.List;
import java.util.Optional;

/**
 * Prescription Repository Port (Clean Architecture - Domain Layer)
 * 
 * Interface defining operations for Prescription persistence.
 * This is a PORT - implementation will be in infrastructure layer.
 */
public interface PrescriptionRepository {

    Prescription save(Prescription prescription);

    Optional<Prescription> findById(Long id);

    List<Prescription> findAll();

    List<Prescription> findByPatientId(Long patientId);

    List<Prescription> findByPatientName(String patientName);

    void deleteById(Long id);

    boolean existsById(Long id);
}
