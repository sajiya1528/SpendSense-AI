package com.spendsenseai.service.impl;

import com.spendsenseai.dto.AIRequest;
import com.spendsenseai.dto.AIResponse;
import com.spendsenseai.dto.CategorySummaryDto;
import com.spendsenseai.dto.DashboardResponse;
import com.spendsenseai.service.AIService;
import com.spendsenseai.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIServiceImpl implements AIService {

    private final DashboardService dashboardService;

    @Autowired
    public AIServiceImpl(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Override
    public AIResponse analyze(Long userId, AIRequest request) {
        DashboardResponse stats = dashboardService.getDashboardData(userId);
        
        StringBuilder analysisText = new StringBuilder();
        List<String> recommendations = new ArrayList<>();
        String suggestedAction = "Review monthly subscription expenses";

        analysisText.append("SpendSense AI Analysis: \n");
        analysisText.append(String.format("Based on your financial tracking, you have registered a total income of $%.2f and total expenses of $%.2f. ", stats.getTotalIncome(), stats.getTotalExpense()));

        if (stats.getCurrentBalance() < 0) {
            analysisText.append("WARNING: You are currently spending more than your total income! Your balance is in a deficit of $").append(String.format("%.2f", Math.abs(stats.getCurrentBalance()))).append(". ");
            recommendations.add("Cut back on non-essential expenditures immediately to restore a positive balance.");
            suggestedAction = "Freeze discretionary spending";
        } else {
            analysisText.append("Good job! You are maintaining a positive balance of $").append(String.format("%.2f", stats.getCurrentBalance())).append(". ");
            recommendations.add("Consider automating 10% of your remaining balance into a high-yield savings account.");
        }

        if (!stats.getExpenseCategorySummary().isEmpty()) {
            CategorySummaryDto topCategory = stats.getExpenseCategorySummary().get(0);
            analysisText.append(String.format("Your highest spending category is '%s' comprising $%.2f (%.1f%% of total expenses).", 
                    topCategory.getCategory(), topCategory.getTotalAmount(), topCategory.getPercentage()));
            recommendations.add(String.format("Try to cap your spending on '%s' to reduce overall expense load.", topCategory.getCategory()));
        }

        return AIResponse.builder()
                .responseText(analysisText.toString())
                .suggestedAction(suggestedAction)
                .budgetRecommendations(recommendations)
                .build();
    }

    @Override
    public AIResponse categorize(Long userId, AIRequest request) {
        String inputPrompt = request.getPrompt() != null ? request.getPrompt().toLowerCase() : "";
        String category = "Miscellaneous";
        String confidence = "85%";

        if (inputPrompt.contains("uber") || inputPrompt.contains("lyft") || inputPrompt.contains("gas") || inputPrompt.contains("taxi") || inputPrompt.contains("train")) {
            category = "Transportation";
        } else if (inputPrompt.contains("mcdonald") || inputPrompt.contains("restaurant") || inputPrompt.contains("grocery") || inputPrompt.contains("food") || inputPrompt.contains("coffee") || inputPrompt.contains("starbucks")) {
            category = "Food & Dining";
        } else if (inputPrompt.contains("netflix") || inputPrompt.contains("spotify") || inputPrompt.contains("movie") || inputPrompt.contains("game")) {
            category = "Entertainment";
        } else if (inputPrompt.contains("rent") || inputPrompt.contains("electricity") || inputPrompt.contains("water") || inputPrompt.contains("internet") || inputPrompt.contains("gas bill")) {
            category = "Utilities & Rent";
        } else if (inputPrompt.contains("hospital") || inputPrompt.contains("medicine") || inputPrompt.contains("pharmacy") || inputPrompt.contains("doctor")) {
            category = "Healthcare";
        } else if (inputPrompt.contains("salary") || inputPrompt.contains("freelance") || inputPrompt.contains("dividend")) {
            category = "Income Source";
        }

        List<String> recommendations = new ArrayList<>();
        recommendations.add(String.format("Suggested Category: %s (Confidence: %s)", category, confidence));

        return AIResponse.builder()
                .responseText(String.format("SpendSense AI auto-categorization engine parsed: '%s' and assigned it to '%s'.", request.getPrompt(), category))
                .suggestedAction("Assign to category: " + category)
                .budgetRecommendations(recommendations)
                .build();
    }

    @Override
    public AIResponse budget(Long userId, AIRequest request) {
        DashboardResponse stats = dashboardService.getDashboardData(userId);
        List<String> recommendations = new ArrayList<>();
        
        double bufferLimit = stats.getTotalIncome() * 0.20; // 20% savings rule
        recommendations.add("Rule of Thumb: Apply the 50/30/20 budget framework (50% Needs, 30% Wants, 20% Savings).");
        recommendations.add(String.format("Based on your total income, your targeted monthly savings (20%%) is $%.2f.", bufferLimit));

        for (CategorySummaryDto category : stats.getExpenseCategorySummary()) {
            if (category.getPercentage() > 25.0) {
                recommendations.add(String.format("Alert: Your spending in '%s' is %.1f%% of your total budget. Consider setting a monthly limit of $%.2f.", 
                        category.getCategory(), category.getPercentage(), category.getTotalAmount() * 0.8));
            }
        }

        return AIResponse.builder()
                .responseText("SpendSense AI Budgeting Recommendations: \nAnalyzing your historical patterns to optimize savings allocation.")
                .suggestedAction("Establish a monthly category budget limit")
                .budgetRecommendations(recommendations)
                .build();
    }

    @Override
    public AIResponse summary(Long userId, AIRequest request) {
        DashboardResponse stats = dashboardService.getDashboardData(userId);
        
        String summaryText = String.format("SpendSense AI Financial Summary:\n" +
                "You have accumulated a savings margin of $%.2f this period.\n" +
                "Your average daily outflow runs at approx $%.2f. " +
                "You have a healthy transaction activity with %d distinct records.",
                stats.getCurrentBalance(),
                stats.getTotalExpense() / 30.0,
                stats.getRecentTransactions().size());

        List<String> recommendations = new ArrayList<>();
        recommendations.add("Excellent transparency. Keep recording regular expenses to sharpen AI prediction confidence.");

        return AIResponse.builder()
                .responseText(summaryText)
                .suggestedAction("Maintain logging habits")
                .budgetRecommendations(recommendations)
                .build();
    }
}
