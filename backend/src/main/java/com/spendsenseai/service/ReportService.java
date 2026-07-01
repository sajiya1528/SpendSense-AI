package com.spendsenseai.service;

public interface ReportService {
    byte[] generatePdfReport(Long userId);
    byte[] generateExcelReport(Long userId);
    byte[] generateCsvReport(Long userId);
}
