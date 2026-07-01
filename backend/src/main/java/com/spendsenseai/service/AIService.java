package com.spendsenseai.service;

import com.spendsenseai.dto.AIRequest;
import com.spendsenseai.dto.AIResponse;

public interface AIService {
    AIResponse analyze(Long userId, AIRequest request);
    AIResponse categorize(Long userId, AIRequest request);
    AIResponse budget(Long userId, AIRequest request);
    AIResponse summary(Long userId, AIRequest request);
}
