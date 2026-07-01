package com.spendsenseai.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Amount must be a positive value")
    private Double amount;

    @NotBlank(message = "Category is required")
    private String category;

    private String description;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;
}
