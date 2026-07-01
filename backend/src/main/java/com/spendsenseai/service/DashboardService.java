package com.spendsenseai.service;

import com.spendsenseai.dto.DashboardResponse;

public interface DashboardService {
    DashboardResponse getDashboardData(Long userId);
}
