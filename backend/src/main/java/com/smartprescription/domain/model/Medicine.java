package com.smartprescription.domain.model;

/**
 * Medicine Domain Model (Clean Architecture - Domain Layer)
 * 
 * Pure business entity representing a medicine in the catalog.
 */
public class Medicine {

    private Long id;
    private String manufacturer;
    private String brandName;
    private String genericName;
    private String strength;
    private String type;
    private Integer occurrence;

    // Constructors
    public Medicine() {
    }

    public Medicine(Long id, String manufacturer, String brandName, String genericName,
            String strength, String type, Integer occurrence) {
        this.id = id;
        this.manufacturer = manufacturer;
        this.brandName = brandName;
        this.genericName = genericName;
        this.strength = strength;
        this.type = type;
        this.occurrence = occurrence;
    }

    // Business logic
    public void incrementUsage() {
        this.occurrence = (this.occurrence == null ? 0 : this.occurrence) + 1;
    }

    public String getFullName() {
        return String.format("%s - %s (%s)", brandName, genericName, strength);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getOccurrence() {
        return occurrence;
    }

    public void setOccurrence(Integer occurrence) {
        this.occurrence = occurrence;
    }
}
