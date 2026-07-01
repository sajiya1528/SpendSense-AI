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
public class AIResponse {
    private String responseText;
    private String suggestedAction;
    private List<String> budgetRecommendations;
}
