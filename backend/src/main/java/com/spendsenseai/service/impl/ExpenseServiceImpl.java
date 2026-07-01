package com.spendsenseai.service.impl;

import com.spendsenseai.dto.ExpenseRequest;
import com.spendsenseai.dto.ExpenseResponse;
import com.spendsenseai.entity.Expense;
import com.spendsenseai.entity.User;
import com.spendsenseai.exception.ResourceNotFoundException;
import com.spendsenseai.exception.UnauthorizedException;
import com.spendsenseai.mapper.ExpenseMapper;
import com.spendsenseai.repository.ExpenseRepository;
import com.spendsenseai.service.ExpenseService;
import com.spendsenseai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository, UserService userService) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public ExpenseResponse addExpense(Long userId, ExpenseRequest request) {
        User user = userService.getUserById(userId);
        Expense expense = ExpenseMapper.toEntity(request, user);
        Expense savedExpense = expenseRepository.save(expense);
        return ExpenseMapper.toResponse(savedExpense);
    }

    @Override
    @Transactional
    public ExpenseResponse updateExpense(Long userId, Long expenseId, ExpenseRequest request) {
        Expense expense = getExpenseEntityAndVerifyOwner(userId, expenseId);
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setExpenseDate(request.getExpenseDate());

        Expense updatedExpense = expenseRepository.save(expense);
        return ExpenseMapper.toResponse(updatedExpense);
    }

    @Override
    @Transactional
    public void deleteExpense(Long userId, Long expenseId) {
        Expense expense = getExpenseEntityAndVerifyOwner(userId, expenseId);
        expenseRepository.delete(expense);
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponse getExpenseById(Long userId, Long expenseId) {
        Expense expense = getExpenseEntityAndVerifyOwner(userId, expenseId);
        return ExpenseMapper.toResponse(expense);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> getAllExpenses(Long userId) {
        return expenseRepository.findByUserIdOrderByExpenseDateDesc(userId).stream()
                .map(ExpenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> filterByCategory(Long userId, String category) {
        return expenseRepository.findByUserIdAndCategoryOrderByExpenseDateDesc(userId, category).stream()
                .map(ExpenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> filterByDate(Long userId, LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByUserIdAndExpenseDateBetweenOrderByExpenseDateDesc(userId, startDate, endDate).stream()
                .map(ExpenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> searchExpenses(Long userId, String query) {
        return expenseRepository.findByUserIdAndTitleContainingIgnoreCaseOrderByExpenseDateDesc(userId, query).stream()
                .map(ExpenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getMonthlyExpense(Long userId, int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();
        return expenseRepository.sumAmountByUserIdAndExpenseDateBetween(userId, start, end);
    }

    @Override
    @Transactional(readOnly = true)
    public Double getTotalExpense(Long userId) {
        return expenseRepository.sumAmountByUserId(userId);
    }

    private Expense getExpenseEntityAndVerifyOwner(Long userId, Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));
        if (!expense.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You do not have permission to access this expense.");
        }
        return expense;
    }
}
