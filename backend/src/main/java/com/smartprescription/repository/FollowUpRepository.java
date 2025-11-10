package com.smartprescription.repository;

import com.smartprescription.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, String> {
    List<FollowUp> findByContentContainingIgnoreCase(String content);

    List<FollowUp> findTop10ByOrderByOccurrenceDesc();
}
