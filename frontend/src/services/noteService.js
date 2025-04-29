import api from './apiInterceptor';

export const noteService = {
  getNotes: async (limit = 20, offset = 0) => {
    const response = await api.get('/notes', { params: { limit, offset } });
    return response.data;
  },

  getNote: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  updateNote: async (id, noteData) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  deleteNote: async (id) => {
    await api.delete(`/notes/${id}`);
    return true;
  },

  // Additional methods for associating notes with records
  getNotesByRecord: async (recordType, recordId) => {
    const response = await api.get(`/notes/by-record`, { 
      params: { 
        record_type: recordType, 
        record_id: recordId 
      } 
    });
    return response.data;
  },

  associateNoteWithRecord: async (noteId, recordType, recordId) => {
    const response = await api.post(`/notes/${noteId}/associate`, {
      record_type: recordType,
      record_id: recordId
    });
    return response.data;
  },

  removeNoteAssociation: async (noteId, recordType, recordId) => {
    const response = await api.delete(`/notes/${noteId}/associate`, {
      data: {
        record_type: recordType,
        record_id: recordId
      }
    });
    return response.data;
  }
};

export default noteService; 