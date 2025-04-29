import api from './apiInterceptor';

export const accountService = {
  getAccounts: async (limit = 20, offset = 0) => {
    const response = await api.get('/accounts', { params: { limit, offset } });
    return response.data;
  },

  getAccount: async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  createAccount: async (accountData) => {
    const response = await api.post('/accounts', accountData);
    return response.data;
  },

  updateAccount: async (id, accountData) => {
    const response = await api.put(`/accounts/${id}`, accountData);
    return response.data;
  },

  deleteAccount: async (id) => {
    await api.delete(`/accounts/${id}`);
    return true;
  }
};

export default accountService; 