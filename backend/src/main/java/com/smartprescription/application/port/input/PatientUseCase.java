package com.smartprescription.application.port.input;

import com.smartprescription.domain.model.Patient;
import java.util.List;

/**
 * Patient Use Case Port (Clean Architecture - Application Layer)
 * 
 * Defines input port (interface) for patient operations.
 * Controllers will depend on this interface.
 */
public interface PatientUseCase {

    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    Patient getPatientById(Long id);

    List<Patient> getAllPatients();

    Patient getPatientByName(String name);

    void deletePatient(Long id);
}
