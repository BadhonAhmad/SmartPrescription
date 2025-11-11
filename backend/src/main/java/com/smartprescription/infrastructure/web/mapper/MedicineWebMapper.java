package com.smartprescription.infrastructure.web.mapper;

import com.smartprescription.domain.model.Medicine;
import com.smartprescription.infrastructure.web.dto.MedicineResponseDto;
import org.springframework.stereotype.Component;

/**
 * Medicine Web Mapper (Clean Architecture - Infrastructure Web Layer)
 * 
 * Maps between domain model and web DTOs.
 */
@Component
public class MedicineWebMapper {

    public MedicineResponseDto toDto(Medicine medicine) {
        if (medicine == null) {
            return null;
        }

        MedicineResponseDto dto = new MedicineResponseDto();
        dto.setId(medicine.getId());
        dto.setManufacturer(medicine.getManufacturer());
        dto.setBrandName(medicine.getBrandName());
        dto.setGenericName(medicine.getGenericName());
        dto.setStrength(medicine.getStrength());
        dto.setType(medicine.getType());
        dto.setOccurrence(medicine.getOccurrence());

        return dto;
    }

    public Medicine toDomain(MedicineResponseDto dto) {
        if (dto == null) {
            return null;
        }

        Medicine medicine = new Medicine();
        medicine.setId(dto.getId());
        medicine.setManufacturer(dto.getManufacturer());
        medicine.setBrandName(dto.getBrandName());
        medicine.setGenericName(dto.getGenericName());
        medicine.setStrength(dto.getStrength());
        medicine.setType(dto.getType());
        medicine.setOccurrence(dto.getOccurrence());

        return medicine;
    }
}
