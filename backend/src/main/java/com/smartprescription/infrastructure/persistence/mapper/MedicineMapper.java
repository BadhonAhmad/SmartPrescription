package com.smartprescription.infrastructure.persistence.mapper;

import com.smartprescription.domain.model.Medicine;
import com.smartprescription.infrastructure.persistence.entity.MedicineJpaEntity;
import org.springframework.stereotype.Component;

/**
 * Medicine Mapper (Clean Architecture - Infrastructure Layer)
 * 
 * Maps between domain model (Medicine) and JPA entity (MedicineJpaEntity).
 * This keeps the domain layer independent of persistence framework.
 */
@Component
public class MedicineMapper {

    public MedicineJpaEntity toJpaEntity(Medicine medicine) {
        if (medicine == null) {
            return null;
        }

        MedicineJpaEntity entity = new MedicineJpaEntity();
        entity.setId(medicine.getId());
        entity.setManufacturer(medicine.getManufacturer());
        entity.setBrandName(medicine.getBrandName());
        entity.setGenericName(medicine.getGenericName());
        entity.setStrength(medicine.getStrength());
        entity.setType(medicine.getType());
        entity.setOccurrence(medicine.getOccurrence());

        return entity;
    }

    public Medicine toDomain(MedicineJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        Medicine medicine = new Medicine();
        medicine.setId(entity.getId());
        medicine.setManufacturer(entity.getManufacturer());
        medicine.setBrandName(entity.getBrandName());
        medicine.setGenericName(entity.getGenericName());
        medicine.setStrength(entity.getStrength());
        medicine.setType(entity.getType());
        medicine.setOccurrence(entity.getOccurrence());

        return medicine;
    }
}
