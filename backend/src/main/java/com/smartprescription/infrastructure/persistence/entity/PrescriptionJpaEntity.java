package com.smartprescription.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * Prescription JPA Entity (Clean Architecture - Infrastructure Layer)
 * 
 * JPA entity for persisting prescription/patient visit data.
 * Maps to PatientVisit table in database.
 */
@Entity
@Table(name = "PatientVisit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRESCRIPTIONID")
    private Long prescriptionId;

    @Column(name = "ID")
    private Long id; // Patient ID

    @Column(name = "VISIT")
    private LocalDate visit;

    @Column(name = "MEDICINE", length = 5000)
    private String medicine;

    @Column(name = "ADVICE", length = 2000)
    private String advice;

    @Column(name = "FOLLOWUP", length = 1000)
    private String followUp;

    @Column(name = "NOTES", length = 2000)
    private String notes;

    @Column(name = "NAME")
    private String name;

    @Column(name = "COMPLAINT", length = 2000)
    private String complaint;

    @Column(name = "HISTORY", length = 2000)
    private String history;

    @Column(name = "ONEXAMINATION", length = 2000)
    private String onExamination;

    @Column(name = "INVESTIGATION", length = 2000)
    private String investigation;

    @Column(name = "DIAGNOSIS", length = 2000)
    private String diagnosis;

    @Column(name = "TREATMENTPLAN", length = 2000)
    private String treatmentPlan;

    @Column(name = "PATIENTAGE")
    private Integer patientAge;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "NEXTVISIT")
    private LocalDate nextVisit;
}
