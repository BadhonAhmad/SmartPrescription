package com.smartprescription.repository;

import com.smartprescription.entity.OnExamination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OnExaminationRepository extends JpaRepository<OnExamination, String> {
    List<OnExamination> findByContentContainingIgnoreCase(String content);

    List<OnExamination> findTop10ByOrderByOccurrenceDesc();
}
