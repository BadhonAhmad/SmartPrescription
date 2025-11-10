package com.smartprescription.repository;

import com.smartprescription.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, String> {
    List<Diagnosis> findByContentContainingIgnoreCase(String content);

    List<Diagnosis> findTop10ByOrderByOccurrenceDesc();
}
