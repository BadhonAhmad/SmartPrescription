package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.entity.*;
import com.smartprescription.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Template Controller
 * 
 * REST endpoints for template suggestions:
 * GET /templates/diagnosis - Get diagnosis suggestions
 * GET /templates/advice - Get advice suggestions
 * GET /templates/chief-complaints - Get chief complaint suggestions
 * GET /templates/history - Get history suggestions
 * GET /templates/on-examination - Get examination suggestions
 * GET /templates/investigation - Get investigation suggestions
 * GET /templates/treatment-plan - Get treatment plan suggestions
 * GET /templates/follow-up - Get follow-up suggestions
 * GET /templates/special-notes - Get special note suggestions
 */
@RestController
@RequestMapping("/templates")
@CrossOrigin(origins = "*")
public class TemplateController {

    @Autowired
    private DiagnosisRepository diagnosisRepository;
    
    @Autowired
    private AdviceRepository adviceRepository;
    
    @Autowired
    private ChiefComplaintRepository chiefComplaintRepository;
    
    @Autowired
    private HistoryRepository historyRepository;
    
    @Autowired
    private OnExaminationRepository onExaminationRepository;
    
    @Autowired
    private InvestigationRepository investigationRepository;
    
    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;
    
    @Autowired
    private FollowUpRepository followUpRepository;
    
    @Autowired
    private SpecialNoteRepository specialNoteRepository;

    @GetMapping("/diagnosis")
    public ResponseEntity<ApiResponse<List<Diagnosis>>> getDiagnosisSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<Diagnosis> suggestions = diagnosisRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/advice")
    public ResponseEntity<ApiResponse<List<Advice>>> getAdviceSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<Advice> suggestions = adviceRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/chief-complaints")
    public ResponseEntity<ApiResponse<List<ChiefComplaint>>> getChiefComplaintSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<ChiefComplaint> suggestions = chiefComplaintRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<History>>> getHistorySuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<History> suggestions = historyRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/on-examination")
    public ResponseEntity<ApiResponse<List<OnExamination>>> getOnExaminationSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<OnExamination> suggestions = onExaminationRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/investigation")
    public ResponseEntity<ApiResponse<List<Investigation>>> getInvestigationSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<Investigation> suggestions = investigationRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/treatment-plan")
    public ResponseEntity<ApiResponse<List<TreatmentPlan>>> getTreatmentPlanSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<TreatmentPlan> suggestions = treatmentPlanRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/follow-up")
    public ResponseEntity<ApiResponse<List<FollowUp>>> getFollowUpSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<FollowUp> suggestions = followUpRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/special-notes")
    public ResponseEntity<ApiResponse<List<SpecialNote>>> getSpecialNoteSuggestions(
            @RequestParam(required = false, defaultValue = "50") int limit) {
        List<SpecialNote> suggestions = specialNoteRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "occurrence"))
        ).getContent();
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @PostMapping("/diagnosis")
    public ResponseEntity<ApiResponse<Diagnosis>> createDiagnosis(@RequestBody Diagnosis diagnosis) {
        diagnosis.setOccurrence(0);
        Diagnosis saved = diagnosisRepository.save(diagnosis);
        return ResponseEntity.ok(ApiResponse.success("Diagnosis template created", saved));
    }

    @PostMapping("/advice")
    public ResponseEntity<ApiResponse<Advice>> createAdvice(@RequestBody Advice advice) {
        advice.setOccurrence(0);
        Advice saved = adviceRepository.save(advice);
        return ResponseEntity.ok(ApiResponse.success("Advice template created", saved));
    }
}
