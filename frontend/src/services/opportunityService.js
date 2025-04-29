import api from './apiInterceptor';

export const opportunityService = {
  getOpportunities: async (limit = 20, offset = 0) => {
    const response = await api.get('/opportunities', { params: { limit, offset } });
    return response.data;
  },

  getOpportunity: async (id) => {
    const response = await api.get(`/opportunities/${id}`);
    return response.data;
  },

  createOpportunity: async (opportunityData) => {
    const response = await api.post('/opportunities', opportunityData);
    return response.data;
  },

  updateOpportunity: async (id, opportunityData) => {
    const response = await api.put(`/opportunities/${id}`, opportunityData);
    return response.data;
  },

  deleteOpportunity: async (id) => {
    await api.delete(`/opportunities/${id}`);
    return true;
  }
};

export default opportunityService; 