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

const initialState = {
  notes: [],
  currentNote: null,
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
        if (state.currentNote && state.currentNote.id === action.payload) {
          state.currentNote = null;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNoteError, clearCurrentNote } = noteSlice.actions;
export default noteSlice.reducer; 