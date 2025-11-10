package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Medicine Entity
 * 
 * Stores information about medicines available in the database.
 * 
 * Fields:
 * - id: Auto-generated medicine ID
 * - manufacturerName: Company that manufactures the medicine
 * - brandName: Commercial/brand name
 * - genericName: Generic/scientific name
 * - strength: Dosage strength (e.g., "500mg")
 * - medicineType: Type (Tablet, Capsule, Syrup, Injection, etc.)
 * - occurrence: Usage frequency counter (for auto-suggestions)
 * - dosageDescription: How to take the medicine
 */
@Entity
@Table(name = "Medicine")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "ManufacturerName")
    private String manufacturerName;
    
    @Column(name = "BrandName")
    private String brandName;
    
    @Column(name = "GenericName")
    private String genericName;
    
    @Column(name = "Strength")
    private String strength;
    
    @Column(name = "MedicineType")
    private String medicineType;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
    
    @Column(name = "DosageDescription", length = 1000)
    private String dosageDescription;
}
