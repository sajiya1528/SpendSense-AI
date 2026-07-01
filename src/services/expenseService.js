import api from './api';

export const expenseService = {
  getAll: (params) => api.get('/expenses', { params }),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  getByCategory: (category) => api.get(`/expenses/category/${category}`),
  getMonthly: (month, year) => api.get('/expenses/monthly', { params: { month, year } }),
};

export default expenseService;
