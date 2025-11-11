package com.smartprescription.infrastructure.persistence.adapter;

import com.smartprescription.domain.model.Prescription;
import com.smartprescription.domain.repository.PrescriptionRepository;
import com.smartprescription.infrastructure.persistence.entity.PrescriptionJpaEntity;
import com.smartprescription.infrastructure.persistence.mapper.PrescriptionMapper;
import com.smartprescription.infrastructure.persistence.repository.PrescriptionJpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Prescription Repository Adapter (Clean Architecture - Infrastructure Layer)
 * 
 * Implements domain repository interface using JPA.
 * This is the ADAPTER that connects domain layer to infrastructure.
 */
@Component
public class PrescriptionRepositoryAdapter implements PrescriptionRepository {

    private final PrescriptionJpaRepository jpaRepository;
    private final PrescriptionMapper mapper;

    public PrescriptionRepositoryAdapter(PrescriptionJpaRepository jpaRepository,
            PrescriptionMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Prescription save(Prescription prescription) {
        PrescriptionJpaEntity entity = mapper.toJpaEntity(prescription);
        PrescriptionJpaEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Prescription> findById(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Prescription> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Prescription> findByPatientId(Long patientId) {
        return jpaRepository.findByIdOrderByVisitDesc(patientId).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Prescription> findByPatientName(String patientName) {
        return jpaRepository.findByNameOrderByVisitDesc(patientName).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
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
