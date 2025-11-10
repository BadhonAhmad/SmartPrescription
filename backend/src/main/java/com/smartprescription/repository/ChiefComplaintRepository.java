package com.smartprescription.repository;

import com.smartprescription.entity.ChiefComplaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChiefComplaintRepository extends JpaRepository<ChiefComplaint, String> {
    List<ChiefComplaint> findByContentContainingIgnoreCase(String content);

    List<ChiefComplaint> findTop10ByOrderByOccurrenceDesc();
}
