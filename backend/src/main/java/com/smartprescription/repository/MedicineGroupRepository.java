package com.smartprescription.repository;

import com.smartprescription.entity.MedicineGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicineGroupRepository extends JpaRepository<MedicineGroup, String> {
    List<MedicineGroup> findTop10ByOrderByOccurrenceDesc();
}
