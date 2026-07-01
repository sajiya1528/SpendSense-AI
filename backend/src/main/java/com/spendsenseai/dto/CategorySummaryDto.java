package com.spendsenseai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategorySummaryDto {
    private String category;
    private Double totalAmount;
    private Double percentage;
}
