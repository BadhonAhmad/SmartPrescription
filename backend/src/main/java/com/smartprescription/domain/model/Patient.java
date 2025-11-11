package com.smartprescription.domain.model;

import java.time.LocalDate;

/**
 * Patient Domain Model (Clean Architecture - Domain Layer)
 * 
 * Pure business entity without any framework dependencies.
 * Represents the core business concept of a Patient.
 */
public class Patient {

    private Long id;
    private String name;
    private String age;
    private String address;
    private String phone;
    private String blood;
    private LocalDate lastVisit;

    // Constructor
    public Patient() {
    }

    public Patient(Long id, String name, String age, String address, String phone, String blood, LocalDate lastVisit) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.blood = blood;
        this.lastVisit = lastVisit;
    }

    // Business logic methods
    public void updateLastVisit(LocalDate visitDate) {
        this.lastVisit = visitDate;
    }

    public boolean isActive() {
        return this.lastVisit != null &&
                this.lastVisit.isAfter(LocalDate.now().minusYears(1));
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBlood() {
        return blood;
    }

    public void setBlood(String blood) {
        this.blood = blood;
    }

    public LocalDate getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(LocalDate lastVisit) {
        this.lastVisit = lastVisit;
    }
}
