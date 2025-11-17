package com.smartprescription.dto;

import com.smartprescription.entity.Medicine;
import org.springframework.stereotype.Component;

/**
 * Medicine Mapper
 * 
 * Maps between Medicine entity and MedicineResponseDto.
 */
@Component
public class MedicineMapper {

    public MedicineResponseDto toDto(Medicine entity) {
        if (entity == null) {
            return null;
        }

        MedicineResponseDto dto = new MedicineResponseDto();
        dto.setId(entity.getId());
        dto.setManufacturer(entity.getManufacturerName());
        dto.setBrandName(entity.getBrandName());
        dto.setGenericName(entity.getGenericName());
        dto.setStrength(entity.getStrength());
        dto.setType(entity.getMedicineType());
        dto.setDosageDescription(entity.getDosageDescription());
        dto.setOccurrence(entity.getOccurrence());

        return dto;
    }

    public Medicine toEntity(MedicineResponseDto dto) {
        if (dto == null) {
            return null;
        }

        Medicine entity = new Medicine();
        entity.setId(dto.getId());
        entity.setManufacturerName(dto.getManufacturer());
        entity.setBrandName(dto.getBrandName());
        entity.setGenericName(dto.getGenericName());
        entity.setStrength(dto.getStrength());
        entity.setMedicineType(dto.getType());
        entity.setDosageDescription(dto.getDosageDescription());
        entity.setOccurrence(dto.getOccurrence() != null ? dto.getOccurrence() : 0);

        return entity;
    }
}
