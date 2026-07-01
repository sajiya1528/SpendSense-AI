package com.spendsenseai.service.impl;

import com.spendsenseai.dto.IncomeRequest;
import com.spendsenseai.dto.IncomeResponse;
import com.spendsenseai.entity.Income;
import com.spendsenseai.entity.User;
import com.spendsenseai.exception.ResourceNotFoundException;
import com.spendsenseai.exception.UnauthorizedException;
import com.spendsenseai.mapper.IncomeMapper;
import com.spendsenseai.repository.IncomeRepository;
import com.spendsenseai.service.IncomeService;
import com.spendsenseai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserService userService;

    @Autowired
    public IncomeServiceImpl(IncomeRepository incomeRepository, UserService userService) {
        this.incomeRepository = incomeRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public IncomeResponse addIncome(Long userId, IncomeRequest request) {
        User user = userService.getUserById(userId);
        Income income = IncomeMapper.toEntity(request, user);
        Income savedIncome = incomeRepository.save(income);
        return IncomeMapper.toResponse(savedIncome);
    }

    @Override
    @Transactional
    public IncomeResponse updateIncome(Long userId, Long incomeId, IncomeRequest request) {
        Income income = getIncomeEntityAndVerifyOwner(userId, incomeId);
        income.setTitle(request.getTitle());
        income.setAmount(request.getAmount());
        income.setSource(request.getSource());
        income.setDescription(request.getDescription());
        income.setIncomeDate(request.getIncomeDate());

        Income updatedIncome = incomeRepository.save(income);
        return IncomeMapper.toResponse(updatedIncome);
    }

    @Override
    @Transactional
    public void deleteIncome(Long userId, Long incomeId) {
        Income income = getIncomeEntityAndVerifyOwner(userId, incomeId);
        incomeRepository.delete(income);
    }

    @Override
    @Transactional(readOnly = true)
    public IncomeResponse getIncomeById(Long userId, Long incomeId) {
        Income income = getIncomeEntityAndVerifyOwner(userId, incomeId);
        return IncomeMapper.toResponse(income);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncomeResponse> getAllIncome(Long userId) {
        return incomeRepository.findByUserIdOrderByIncomeDateDesc(userId).stream()
                .map(IncomeMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncomeResponse> searchIncome(Long userId, String query) {
        return incomeRepository.findByUserIdAndTitleContainingIgnoreCaseOrderByIncomeDateDesc(userId, query).stream()
                .map(IncomeMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getMonthlyIncome(Long userId, int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();
        return incomeRepository.sumAmountByUserIdAndIncomeDateBetween(userId, start, end);
    }

    @Override
    @Transactional(readOnly = true)
    public Double getTotalIncome(Long userId) {
        return incomeRepository.sumAmountByUserId(userId);
    }

    private Income getIncomeEntityAndVerifyOwner(Long userId, Long incomeId) {
        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new ResourceNotFoundException("Income not found with id: " + incomeId));
        if (!income.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You do not have permission to access this income.");
        }
        return income;
    }
}
