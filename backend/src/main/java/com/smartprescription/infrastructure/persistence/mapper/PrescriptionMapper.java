package com.smartprescription.infrastructure.persistence.mapper;

import com.smartprescription.domain.model.Prescription;
import com.smartprescription.infrastructure.persistence.entity.PrescriptionJpaEntity;
import org.springframework.stereotype.Component;

/**
 * Prescription Mapper (Clean Architecture - Infrastructure Layer)
 * 
 * Maps between domain model (Prescription) and JPA entity
 * (PrescriptionJpaEntity).
 * This keeps the domain layer independent of persistence framework.
 */
@Component
public class PrescriptionMapper {

    public PrescriptionJpaEntity toJpaEntity(Prescription prescription) {
        if (prescription == null) {
            return null;
        }

        PrescriptionJpaEntity entity = new PrescriptionJpaEntity();
        entity.setPrescriptionId(prescription.getPrescriptionId());
        entity.setId(prescription.getPatientId());
        entity.setVisit(prescription.getVisitDate());
        entity.setMedicine(prescription.getMedicine());
        entity.setAdvice(prescription.getAdvice());
        entity.setFollowUp(prescription.getFollowUp());
        entity.setNotes(prescription.getNotes());
        entity.setName(prescription.getPatientName());
        entity.setComplaint(prescription.getComplaint());
        entity.setHistory(prescription.getHistory());
        entity.setOnExamination(prescription.getOnExamination());
        entity.setInvestigation(prescription.getInvestigation());
        entity.setDiagnosis(prescription.getDiagnosis());
        entity.setTreatmentPlan(prescription.getTreatmentPlan());
        entity.setPatientAge(prescription.getPatientAge());
        entity.setGender(prescription.getGender());
        entity.setNextVisit(prescription.getNextVisit());

        return entity;
    }

    public Prescription toDomain(PrescriptionJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        Prescription prescription = new Prescription();
        prescription.setPrescriptionId(entity.getPrescriptionId());
        prescription.setPatientId(entity.getId());
        prescription.setVisitDate(entity.getVisit());
        prescription.setMedicine(entity.getMedicine());
        prescription.setAdvice(entity.getAdvice());
        prescription.setFollowUp(entity.getFollowUp());
        prescription.setNotes(entity.getNotes());
        prescription.setPatientName(entity.getName());
        prescription.setComplaint(entity.getComplaint());
        prescription.setHistory(entity.getHistory());
        prescription.setOnExamination(entity.getOnExamination());
        prescription.setInvestigation(entity.getInvestigation());
        prescription.setDiagnosis(entity.getDiagnosis());
        prescription.setTreatmentPlan(entity.getTreatmentPlan());
        prescription.setPatientAge(entity.getPatientAge());
        prescription.setGender(entity.getGender());
        prescription.setNextVisit(entity.getNextVisit());

        return prescription;
    }
}
