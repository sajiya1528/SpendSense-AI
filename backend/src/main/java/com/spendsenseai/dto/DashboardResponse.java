package com.spendsenseai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private Double currentBalance;
    private Double totalIncome;
    private Double totalExpense;
    private Double monthlyIncome;
    private Double monthlyExpense;
    private List<TransactionDto> recentTransactions;
    private List<CategorySummaryDto> expenseCategorySummary;
}
