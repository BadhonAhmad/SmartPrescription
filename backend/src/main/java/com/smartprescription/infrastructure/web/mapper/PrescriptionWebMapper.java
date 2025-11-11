package com.smartprescription.infrastructure.web.mapper;

import com.smartprescription.domain.model.Prescription;
import com.smartprescription.infrastructure.web.dto.PrescriptionResponseDto;
import org.springframework.stereotype.Component;

/**
 * Prescription Web Mapper (Clean Architecture - Infrastructure Web Layer)
 * 
 * Maps between domain model and web DTOs.
 */
@Component
public class PrescriptionWebMapper {

    public PrescriptionResponseDto toDto(Prescription prescription) {
        if (prescription == null) {
            return null;
        }

        PrescriptionResponseDto dto = new PrescriptionResponseDto();
        dto.setPrescriptionId(prescription.getPrescriptionId());
        dto.setId(prescription.getPatientId());
        dto.setVisit(prescription.getVisitDate());
        dto.setMedicine(prescription.getMedicine());
        dto.setAdvice(prescription.getAdvice());
        dto.setFollowUp(prescription.getFollowUp());
        dto.setNotes(prescription.getNotes());
        dto.setName(prescription.getPatientName());
        dto.setComplaint(prescription.getComplaint());
        dto.setHistory(prescription.getHistory());
        dto.setOnExamination(prescription.getOnExamination());
        dto.setInvestigation(prescription.getInvestigation());
        dto.setDiagnosis(prescription.getDiagnosis());
        dto.setTreatmentPlan(prescription.getTreatmentPlan());
        dto.setPatientAge(prescription.getPatientAge());
        dto.setGender(prescription.getGender());
        dto.setNextVisit(prescription.getNextVisit());

        return dto;
    }

    public Prescription toDomain(PrescriptionResponseDto dto) {
        if (dto == null) {
            return null;
        }

        Prescription prescription = new Prescription();
        prescription.setPrescriptionId(dto.getPrescriptionId());
        prescription.setPatientId(dto.getId());
        prescription.setVisitDate(dto.getVisit());
        prescription.setMedicine(dto.getMedicine());
        prescription.setAdvice(dto.getAdvice());
        prescription.setFollowUp(dto.getFollowUp());
        prescription.setNotes(dto.getNotes());
        prescription.setPatientName(dto.getName());
        prescription.setComplaint(dto.getComplaint());
        prescription.setHistory(dto.getHistory());
        prescription.setOnExamination(dto.getOnExamination());
        prescription.setInvestigation(dto.getInvestigation());
        prescription.setDiagnosis(dto.getDiagnosis());
        prescription.setTreatmentPlan(dto.getTreatmentPlan());
        prescription.setPatientAge(dto.getPatientAge());
        prescription.setGender(dto.getGender());
        prescription.setNextVisit(dto.getNextVisit());

        return prescription;
    }
}
