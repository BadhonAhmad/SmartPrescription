package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * OnExamination Entity
 * 
 * Stores physical examination findings templates.
 * Example: "BP: 120/80", "Pulse: 72/min"
 */
@Entity
@Table(name = "OnExamination")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnExamination {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
