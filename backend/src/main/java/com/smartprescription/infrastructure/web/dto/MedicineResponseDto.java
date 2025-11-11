package com.smartprescription.infrastructure.web.dto;

/**
 * Medicine Response DTO (Clean Architecture - Infrastructure Web Layer)
 * 
 * Data Transfer Object for Medicine API responses.
 */
public class MedicineResponseDto {

    private Long id;
    private String manufacturer;
    private String brandName;
    private String genericName;
    private String strength;
    private String type;
    private Integer occurrence;

    // Constructors
    public MedicineResponseDto() {
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
