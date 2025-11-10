package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * SpecialNote Entity
 * 
 * Stores special notes/warnings for prescriptions.
 * Example: "Pregnant women should avoid", "Take with food"
 */
@Entity
@Table(name = "SpecialNotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialNote {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
