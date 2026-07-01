import api from './api';

export const reportService = {
  getMonthly: (month, year) => api.get('/reports/monthly', { params: { month, year } }),
  getYearly: (year) => api.get('/reports/yearly', { params: { year } }),
  exportPDF: (params) => api.get('/reports/export/pdf', { params, responseType: 'blob' }),
  exportExcel: (params) => api.get('/reports/export/excel', { params, responseType: 'blob' }),
  exportCSV: (params) => api.get('/reports/export/csv', { params, responseType: 'blob' }),
};

export default reportService;
