package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ChiefComplaint Entity
 * 
 * Stores common chief complaints/symptoms.
 * Example: "Fever", "Headache", "Chest pain"
 */
@Entity
@Table(name = "ChiefComplaint")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiefComplaint {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
