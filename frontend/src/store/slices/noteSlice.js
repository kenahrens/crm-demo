import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiInterceptor';

const API_URL = '/notes';

// Async thunks
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes');
    }
  }
);

export const fetchNote = createAsyncThunk(
  'notes/fetchNote',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch note');
    }
  }
);

export const fetchNotesByRecordId = createAsyncThunk(
  'notes/fetchNotesByRecordId',
  async ({ recordId, recordType }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/record/${recordType}/${recordId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch notes for ${recordType}`);
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, noteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create note');
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, ...noteData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, noteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update note');
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete note');
    }
  }
);

export const addNoteAssociation = createAsyncThunk(
  'notes/addNoteAssociation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/associations`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add note association');
    }
  }
);

export const removeNoteAssociation = createAsyncThunk(
  'notes/removeNoteAssociation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/associations`, { data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove note association');
    }
  }
);

const initialState = {
  notes: [],
  currentNote: null,
  relatedNotes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearNoteError: (state) => {
      state.error = null;
    },
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
    clearRelatedNotes: (state) => {
      state.relatedNotes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchNotes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure notes is always an array - handle both direct array response and nested response
        if (Array.isArray(action.payload)) {
          state.notes = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          state.notes = action.payload.data;
        } else if (action.payload && typeof action.payload === 'object') {
          // If it's an object but not in expected format, try to extract data
          state.notes = Array.isArray(Object.values(action.payload)[0]) 
            ? Object.values(action.payload)[0] 
            : [];
        } else {
          state.notes = [];
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchNote
      .addCase(fetchNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchNotesByRecordId
      .addCase(fetchNotesByRecordId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotesByRecordId.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        if (Array.isArray(action.payload)) {
          state.relatedNotes = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          state.relatedNotes = action.payload.data;
        } else if (action.payload && typeof action.payload === 'object') {
          state.relatedNotes = Array.isArray(Object.values(action.payload)[0]) 
            ? Object.values(action.payload)[0] 
            : [];
        } else {
          state.relatedNotes = [];
        }
      })
      .addCase(fetchNotesByRecordId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.relatedNotes = [];
      })
      // createNote
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.currentNote = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateNote
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        );
        state.currentNote = action.payload;
        // Also update in related notes if present
        state.relatedNotes = state.relatedNotes.map(note =>
          note.id === action.payload.id ? action.payload : note
        );
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteNote
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.relatedNotes = state.relatedNotes.filter(note => note.id !== action.payload);
        if (state.currentNote && state.currentNote.id === action.payload) {
          state.currentNote = null;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addNoteAssociation
      .addCase(addNoteAssociation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNoteAssociation.fulfilled, (state, action) => {
        state.loading = false;
        // Refresh current note if it's affected
        if (state.currentNote && state.currentNote.id === action.payload.note_id) {
          // Add the new association to the records array
          if (!state.currentNote.records) {
            state.currentNote.records = [];
          }
          state.currentNote.records.push({
            record_id: action.payload.record_id,
            record_type: action.payload.record_type
          });
        }
      })
      .addCase(addNoteAssociation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // removeNoteAssociation
      .addCase(removeNoteAssociation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeNoteAssociation.fulfilled, (state, action) => {
        state.loading = false;
        // Refresh current note if it's affected
        if (state.currentNote && state.currentNote.id === action.payload.note_id) {
          // Remove the association from the records array
          if (state.currentNote.records) {
            state.currentNote.records = state.currentNote.records.filter(
              record => !(record.record_id === action.payload.record_id && 
                         record.record_type === action.payload.record_type)
            );
          }
        }
      })
      .addCase(removeNoteAssociation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNoteError, clearCurrentNote, clearRelatedNotes } = noteSlice.actions;
export default noteSlice.reducer; 