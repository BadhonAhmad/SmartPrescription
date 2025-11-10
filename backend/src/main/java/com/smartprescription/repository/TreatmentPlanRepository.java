package com.smartprescription.repository;

import com.smartprescription.entity.TreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TreatmentPlanRepository extends JpaRepository<TreatmentPlan, String> {
    List<TreatmentPlan> findByContentContainingIgnoreCase(String content);

    List<TreatmentPlan> findTop10ByOrderByOccurrenceDesc();
}
