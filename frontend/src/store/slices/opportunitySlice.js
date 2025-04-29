import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiInterceptor';

const API_URL = '/opportunities';

// Async thunks
export const fetchOpportunities = createAsyncThunk(
  'opportunities/fetchOpportunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch opportunities');
    }
  }
);

export const fetchOpportunity = createAsyncThunk(
  'opportunities/fetchOpportunity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch opportunity');
    }
  }
);

export const createOpportunity = createAsyncThunk(
  'opportunities/createOpportunity',
  async (opportunityData, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, opportunityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create opportunity');
    }
  }
);

export const updateOpportunity = createAsyncThunk(
  'opportunities/updateOpportunity',
  async ({ id, ...opportunityData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, opportunityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update opportunity');
    }
  }
);

export const deleteOpportunity = createAsyncThunk(
  'opportunities/deleteOpportunity',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete opportunity');
    }
  }
);

const initialState = {
  opportunities: [],
  currentOpportunity: null,
  loading: false,
  error: null,
};

const opportunitySlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    clearOpportunityError: (state) => {
      state.error = null;
    },
    clearCurrentOpportunity: (state) => {
      state.currentOpportunity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOpportunities
      .addCase(fetchOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure opportunities is always an array - handle both direct array response and nested response
        if (Array.isArray(action.payload)) {
          state.opportunities = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          state.opportunities = action.payload.data;
        } else if (action.payload && typeof action.payload === 'object') {
          // If it's an object but not in expected format, try to extract data
          state.opportunities = Array.isArray(Object.values(action.payload)[0]) 
            ? Object.values(action.payload)[0] 
            : [];
        } else {
          state.opportunities = [];
        }
      })
      .addCase(fetchOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchOpportunity
      .addCase(fetchOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOpportunity = action.payload;
      })
      .addCase(fetchOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createOpportunity
      .addCase(createOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.opportunities.push(action.payload);
        state.currentOpportunity = action.payload;
      })
      .addCase(createOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateOpportunity
      .addCase(updateOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.opportunities = state.opportunities.map(opportunity =>
          opportunity.id === action.payload.id ? action.payload : opportunity
        );
        state.currentOpportunity = action.payload;
      })
      .addCase(updateOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteOpportunity
      .addCase(deleteOpportunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.opportunities = state.opportunities.filter(
          opportunity => opportunity.id !== action.payload
        );
        if (state.currentOpportunity && state.currentOpportunity.id === action.payload) {
          state.currentOpportunity = null;
        }
      })
      .addCase(deleteOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOpportunityError, clearCurrentOpportunity } = opportunitySlice.actions;
export default opportunitySlice.reducer; 