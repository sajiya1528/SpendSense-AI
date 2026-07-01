package com.spendsenseai.service.impl;

import com.spendsenseai.dto.CategorySummaryDto;
import com.spendsenseai.dto.DashboardResponse;
import com.spendsenseai.dto.TransactionDto;
import com.spendsenseai.entity.Expense;
import com.spendsenseai.entity.Income;
import com.spendsenseai.repository.ExpenseRepository;
import com.spendsenseai.repository.IncomeRepository;
import com.spendsenseai.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;

    @Autowired
    public DashboardServiceImpl(ExpenseRepository expenseRepository, IncomeRepository incomeRepository) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboardData(Long userId) {
        // 1. Calculate Totals
        Double totalIncome = incomeRepository.sumAmountByUserId(userId);
        Double totalExpense = expenseRepository.sumAmountByUserId(userId);
        Double currentBalance = totalIncome - totalExpense;

        // 2. Calculate Current Month's Income and Expense
        LocalDate today = LocalDate.now();
        YearMonth currentYearMonth = YearMonth.from(today);
        LocalDate startOfMonth = currentYearMonth.atDay(1);
        LocalDate endOfMonth = currentYearMonth.atEndOfMonth();

        Double monthlyIncome = incomeRepository.sumAmountByUserIdAndIncomeDateBetween(userId, startOfMonth, endOfMonth);
        Double monthlyExpense = expenseRepository.sumAmountByUserIdAndExpenseDateBetween(userId, startOfMonth, endOfMonth);

        // 3. Fetch recent transactions (Combine recent incomes and expenses, sorted by date)
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDesc(userId);
        List<Income> incomes = incomeRepository.findByUserIdOrderByIncomeDateDesc(userId);

        List<TransactionDto> transactions = new ArrayList<>();

        for (Expense e : expenses) {
            transactions.add(TransactionDto.builder()
                    .id(e.getId())
                    .type("EXPENSE")
                    .title(e.getTitle())
                    .amount(e.getAmount())
                    .date(e.getExpenseDate())
                    .categoryOrSource(e.getCategory())
                    .build());
        }

        for (Income i : incomes) {
            transactions.add(TransactionDto.builder()
                    .id(i.getId())
                    .type("INCOME")
                    .title(i.getTitle())
                    .amount(i.getAmount())
                    .date(i.getIncomeDate())
                    .categoryOrSource(i.getSource())
                    .build());
        }

        // Sort by date descending and take top 10
        List<TransactionDto> recentTransactions = transactions.stream()
                .sorted(Comparator.comparing(TransactionDto::getDate).reversed())
                .limit(10)
                .collect(Collectors.toList());

        // 4. Calculate Category Summary
        List<Object[]> categorySums = expenseRepository.getCategorySummariesByUserId(userId);
        List<CategorySummaryDto> categorySummaryList = new ArrayList<>();

        final Double finalTotalExpense = totalExpense;
        for (Object[] row : categorySums) {
            String category = (String) row[0];
            Double sum = (Double) row[1];
            Double percentage = 0.0;
            if (finalTotalExpense > 0) {
                percentage = (sum / finalTotalExpense) * 100.0;
                // Round to 2 decimal places
                percentage = Math.round(percentage * 100.0) / 100.0;
            }
            categorySummaryList.add(new CategorySummaryDto(category, sum, percentage));
        }

        return DashboardResponse.builder()
                .currentBalance(currentBalance)
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .monthlyIncome(monthlyIncome)
                .monthlyExpense(monthlyExpense)
                .recentTransactions(recentTransactions)
                .expenseCategorySummary(categorySummaryList)
                .build();
    }
}
