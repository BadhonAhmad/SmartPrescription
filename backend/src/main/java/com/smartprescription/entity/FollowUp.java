package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FollowUp Entity
 * 
 * Stores follow-up instruction templates.
 * Example: "Come back after 7 days", "Report if fever persists"
 */
@Entity
@Table(name = "FollowUp")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowUp {
    
    @Id
    @Column(name = "Content", nullable = false, length = 500)
    private String content;
    
    @Column(name = "Occurrence", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer occurrence = 0;
}
