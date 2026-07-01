package com.spendsenseai.controller;

import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Report Generation", description = "Endpoints for downloading financial statements in PDF, Excel, and CSV formats")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/pdf")
    @Operation(summary = "Download financial statement as a PDF document")
    public ResponseEntity<byte[]> downloadPdfReport(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        byte[] pdfContent = reportService.generatePdfReport(userDetails.getId());
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=spendsense_report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContent);
    }

    @GetMapping("/excel")
    @Operation(summary = "Download income and expense transaction sheets in Excel format")
    public ResponseEntity<byte[]> downloadExcelReport(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        byte[] excelContent = reportService.generateExcelReport(userDetails.getId());
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=spendsense_report.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelContent);
    }

    @GetMapping("/csv")
    @Operation(summary = "Download a raw comma-separated CSV log of all transactions")
    public ResponseEntity<byte[]> downloadCsvReport(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        byte[] csvContent = reportService.generateCsvReport(userDetails.getId());
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=spendsense_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvContent);
    }
}
