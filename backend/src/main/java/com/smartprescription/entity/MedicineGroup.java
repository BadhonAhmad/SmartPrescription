package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * MedicineGroup Entity
 * 
 * Stores predefined groups of medicines that are commonly prescribed together.
 * Example: "Diabetes Kit", "Hypertension Package"
 * 
 * Fields:
 * - groupName: Name of the medicine group (Primary Key)
 * - medicineList: Comma-separated list of medicine IDs
 * - occurrence: Usage frequency counter
 */
@Entity
@Table(name = "MedicineGroup")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineGroup {
    
    @Id
    @Column(name = "GroupName", nullable = false)
    private String groupName;
    
    @Column(name = "MedicineList", length = 2000)
    private String medicineList;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
