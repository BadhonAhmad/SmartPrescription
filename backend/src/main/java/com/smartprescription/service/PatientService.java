package com.smartprescription.service;

import com.smartprescription.entity.Patient;
import com.smartprescription.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

/**
 * Patient Service
 * 
 * Business logic for patient management:
 * - Create, read, update, delete patients
 * - Search patients by name or phone
 * - Get patient list with pagination
 */
@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public Patient createPatient(Patient patient) {
        patient.setLastVisit(LocalDate.now());
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = getPatientById(id);
        
        patient.setName(patientDetails.getName());
        patient.setAge(patientDetails.getAge());
        patient.setAddress(patientDetails.getAddress());
        patient.setPhone(patientDetails.getPhone());
        patient.setBlood(patientDetails.getBlood());
        patient.setLastVisit(LocalDate.now());
        
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);
        patientRepository.delete(patient);
    }

    public List<Patient> searchPatientsByName(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Patient> searchPatientsByPhone(String phone) {
        return patientRepository.findByPhoneContaining(phone);
    }
}
