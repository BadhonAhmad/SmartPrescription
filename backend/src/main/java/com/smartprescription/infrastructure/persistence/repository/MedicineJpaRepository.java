package com.smartprescription.infrastructure.persistence.repository;

import com.smartprescription.infrastructure.persistence.entity.MedicineJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Medicine JPA Repository (Clean Architecture - Infrastructure Layer)
 * 
 * Spring Data JPA repository for MedicineJpaEntity.
 * This is the actual database access layer.
 */
@Repository
public interface MedicineJpaRepository extends JpaRepository<MedicineJpaEntity, Long> {

    List<MedicineJpaEntity> findByGenericName(String genericName);

    List<MedicineJpaEntity> findByBrandName(String brandName);

    @Query("SELECT m FROM MedicineJpaEntity m WHERE " +
            "LOWER(m.brandName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.genericName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<MedicineJpaEntity> searchByName(@Param("keyword") String keyword);
}
