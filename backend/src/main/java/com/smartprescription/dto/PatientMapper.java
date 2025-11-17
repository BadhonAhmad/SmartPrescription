package com.smartprescription.dto;

import com.smartprescription.entity.PatientJpaEntity;
import org.springframework.stereotype.Component;

/**
 * Patient Mapper
 * 
 * Maps between PatientJpaEntity and PatientResponseDto.
 */
@Component
public class PatientMapper {

    public PatientResponseDto toDto(PatientJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        PatientResponseDto dto = new PatientResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAge(entity.getAge());
        dto.setAddress(entity.getAddress());
        dto.setPhone(entity.getPhone());
        dto.setBlood(entity.getBlood());
        dto.setLastVisit(entity.getLastVisit());

        return dto;
    }

    public PatientJpaEntity toEntity(PatientResponseDto dto) {
        if (dto == null) {
            return null;
        }

        PatientJpaEntity entity = new PatientJpaEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setAge(dto.getAge());
        entity.setAddress(dto.getAddress());
        entity.setPhone(dto.getPhone());
        entity.setBlood(dto.getBlood());
        entity.setLastVisit(dto.getLastVisit());

        return entity;
    }
}
