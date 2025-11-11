package com.smartprescription.application.port.input;

import com.smartprescription.domain.model.Prescription;
import java.util.List;

/**
 * Prescription Use Case Port (Clean Architecture - Application Layer)
 * 
 * Defines input port (interface) for prescription operations.
 * Controllers will depend on this interface.
 */
public interface PrescriptionUseCase {

    Prescription createPrescription(Prescription prescription);

    Prescription updatePrescription(Long id, Prescription prescription);

    Prescription getPrescriptionById(Long id);

    List<Prescription> getAllPrescriptions();

    List<Prescription> getPrescriptionsByPatientId(Long patientId);

    List<Prescription> getPrescriptionsByPatientName(String patientName);

    void deletePrescription(Long id);
}
