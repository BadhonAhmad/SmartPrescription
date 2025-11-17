package com.smartprescription.repository;

import com.smartprescription.entity.PatientJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Patient Repository
 * 
 * Provides database operations for Patient entity.
 */
@Repository
public interface PatientRepository extends JpaRepository<PatientJpaEntity, Long> {
    List<PatientJpaEntity> findByNameContainingIgnoreCase(String name);

    List<PatientJpaEntity> findByPhoneContaining(String phone);
}
