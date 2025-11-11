package com.smartprescription.infrastructure.persistence.adapter;

import com.smartprescription.domain.model.Patient;
import com.smartprescription.domain.repository.PatientRepository;
import com.smartprescription.infrastructure.persistence.entity.PatientJpaEntity;
import com.smartprescription.infrastructure.persistence.mapper.PatientMapper;
import com.smartprescription.infrastructure.persistence.repository.PatientJpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Patient Repository Adapter (Clean Architecture - Infrastructure Layer)
 * 
 * Implements domain repository interface using JPA.
 * This is the ADAPTER that connects domain layer to infrastructure.
 */
@Component
public class PatientRepositoryAdapter implements PatientRepository {

    private final PatientJpaRepository jpaRepository;
    private final PatientMapper mapper;

    public PatientRepositoryAdapter(PatientJpaRepository jpaRepository, PatientMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Patient save(Patient patient) {
        PatientJpaEntity entity = mapper.toJpaEntity(patient);
        PatientJpaEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Patient> findById(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Patient> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Patient> findByName(String name) {
        return jpaRepository.findByName(name)
                .map(mapper::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }
}
