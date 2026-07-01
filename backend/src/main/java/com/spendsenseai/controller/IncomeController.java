package com.spendsenseai.controller;

import com.spendsenseai.dto.IncomeRequest;
import com.spendsenseai.dto.IncomeResponse;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.IncomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Income Management", description = "Endpoints for logging, tracking, updating, and searching income transactions")
public class IncomeController {

    private final IncomeService incomeService;

    @Autowired
    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    @Operation(summary = "Log a new income transaction")
    public ResponseEntity<IncomeResponse> addIncome(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody IncomeRequest request) {
        IncomeResponse response = incomeService.addIncome(userDetails.getId(), request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all income transactions, optionally filtered by keyword search")
    public ResponseEntity<List<IncomeResponse>> getIncomes(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) String query) {
        
        List<IncomeResponse> incomes;
        if (query != null && !query.trim().isEmpty()) {
            incomes = incomeService.searchIncome(userDetails.getId(), query);
        } else {
            incomes = incomeService.getAllIncome(userDetails.getId());
        }
        return ResponseEntity.ok(incomes);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update details of an existing income transaction")
    public ResponseEntity<IncomeResponse> updateIncome(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody IncomeRequest request) {
        IncomeResponse response = incomeService.updateIncome(userDetails.getId(), id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a specific income record")
    public ResponseEntity<String> deleteIncome(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        incomeService.deleteIncome(userDetails.getId(), id);
        return ResponseEntity.ok("Income record deleted successfully.");
    }
}
