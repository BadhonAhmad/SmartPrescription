package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Investigation Entity
 * 
 * Stores investigation/lab test templates.
 * Example: "CBC", "Blood Sugar Fasting", "X-Ray Chest"
 */
@Entity
@Table(name = "Investigation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Investigation {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
