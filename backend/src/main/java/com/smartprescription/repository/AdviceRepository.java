package com.smartprescription.repository;

import com.smartprescription.entity.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdviceRepository extends JpaRepository<Advice, String> {
    List<Advice> findByContentContainingIgnoreCase(String content);

    List<Advice> findTop10ByOrderByOccurrenceDesc();
}
