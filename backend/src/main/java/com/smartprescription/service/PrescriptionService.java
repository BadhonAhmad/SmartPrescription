package com.smartprescription.service;

import com.smartprescription.entity.PatientJpaEntity;
import com.smartprescription.entity.PatientVisit;
import com.smartprescription.repository.PatientRepository;
import com.smartprescription.repository.PatientVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private PatientRepository patientRepository;

    public List<PatientVisit> getAllPrescriptions() {
        return patientVisitRepository.findAll();
    }

    public PatientVisit getPrescriptionById(Long id) {
        return patientVisitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found with id: " + id));
    }

    public PatientVisit createPrescription(PatientVisit patientVisit) {
        patientVisit.setVisit(LocalDate.now());

        // Create or update patient automatically
        PatientJpaEntity patient = createOrUpdatePatient(patientVisit);
        patientVisit.setId(patient.getId());

        return patientVisitRepository.save(patientVisit);
    }

    /**
     * Create or update patient from prescription data
     */
    private PatientJpaEntity createOrUpdatePatient(PatientVisit visit) {
        // Try to find existing patient by name (you can enhance this with phone or
        // other unique identifier)
        Optional<PatientJpaEntity> existingPatient = patientRepository
                .findByNameContainingIgnoreCase(visit.getName())
                .stream()
                .filter(p -> p.getName().equalsIgnoreCase(visit.getName()))
                .findFirst();

        PatientJpaEntity patient;
        if (existingPatient.isPresent()) {
            // Update existing patient
            patient = existingPatient.get();
            patient.setAge(visit.getPatientAge() != null ? visit.getPatientAge().toString() : patient.getAge());
            patient.setLastVisit(LocalDate.now());
        } else {
            // Create new patient
            patient = new PatientJpaEntity();
            patient.setName(visit.getName());
            patient.setAge(visit.getPatientAge() != null ? visit.getPatientAge().toString() : "");
            patient.setLastVisit(LocalDate.now());
        }

        return patientRepository.save(patient);
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

        // Update patient information if patient exists
        if (prescription.getId() != null && prescription.getId() > 0) {
            Optional<PatientJpaEntity> patientOpt = patientRepository.findById(prescription.getId());
            if (patientOpt.isPresent()) {
                PatientJpaEntity patient = patientOpt.get();
                patient.setName(details.getName());
                patient.setAge(details.getPatientAge() != null ? details.getPatientAge().toString() : patient.getAge());
                patient.setLastVisit(LocalDate.now());
                patientRepository.save(patient);
            }
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
