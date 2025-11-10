package com.smartprescription.repository;

import com.smartprescription.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, String> {
    List<History> findByContentContainingIgnoreCase(String content);

    List<History> findTop10ByOrderByOccurrenceDesc();
}
