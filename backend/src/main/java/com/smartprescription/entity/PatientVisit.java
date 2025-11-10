package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * PatientVisit Entity
 * 
 * Represents a single visit/prescription for a patient.
 * This is the core entity that stores complete prescription information.
 * 
 * Fields:
 * - id: Patient ID (foreign key to Patient table)
 * - visit: Date of visit
 * - prescriptionId: Unique prescription identifier
 * - medicine: JSON/Text containing prescribed medicines
 * - advice: Medical advice given to patient
 * - followUp: Follow-up instructions
 * - notes: Special notes
 * - name: Patient name (denormalized for quick access)
 * - complaint: Chief complaint
 * - history: Medical history
 * - onExamination: Physical examination findings
 * - investigation: Lab tests/investigations ordered
 * - diagnosis: Medical diagnosis
 * - treatmentPlan: Treatment plan details
 */
@Entity
@Table(name = "PatientVisit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientVisit {
    
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
    private String gender; // M/F/Other
    
    @Column(name = "NEXTVISIT")
    private LocalDate nextVisit;
}
