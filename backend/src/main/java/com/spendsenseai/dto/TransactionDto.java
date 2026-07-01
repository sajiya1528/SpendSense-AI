package com.spendsenseai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDto {
    private Long id;
    private String type; // "INCOME" or "EXPENSE"
    private String title;
    private Double amount;
    private LocalDate date;
    private String categoryOrSource;
}
