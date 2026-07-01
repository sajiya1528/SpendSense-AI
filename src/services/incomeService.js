import api from './api';

export const incomeService = {
  getAll: (params) => api.get('/income', { params }),
  getById: (id) => api.get(`/income/${id}`),
  create: (data) => api.post('/income', data),
  update: (id, data) => api.put(`/income/${id}`, data),
  delete: (id) => api.delete(`/income/${id}`),
  getBySource: (source) => api.get(`/income/source/${source}`),
  getMonthly: (month, year) => api.get('/income/monthly', { params: { month, year } }),
};

export default incomeService;
