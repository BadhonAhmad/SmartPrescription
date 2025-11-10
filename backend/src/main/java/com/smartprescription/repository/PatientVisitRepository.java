package com.smartprescription.repository;

import com.smartprescription.entity.PatientVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

/**
 * PatientVisit Repository
 * 
 * Provides database operations for PatientVisit (prescription) entity.
 */
@Repository
public interface PatientVisitRepository extends JpaRepository<PatientVisit, Long> {
    List<PatientVisit> findByIdOrderByVisitDesc(Long patientId);
    List<PatientVisit> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT pv.visit as day, COUNT(pv) as count FROM PatientVisit pv " +
           "WHERE (:start IS NULL OR pv.visit >= :start) AND (:end IS NULL OR pv.visit <= :end) " +
           "GROUP BY pv.visit ORDER BY pv.visit")
    List<Object[]> getDayWiseCounts(@Param("start") LocalDate start, @Param("end") LocalDate end);
}
