package com.smartprescription.domain.model;

import java.time.LocalDate;

/**
 * Prescription Domain Model (Clean Architecture - Domain Layer)
 * 
 * Pure business entity representing a medical prescription/patient visit.
 * No framework dependencies - only business logic.
 */
public class Prescription {

    private Long prescriptionId;
    private Long patientId;
    private LocalDate visitDate;
    private String medicine;
    private String advice;
    private String followUp;
    private String notes;
    private String patientName;
    private String complaint;
    private String history;
    private String onExamination;
    private String investigation;
    private String diagnosis;
    private String treatmentPlan;
    private Integer patientAge;
    private String gender;
    private LocalDate nextVisit;

    // Constructors
    public Prescription() {
    }

    public Prescription(Long prescriptionId, Long patientId, LocalDate visitDate, String patientName) {
        this.prescriptionId = prescriptionId;
        this.patientId = patientId;
        this.visitDate = visitDate;
        this.patientName = patientName;
    }

    // Business logic methods
    public boolean isFollowUpRequired() {
        return this.nextVisit != null && this.nextVisit.isAfter(LocalDate.now());
    }

    public boolean isRecentVisit() {
        return this.visitDate != null &&
                this.visitDate.isAfter(LocalDate.now().minusDays(30));
    }

    public void scheduleFollowUp(int daysFromNow) {
        this.nextVisit = LocalDate.now().plusDays(daysFromNow);
    }

    // Getters and Setters
    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getMedicine() {
        return medicine;
    }

    public void setMedicine(String medicine) {
        this.medicine = medicine;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public String getFollowUp() {
        return followUp;
    }

    public void setFollowUp(String followUp) {
        this.followUp = followUp;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getOnExamination() {
        return onExamination;
    }

    public void setOnExamination(String onExamination) {
        this.onExamination = onExamination;
    }

    public String getInvestigation() {
        return investigation;
    }

    public void setInvestigation(String investigation) {
        this.investigation = investigation;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }

    public Integer getPatientAge() {
        return patientAge;
    }

    public void setPatientAge(Integer patientAge) {
        this.patientAge = patientAge;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getNextVisit() {
        return nextVisit;
    }

    public void setNextVisit(LocalDate nextVisit) {
        this.nextVisit = nextVisit;
    }
}
