import api from './api';

export const transactionService = {
  getAll: (params) => api.get('/transactions', { params }),
  getById: (id) => api.get(`/transactions/${id}`),
  getRecent: (limit = 5) => api.get('/transactions/recent', { params: { limit } }),
  search: (query) => api.get('/transactions/search', { params: { q: query } }),
};

export default transactionService;
