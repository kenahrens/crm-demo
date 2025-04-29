import api from './apiInterceptor';

export const contactService = {
  getContacts: async (limit = 20, offset = 0) => {
    const response = await api.get('/contacts', { params: { limit, offset } });
    return response.data;
  },

  getContact: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  createContact: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  updateContact: async (id, contactData) => {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id) => {
    await api.delete(`/contacts/${id}`);
    return true;
  }
};

export default contactService; 