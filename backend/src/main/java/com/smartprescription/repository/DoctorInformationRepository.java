package com.smartprescription.repository;

import com.smartprescription.entity.DoctorInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorInformationRepository extends JpaRepository<DoctorInformation, Long> {
}
