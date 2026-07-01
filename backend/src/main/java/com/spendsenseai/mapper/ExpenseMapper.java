package com.spendsenseai.mapper;

import com.spendsenseai.dto.ExpenseRequest;
import com.spendsenseai.dto.ExpenseResponse;
import com.spendsenseai.entity.Expense;
import com.spendsenseai.entity.User;

public class ExpenseMapper {

    public static Expense toEntity(ExpenseRequest request, User user) {
        if (request == null) {
            return null;
        }
        return Expense.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .category(request.getCategory())
                .description(request.getDescription())
                .expenseDate(request.getExpenseDate())
                .user(user)
                .build();
    }

    public static ExpenseResponse toResponse(Expense expense) {
        if (expense == null) {
            return null;
        }
        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .description(expense.getDescription())
                .expenseDate(expense.getExpenseDate())
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .userId(expense.getUser() != null ? expense.getUser().getId() : null)
                .build();
    }
}
