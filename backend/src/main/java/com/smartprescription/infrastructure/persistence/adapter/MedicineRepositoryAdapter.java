package com.smartprescription.infrastructure.persistence.adapter;

import com.smartprescription.domain.model.Medicine;
import com.smartprescription.domain.repository.MedicineRepository;
import com.smartprescription.infrastructure.persistence.entity.MedicineJpaEntity;
import com.smartprescription.infrastructure.persistence.mapper.MedicineMapper;
import com.smartprescription.infrastructure.persistence.repository.MedicineJpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Medicine Repository Adapter (Clean Architecture - Infrastructure Layer)
 * 
 * Implements domain repository interface using JPA.
 * This is the ADAPTER that connects domain layer to infrastructure.
 */
@Component
public class MedicineRepositoryAdapter implements MedicineRepository {

    private final MedicineJpaRepository jpaRepository;
    private final MedicineMapper mapper;

    public MedicineRepositoryAdapter(MedicineJpaRepository jpaRepository, MedicineMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Medicine save(Medicine medicine) {
        MedicineJpaEntity entity = mapper.toJpaEntity(medicine);
        MedicineJpaEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Medicine> findById(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Medicine> findAll() {
        return jpaRepository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Medicine> findByGenericName(String genericName) {
        return jpaRepository.findByGenericName(genericName).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Medicine> findByBrandName(String brandName) {
        return jpaRepository.findByBrandName(brandName).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Medicine> searchByName(String keyword) {
        return jpaRepository.searchByName(keyword).stream()
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
