package com.smartprescription.infrastructure.persistence.repository;

import com.smartprescription.infrastructure.persistence.entity.PrescriptionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Prescription JPA Repository (Clean Architecture - Infrastructure Layer)
 * 
 * Spring Data JPA repository for PrescriptionJpaEntity.
 * This is the actual database access layer.
 */
@Repository
public interface PrescriptionJpaRepository extends JpaRepository<PrescriptionJpaEntity, Long> {

    List<PrescriptionJpaEntity> findByIdOrderByVisitDesc(Long patientId);

    List<PrescriptionJpaEntity> findByNameOrderByVisitDesc(String patientName);
}
