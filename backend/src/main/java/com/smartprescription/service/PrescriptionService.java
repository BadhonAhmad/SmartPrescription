package com.smartprescription.service;

import com.smartprescription.entity.PatientVisit;
import com.smartprescription.repository.PatientVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

/**
 * Prescription Service
 * 
 * Manages patient visits and prescriptions:
 * - Create new prescription
 * - Get patient visit history
 * - Update prescription
 * - Search prescriptions
 */
@Service
public class PrescriptionService {

    @Autowired
    private PatientVisitRepository patientVisitRepository;

    public List<PatientVisit> getAllPrescriptions() {
        return patientVisitRepository.findAll();
    }

    public PatientVisit getPrescriptionById(Long id) {
        return patientVisitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found with id: " + id));
    }

    public PatientVisit createPrescription(PatientVisit patientVisit) {
        patientVisit.setVisit(LocalDate.now());
        return patientVisitRepository.save(patientVisit);
    }

    public PatientVisit updatePrescription(Long id, PatientVisit details) {
        PatientVisit prescription = getPrescriptionById(id);
        
        prescription.setMedicine(details.getMedicine());
        prescription.setAdvice(details.getAdvice());
        prescription.setFollowUp(details.getFollowUp());
        prescription.setNotes(details.getNotes());
        prescription.setComplaint(details.getComplaint());
        prescription.setHistory(details.getHistory());
        prescription.setOnExamination(details.getOnExamination());
        prescription.setInvestigation(details.getInvestigation());
        prescription.setDiagnosis(details.getDiagnosis());
        prescription.setTreatmentPlan(details.getTreatmentPlan());
        prescription.setName(details.getName());
        prescription.setPatientAge(details.getPatientAge());
        prescription.setGender(details.getGender());
        prescription.setNextVisit(details.getNextVisit());
        if (details.getVisit() != null) {
            prescription.setVisit(details.getVisit());
        }
        
        return patientVisitRepository.save(prescription);
    }

    public void deletePrescription(Long id) {
        PatientVisit prescription = getPrescriptionById(id);
        patientVisitRepository.delete(prescription);
    }

    public List<PatientVisit> getPatientHistory(Long patientId) {
        return patientVisitRepository.findByIdOrderByVisitDesc(patientId);
    }

    public List<PatientVisit> searchByPatientName(String name) {
        return patientVisitRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Object[]> getDayWiseReport(LocalDate start, LocalDate end) {
        return patientVisitRepository.getDayWiseCounts(start, end);
    }
}
