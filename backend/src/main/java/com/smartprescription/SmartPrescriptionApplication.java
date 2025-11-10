package com.smartprescription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * SmartPrescription Backend Application
 * 
 * Main entry point for the Spring Boot application.
 * This application provides RESTful APIs for clinic management system.
 * 
 * Features:
 * - Patient management
 * - Prescription management
 * - Medicine database
 * - Authentication & Authorization
 * - Doctor information management
 */
@SpringBootApplication
@EnableJpaAuditing
public class SmartPrescriptionApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartPrescriptionApplication.class, args);
        System.out.println("SmartPrescription Backend Application Started Successfully!");
    }
}
