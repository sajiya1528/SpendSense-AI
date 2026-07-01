package com.spendsenseai.service;

import com.spendsenseai.dto.ExpenseRequest;
import com.spendsenseai.dto.ExpenseResponse;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {
    ExpenseResponse addExpense(Long userId, ExpenseRequest request);
    ExpenseResponse updateExpense(Long userId, Long expenseId, ExpenseRequest request);
    void deleteExpense(Long userId, Long expenseId);
    ExpenseResponse getExpenseById(Long userId, Long expenseId);
    List<ExpenseResponse> getAllExpenses(Long userId);
    List<ExpenseResponse> filterByCategory(Long userId, String category);
    List<ExpenseResponse> filterByDate(Long userId, LocalDate startDate, LocalDate endDate);
    List<ExpenseResponse> searchExpenses(Long userId, String query);
    Double getMonthlyExpense(Long userId, int year, int month);
    Double getTotalExpense(Long userId);
}
