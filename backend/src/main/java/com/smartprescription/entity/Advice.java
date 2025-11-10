package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Advice Entity
 * 
 * Stores medical advice templates that can be given to patients.
 * Example: "Drink plenty of water", "Avoid oily foods"
 * 
 * Fields:
 * - content: The advice text (Primary Key)
 * - occurrence: Usage frequency for auto-suggestions
 */
@Entity
@Table(name = "Advices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Advice {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
