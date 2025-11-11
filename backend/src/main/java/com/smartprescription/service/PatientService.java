package com.smartprescription.service;

import com.smartprescription.infrastructure.persistence.entity.PatientJpaEntity;
import com.smartprescription.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

/**
 * Patient Service (Legacy - for backward compatibility)
 * 
 * Business logic for patient management:
 * - Create, read, update, delete patients
 * - Search patients by name or phone
 * - Get patient list with pagination
 * 
 * @deprecated Use PatientUseCase instead for new code
 */
@Service
@Deprecated
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<PatientJpaEntity> getAllPatients() {
        return patientRepository.findAll();
    }

    public PatientJpaEntity getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public PatientJpaEntity createPatient(PatientJpaEntity patient) {
        patient.setLastVisit(LocalDate.now());
        return patientRepository.save(patient);
    }

    public PatientJpaEntity updatePatient(Long id, PatientJpaEntity patientDetails) {
        PatientJpaEntity patient = getPatientById(id);

        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setAddress(patientDetails.getAddress());
        patient.setPhone(patientDetails.getPhone());
        patient.setBlood(patientDetails.getBlood());
        patient.setLastVisit(LocalDate.now());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        PatientJpaEntity patient = getPatientById(id);
        patientRepository.delete(patient);
    }

    public List<PatientJpaEntity> searchPatientsByName(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<PatientJpaEntity> searchPatientsByPhone(String phone) {
        return patientRepository.findByPhoneContaining(phone);
    }
}
