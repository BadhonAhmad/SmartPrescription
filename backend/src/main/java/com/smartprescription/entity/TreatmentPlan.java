package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TreatmentPlan Entity
 * 
 * Stores treatment plan templates.
 * Example: "Lifestyle modification", "Continue current medication"
 */
@Entity
@Table(name = "TreatmentPlan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPlan {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
