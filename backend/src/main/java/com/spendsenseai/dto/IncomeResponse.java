package com.spendsenseai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncomeResponse {
    private Long id;
    private String title;
    private Double amount;
    private String source;
    private String description;
    private LocalDate incomeDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;
}
