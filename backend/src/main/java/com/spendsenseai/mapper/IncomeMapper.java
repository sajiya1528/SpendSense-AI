package com.spendsenseai.mapper;

import com.spendsenseai.dto.IncomeRequest;
import com.spendsenseai.dto.IncomeResponse;
import com.spendsenseai.entity.Income;
import com.spendsenseai.entity.User;

public class IncomeMapper {

    public static Income toEntity(IncomeRequest request, User user) {
        if (request == null) {
            return null;
        }
        return Income.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .source(request.getSource())
                .description(request.getDescription())
                .incomeDate(request.getIncomeDate())
                .user(user)
                .build();
    }

    public static IncomeResponse toResponse(Income income) {
        if (income == null) {
            return null;
        }
        return IncomeResponse.builder()
                .id(income.getId())
                .title(income.getTitle())
                .amount(income.getAmount())
                .source(income.getSource())
                .description(income.getDescription())
                .incomeDate(income.getIncomeDate())
                .createdAt(income.getCreatedAt())
                .updatedAt(income.getUpdatedAt())
                .userId(income.getUser() != null ? income.getUser().getId() : null)
                .build();
    }
}
