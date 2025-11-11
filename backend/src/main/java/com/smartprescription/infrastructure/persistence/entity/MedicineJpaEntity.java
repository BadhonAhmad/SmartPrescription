package com.smartprescription.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Medicine JPA Entity (Clean Architecture - Infrastructure Layer)
 * 
 * JPA entity for persisting medicine catalog data.
 */
@Entity
@Table(name = "Medicine")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ManufacturerName")
    private String manufacturer;

    @Column(name = "BrandName")
    private String brandName;

    @Column(name = "GenericName")
    private String genericName;

    @Column(name = "Strength")
    private String strength;

    @Column(name = "MedicineType")
    private String type;

    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence;
}
