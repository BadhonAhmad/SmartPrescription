package com.smartprescription.repository;

import com.smartprescription.entity.Investigation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestigationRepository extends JpaRepository<Investigation, String> {
    List<Investigation> findByContentContainingIgnoreCase(String content);

    List<Investigation> findTop10ByOrderByOccurrenceDesc();
}
