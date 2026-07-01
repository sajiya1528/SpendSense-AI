package com.spendsenseai.controller;

import com.spendsenseai.dto.ExpenseRequest;
import com.spendsenseai.dto.ExpenseResponse;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.ExpenseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Expense Management", description = "Endpoints for logging, tracking, updating, and filtering expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    @Operation(summary = "Log a new expense transaction")
    public ResponseEntity<ExpenseResponse> addExpense(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.addExpense(userDetails.getId(), request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all expenses, optionally filtered by category, date range, or search keyword")
    public ResponseEntity<List<ExpenseResponse>> getExpenses(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String query) {
        
        List<ExpenseResponse> expenses;
        if (query != null && !query.trim().isEmpty()) {
            expenses = expenseService.searchExpenses(userDetails.getId(), query);
        } else if (category != null && !category.trim().isEmpty()) {
            expenses = expenseService.filterByCategory(userDetails.getId(), category);
        } else if (startDate != null && endDate != null) {
            expenses = expenseService.filterByDate(userDetails.getId(), startDate, endDate);
        } else {
            expenses = expenseService.getAllExpenses(userDetails.getId());
        }
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed information for a specific expense transaction")
    public ResponseEntity<ExpenseResponse> getExpenseById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        ExpenseResponse response = expenseService.getExpenseById(userDetails.getId(), id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update details of an existing expense transaction")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.updateExpense(userDetails.getId(), id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a specific expense record")
    public ResponseEntity<String> deleteExpense(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        expenseService.deleteExpense(userDetails.getId(), id);
        return ResponseEntity.ok("Expense transaction deleted successfully.");
    }
}
