package com.spendsenseai.controller;

import com.spendsenseai.dto.AIRequest;
import com.spendsenseai.dto.AIResponse;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.AIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "AI Powered Insights", description = "Endpoints for parsing financial logs, auto-categorizing items, and getting budget suggestions")
public class AIController {

    private final AIService aiService;

    @Autowired
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    @Operation(summary = "Perform AI analysis on the user's overall current income and expense profile")
    public ResponseEntity<AIResponse> analyzeProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody(required = false) AIRequest request) {
        AIRequest req = request != null ? request : new AIRequest();
        AIResponse response = aiService.analyze(userDetails.getId(), req);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/categorize")
    @Operation(summary = "Auto-categorize an expense title description keyword using AI heuristics")
    public ResponseEntity<AIResponse> categorizeExpense(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody AIRequest request) {
        AIResponse response = aiService.categorize(userDetails.getId(), request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/budget")
    @Operation(summary = "Get tailored savings and budgeting guidelines from the AI assistant")
    public ResponseEntity<AIResponse> getBudgetAdvice(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody(required = false) AIRequest request) {
        AIRequest req = request != null ? request : new AIRequest();
        AIResponse response = aiService.budget(userDetails.getId(), req);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/summary")
    @Operation(summary = "Generate a verbal financial summary of transaction health and outflow volumes")
    public ResponseEntity<AIResponse> getSummary(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody(required = false) AIRequest request) {
        AIRequest req = request != null ? request : new AIRequest();
        AIResponse response = aiService.summary(userDetails.getId(), req);
        return ResponseEntity.ok(response);
    }
}
