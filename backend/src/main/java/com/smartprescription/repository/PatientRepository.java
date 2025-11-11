package com.smartprescription.repository;

import com.smartprescription.infrastructure.persistence.entity.PatientJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Patient Repository (Legacy - for backward compatibility)
 * 
 * Provides database operations for Patient entity.
 * New code should use PatientRepositoryAdapter instead.
 */
@Repository
public interface PatientRepository extends JpaRepository<PatientJpaEntity, Long> {
    List<PatientJpaEntity> findByNameContainingIgnoreCase(String name);

    List<PatientJpaEntity> findByPhoneContaining(String phone);
}
