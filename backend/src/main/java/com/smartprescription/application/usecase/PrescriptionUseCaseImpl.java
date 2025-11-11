package com.smartprescription.application.usecase;

import com.smartprescription.application.port.input.PrescriptionUseCase;
import com.smartprescription.domain.model.Patient;
import com.smartprescription.domain.model.Prescription;
import com.smartprescription.domain.repository.PatientRepository;
import com.smartprescription.domain.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Prescription Use Case Implementation (Clean Architecture - Application Layer)
 * 
 * Contains business logic for prescription operations.
 * Depends only on domain interfaces (ports).
 */
@Service
@Transactional
public class PrescriptionUseCaseImpl implements PrescriptionUseCase {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;

    public PrescriptionUseCaseImpl(PrescriptionRepository prescriptionRepository,
            PatientRepository patientRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public Prescription createPrescription(Prescription prescription) {
        // Set visit date if not set
        if (prescription.getVisitDate() == null) {
            prescription.setVisitDate(LocalDate.now());
        }

        // Create or update patient automatically (business logic)
        Patient patient = createOrUpdatePatient(prescription);
        prescription.setPatientId(patient.getId());

        return prescriptionRepository.save(prescription);
    }

    @Override
    public Prescription updatePrescription(Long id, Prescription prescription) {
        if (!prescriptionRepository.existsById(id)) {
            throw new RuntimeException("Prescription not found with id: " + id);
        }
        prescription.setPrescriptionId(id);

        // Update patient if details changed
        if (prescription.getPatientId() != null) {
            createOrUpdatePatient(prescription);
        }

        return prescriptionRepository.save(prescription);
    }

    @Override
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found with id: " + id));
    }

    @Override
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    @Override
    public List<Prescription> getPrescriptionsByPatientId(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    @Override
    public List<Prescription> getPrescriptionsByPatientName(String patientName) {
        return prescriptionRepository.findByPatientName(patientName);
    }

    @Override
    public void deletePrescription(Long id) {
        if (!prescriptionRepository.existsById(id)) {
            throw new RuntimeException("Prescription not found with id: " + id);
        }
        prescriptionRepository.deleteById(id);
    }

    // Private business logic method
    private Patient createOrUpdatePatient(Prescription prescription) {
        String patientName = prescription.getPatientName();

        if (patientName == null || patientName.trim().isEmpty()) {
            throw new RuntimeException("Patient name is required");
        }

        // Check if patient exists by ID
        Patient patient;
        if (prescription.getPatientId() != null) {
            patient = patientRepository.findById(prescription.getPatientId())
                    .orElse(new Patient());
        } else {
            // Try to find by name
            patient = patientRepository.findByName(patientName)
                    .orElse(new Patient());
        }

        // Update patient details
        patient.setName(patientName);
        if (prescription.getPatientAge() != null) {
            patient.setAge(String.valueOf(prescription.getPatientAge()));
        }
        patient.setLastVisit(prescription.getVisitDate());

        return patientRepository.save(patient);
    }
}
