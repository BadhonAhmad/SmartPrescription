package com.smartprescription.repository;

import com.smartprescription.entity.SpecialNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpecialNoteRepository extends JpaRepository<SpecialNote, String> {
    List<SpecialNote> findByContentContainingIgnoreCase(String content);

    List<SpecialNote> findTop10ByOrderByOccurrenceDesc();
}
