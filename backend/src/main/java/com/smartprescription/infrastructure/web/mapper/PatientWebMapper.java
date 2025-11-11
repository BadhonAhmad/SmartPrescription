package com.smartprescription.infrastructure.web.mapper;

import com.smartprescription.domain.model.Patient;
import com.smartprescription.infrastructure.web.dto.PatientResponseDto;
import org.springframework.stereotype.Component;

/**
 * Patient Web Mapper (Clean Architecture - Infrastructure Web Layer)
 * 
 * Maps between domain model and web DTOs.
 */
@Component
public class PatientWebMapper {

    public PatientResponseDto toDto(Patient patient) {
        if (patient == null) {
            return null;
        }

        PatientResponseDto dto = new PatientResponseDto();
        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setAge(patient.getAge());
        dto.setAddress(patient.getAddress());
        dto.setPhone(patient.getPhone());
        dto.setBlood(patient.getBlood());
        dto.setLastVisit(patient.getLastVisit());

        return dto;
    }

    public Patient toDomain(PatientResponseDto dto) {
        if (dto == null) {
            return null;
        }

        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setName(dto.getName());
        patient.setAge(dto.getAge());
        patient.setAddress(dto.getAddress());
        patient.setPhone(dto.getPhone());
        patient.setBlood(dto.getBlood());
        patient.setLastVisit(dto.getLastVisit());

        return patient;
    }
}
