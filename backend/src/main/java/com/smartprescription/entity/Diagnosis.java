package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Diagnosis Entity
 * 
 * Stores diagnosis templates.
 * Example: "Type 2 Diabetes Mellitus", "Hypertension"
 */
@Entity
@Table(name = "Diagnosis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diagnosis {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
