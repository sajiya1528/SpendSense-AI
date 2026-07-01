package com.spendsenseai.service.impl;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.spendsenseai.entity.Expense;
import com.spendsenseai.entity.Income;
import com.spendsenseai.entity.User;
import com.spendsenseai.repository.ExpenseRepository;
import com.spendsenseai.repository.IncomeRepository;
import com.spendsenseai.service.ReportService;
import com.spendsenseai.service.UserService;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final UserService userService;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    public ReportServiceImpl(ExpenseRepository expenseRepository, IncomeRepository incomeRepository, UserService userService) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generatePdfReport(Long userId) {
        User user = userService.getUserById(userId);
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDesc(userId);
        List<Income> incomes = incomeRepository.findByUserIdOrderByIncomeDateDesc(userId);

        Double totalIncome = incomeRepository.sumAmountByUserId(userId);
        Double totalExpense = expenseRepository.sumAmountByUserId(userId);
        Double balance = totalIncome - totalExpense;

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            // Set up fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, Color.DARK_GRAY);
            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.GRAY);
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Color.BLACK);
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.BLACK);

            // Document Header
            Paragraph title = new Paragraph("SpendSense AI Financial Statement", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Paragraph info = new Paragraph("Generated for: " + user.getFullName() + " (" + user.getEmail() + ")\nDate: " + LocalDate.now().format(DATE_FORMATTER), subtitleFont);
            info.setAlignment(Element.ALIGN_CENTER);
            info.setSpacingAfter(20);
            document.add(info);

            // Summary Cards
            PdfPTable summaryTable = new PdfPTable(3);
            summaryTable.setWidthPercentage(100);
            summaryTable.setSpacingAfter(20);

            summaryTable.addCell(createSummaryCell("Total Income", "$" + String.format("%.2f", totalIncome), new Color(40, 167, 69)));
            summaryTable.addCell(createSummaryCell("Total Expenses", "$" + String.format("%.2f", totalExpense), new Color(220, 53, 69)));
            summaryTable.addCell(createSummaryCell("Current Balance", "$" + String.format("%.2f", balance), new Color(0, 123, 255)));
            document.add(summaryTable);

            // Income Section
            Paragraph incomeHeader = new Paragraph("Income Transactions", sectionFont);
            incomeHeader.setSpacingAfter(10);
            document.add(incomeHeader);

            PdfPTable incomeTable = new PdfPTable(4);
            incomeTable.setWidthPercentage(100);
            incomeTable.setWidths(new float[]{2f, 4f, 2f, 2f});
            incomeTable.setSpacingAfter(20);

            addTableHeader(incomeTable, headerFont, new String[]{"Date", "Title / Source", "Amount", "Description"});

            for (Income inc : incomes) {
                incomeTable.addCell(new Phrase(inc.getIncomeDate().format(DATE_FORMATTER), normalFont));
                incomeTable.addCell(new Phrase(inc.getTitle() + " (" + inc.getSource() + ")", normalFont));
                incomeTable.addCell(new Phrase("$" + String.format("%.2f", inc.getAmount()), normalFont));
                incomeTable.addCell(new Phrase(inc.getDescription() != null ? inc.getDescription() : "-", normalFont));
            }
            document.add(incomeTable);

            // Expense Section
            Paragraph expenseHeader = new Paragraph("Expense Transactions", sectionFont);
            expenseHeader.setSpacingAfter(10);
            document.add(expenseHeader);

            PdfPTable expenseTable = new PdfPTable(4);
            expenseTable.setWidthPercentage(100);
            expenseTable.setWidths(new float[]{2f, 4f, 2f, 2f});
            expenseTable.setSpacingAfter(20);

            addTableHeader(expenseTable, headerFont, new String[]{"Date", "Title / Category", "Amount", "Description"});

            for (Expense exp : expenses) {
                expenseTable.addCell(new Phrase(exp.getExpenseDate().format(DATE_FORMATTER), normalFont));
                expenseTable.addCell(new Phrase(exp.getTitle() + " (" + exp.getCategory() + ")", normalFont));
                expenseTable.addCell(new Phrase("$" + String.format("%.2f", exp.getAmount()), normalFont));
                expenseTable.addCell(new Phrase(exp.getDescription() != null ? exp.getDescription() : "-", normalFont));
            }
            document.add(expenseTable);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }

    private PdfPCell createSummaryCell(String title, String value, Color color) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(color);
        cell.setPadding(10);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);

        Font valFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Color.WHITE);
        Font labelFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.WHITE);

        Paragraph pValue = new Paragraph(value, valFont);
        pValue.setAlignment(Element.ALIGN_CENTER);
        Paragraph pLabel = new Paragraph(title, labelFont);
        pLabel.setAlignment(Element.ALIGN_CENTER);

        cell.addElement(pValue);
        cell.addElement(pLabel);
        return cell;
    }

    private void addTableHeader(PdfPTable table, Font headerFont, String[] headers) {
        for (String title : headers) {
            PdfPCell header = new PdfPCell();
            header.setBackgroundColor(new Color(52, 58, 64)); // Dark slate
            header.setBorderWidth(1);
            header.setPadding(6);
            header.setPhrase(new Phrase(title, headerFont));
            table.addCell(header);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generateExcelReport(Long userId) {
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDesc(userId);
        List<Income> incomes = incomeRepository.findByUserIdOrderByIncomeDateDesc(userId);

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            // Style setup
            org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(org.apache.poi.ss.usermodel.IndexedColors.WHITE.getIndex());

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(org.apache.poi.ss.usermodel.IndexedColors.GREY_80_PERCENT.getIndex());
            headerStyle.setFillPattern(org.apache.poi.ss.usermodel.FillPatternType.SOLID_FOREGROUND);

            // Income Sheet
            Sheet incomeSheet = workbook.createSheet("Incomes");
            Row incomeHeader = incomeSheet.createRow(0);
            String[] incHeaders = {"Date", "Title", "Source", "Amount", "Description"};
            for (int i = 0; i < incHeaders.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = incomeHeader.createCell(i);
                cell.setCellValue(incHeaders[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx = 1;
            for (Income inc : incomes) {
                Row row = incomeSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(inc.getIncomeDate().format(DATE_FORMATTER));
                row.createCell(1).setCellValue(inc.getTitle());
                row.createCell(2).setCellValue(inc.getSource());
                row.createCell(3).setCellValue(inc.getAmount());
                row.createCell(4).setCellValue(inc.getDescription() != null ? inc.getDescription() : "");
            }
            for (int i = 0; i < incHeaders.length; i++) {
                incomeSheet.autoSizeColumn(i);
            }

            // Expense Sheet
            Sheet expenseSheet = workbook.createSheet("Expenses");
            Row expenseHeader = expenseSheet.createRow(0);
            String[] expHeaders = {"Date", "Title", "Category", "Amount", "Description"};
            for (int i = 0; i < expHeaders.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = expenseHeader.createCell(i);
                cell.setCellValue(expHeaders[i]);
                cell.setCellStyle(headerStyle);
            }

            rowIdx = 1;
            for (Expense exp : expenses) {
                Row row = expenseSheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(exp.getExpenseDate().format(DATE_FORMATTER));
                row.createCell(1).setCellValue(exp.getTitle());
                row.createCell(2).setCellValue(exp.getCategory());
                row.createCell(3).setCellValue(exp.getAmount());
                row.createCell(4).setCellValue(exp.getDescription() != null ? exp.getDescription() : "");
            }
            for (int i = 0; i < expHeaders.length; i++) {
                expenseSheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate Excel report", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generateCsvReport(Long userId) {
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDesc(userId);
        List<Income> incomes = incomeRepository.findByUserIdOrderByIncomeDateDesc(userId);

        StringBuilder csv = new StringBuilder();
        // CSV Headers
        csv.append("Type,Date,Title,Category/Source,Amount,Description\n");

        // Write Incomes
        for (Income inc : incomes) {
            csv.append("INCOME,")
               .append(inc.getIncomeDate().format(DATE_FORMATTER)).append(",")
               .append(escapeCsv(inc.getTitle())).append(",")
               .append(escapeCsv(inc.getSource())).append(",")
               .append(inc.getAmount()).append(",")
               .append(escapeCsv(inc.getDescription())).append("\n");
        }

        // Write Expenses
        for (Expense exp : expenses) {
            csv.append("EXPENSE,")
               .append(exp.getExpenseDate().format(DATE_FORMATTER)).append(",")
               .append(escapeCsv(exp.getTitle())).append(",")
               .append(escapeCsv(exp.getCategory())).append(",")
               .append(exp.getAmount()).append(",")
               .append(escapeCsv(exp.getDescription())).append("\n");
        }

        return csv.toString().getBytes();
    }

    private String escapeCsv(String val) {
        if (val == null) {
            return "";
        }
        if (val.contains(",") || val.contains("\"") || val.contains("\n") || val.contains("\r")) {
            val = val.replace("\"", "\"\"");
            return "\"" + val + "\"";
        }
        return val;
    }
}
