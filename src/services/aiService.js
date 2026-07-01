import api from './api';

export const aiService = {
  getInsights: () => api.get('/ai/insights'),
  getBudgetSuggestions: () => api.get('/ai/budget-suggestions'),
  getExpenseAnalysis: () => api.get('/ai/expense-analysis'),
  getSavingTips: () => api.get('/ai/saving-tips'),
  getMonthlySummary: () => api.get('/ai/monthly-summary'),
};

export default aiService;
