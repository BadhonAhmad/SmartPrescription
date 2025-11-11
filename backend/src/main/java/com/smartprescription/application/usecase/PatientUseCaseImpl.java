package com.smartprescription.application.usecase;

import com.smartprescription.application.port.input.PatientUseCase;
import com.smartprescription.domain.model.Patient;
import com.smartprescription.domain.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Patient Use Case Implementation (Clean Architecture - Application Layer)
 * 
 * Contains business logic for patient operations.
 * Depends only on domain interfaces (ports).
 */
@Service
@Transactional
public class PatientUseCaseImpl implements PatientUseCase {

    private final PatientRepository patientRepository;

    public PatientUseCaseImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient) {
        // Business logic: validate patient data
        if (patient.getName() == null || patient.getName().trim().isEmpty()) {
            throw new RuntimeException("Patient name is required");
        }
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        patient.setId(id);
        return patientRepository.save(patient);
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientByName(String name) {
        return patientRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Patient not found with name: " + name));
    }

    @Override
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }
}
