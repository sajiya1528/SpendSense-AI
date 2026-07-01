package com.spendsenseai.controller;

import com.spendsenseai.dto.DashboardResponse;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Dashboard & Analytics", description = "Endpoints for fetching unified financial metrics, recent transactions, and category allocations")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    @Operation(summary = "Get aggregated dashboard statistics for the logged-in user")
    public ResponseEntity<DashboardResponse> getDashboardData(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        DashboardResponse response = dashboardService.getDashboardData(userDetails.getId());
        return ResponseEntity.ok(response);
    }
}
