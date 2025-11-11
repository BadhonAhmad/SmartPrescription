package com.smartprescription.infrastructure.persistence.mapper;

import com.smartprescription.domain.model.Patient;
import com.smartprescription.infrastructure.persistence.entity.PatientJpaEntity;
import org.springframework.stereotype.Component;

/**
 * Patient Mapper (Clean Architecture - Infrastructure Layer)
 * 
 * Maps between domain model (Patient) and JPA entity (PatientJpaEntity).
 * This keeps the domain layer independent of persistence framework.
 */
@Component
public class PatientMapper {

    public PatientJpaEntity toJpaEntity(Patient patient) {
        if (patient == null) {
            return null;
        }

        PatientJpaEntity entity = new PatientJpaEntity();
        entity.setId(patient.getId());
        entity.setName(patient.getName());
        entity.setAge(patient.getAge());
        entity.setAddress(patient.getAddress());
        entity.setPhone(patient.getPhone());
        entity.setBlood(patient.getBlood());
        entity.setLastVisit(patient.getLastVisit());

        return entity;
    }

    public Patient toDomain(PatientJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        Patient patient = new Patient();
        patient.setId(entity.getId());
        patient.setName(entity.getName());
        patient.setAge(entity.getAge());
        patient.setAddress(entity.getAddress());
        patient.setPhone(entity.getPhone());
        patient.setBlood(entity.getBlood());
        patient.setLastVisit(entity.getLastVisit());

        return patient;
    }
}
