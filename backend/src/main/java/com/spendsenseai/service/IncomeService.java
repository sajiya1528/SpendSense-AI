package com.spendsenseai.service;

import com.spendsenseai.dto.IncomeRequest;
import com.spendsenseai.dto.IncomeResponse;

import java.util.List;

public interface IncomeService {
    IncomeResponse addIncome(Long userId, IncomeRequest request);
    IncomeResponse updateIncome(Long userId, Long incomeId, IncomeRequest request);
    void deleteIncome(Long userId, Long incomeId);
    IncomeResponse getIncomeById(Long userId, Long incomeId);
    List<IncomeResponse> getAllIncome(Long userId);
    List<IncomeResponse> searchIncome(Long userId, String query);
    Double getMonthlyIncome(Long userId, int year, int month);
    Double getTotalIncome(Long userId);
}
