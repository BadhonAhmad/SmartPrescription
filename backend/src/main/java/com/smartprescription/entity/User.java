package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User Entity
 * 
 * Represents a system user (doctor/admin) who can login to the application.
 * 
 * Fields:
 * - id: Auto-generated unique identifier
 * - username: Login username (unique)
 * - password: Encrypted password (BCrypt)
 * - status: Login status (0=offline, 1=online)
 */
@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 255)
    private String username;
    
    @Column(nullable = false, length = 255)
    private String password;
    
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer status = 0;
}
