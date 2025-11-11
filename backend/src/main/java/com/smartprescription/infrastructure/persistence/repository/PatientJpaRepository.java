package com.smartprescription.infrastructure.persistence.repository;

import com.smartprescription.infrastructure.persistence.entity.PatientJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Patient JPA Repository (Clean Architecture - Infrastructure Layer)
 * 
 * Spring Data JPA repository for PatientJpaEntity.
 * This is the actual database access layer.
 */
@Repository
public interface PatientJpaRepository extends JpaRepository<PatientJpaEntity, Long> {

    Optional<PatientJpaEntity> findByName(String name);
}
