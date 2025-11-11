package com.smartprescription.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * Patient JPA Entity (Clean Architecture - Infrastructure Layer)
 * 
 * JPA entity for persisting patient data to database.
 * This is separate from the domain model to keep domain layer clean.
 * 
 * Fields:
 * - id: Auto-generated patient ID
 * - name: Patient's full name
 * - age: Patient's age
 * - address: Patient's residential address
 * - phone: Contact number
 * - blood: Blood group (A+, B+, O+, etc.)
 * - lastVisit: Date of last visit to clinic
 */
@Entity
@Table(name = "Patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String age;

    @Column(length = 500)
    private String address;

    private String phone;

    private String blood;

    @Column(name = "LastVisit")
    private LocalDate lastVisit;
}
