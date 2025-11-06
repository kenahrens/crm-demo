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
        let opportunities = [];
        if (Array.isArray(action.payload)) {
          opportunities = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          opportunities = action.payload.data;
        } else if (action.payload && typeof action.payload === 'object') {
          // If it's an object but not in expected format, try to extract data
          opportunities = Array.isArray(Object.values(action.payload)[0]) 
            ? Object.values(action.payload)[0] 
            : [];
        }
        
        // Map API fields to frontend fields
        state.opportunities = opportunities.map(opp => ({
          ...opp,
          name: opp.opportunity_name || opp.name,
          status: opp.stage || opp.status,
          closeDate: opp.close_date || opp.closeDate,
          account: opp.account || null,
          accountId: opp.account_id || opp.accountId
        }));
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
        // Map API fields to frontend fields
        state.currentOpportunity = {
          ...action.payload,
          name: action.payload.opportunity_name || action.payload.name,
          status: action.payload.stage || action.payload.status,
          closeDate: action.payload.close_date || action.payload.closeDate,
          account: action.payload.account || null,
          accountId: action.payload.account_id || action.payload.accountId
        };
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
        // Map API fields to frontend fields
        const mappedOpportunity = {
          ...action.payload,
          name: action.payload.opportunity_name || action.payload.name,
          status: action.payload.stage || action.payload.status,
          closeDate: action.payload.close_date || action.payload.closeDate,
          account: action.payload.account || null,
          accountId: action.payload.account_id || action.payload.accountId
        };
        state.opportunities.push(mappedOpportunity);
        state.currentOpportunity = mappedOpportunity;
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
        // Map API fields to frontend fields
        const mappedOpportunity = {
          ...action.payload,
          name: action.payload.opportunity_name || action.payload.name,
          status: action.payload.stage || action.payload.status,
          closeDate: action.payload.close_date || action.payload.closeDate,
          account: action.payload.account || null
        };
        state.opportunities = state.opportunities.map(opportunity =>
          opportunity.id === action.payload.id ? mappedOpportunity : opportunity
        );
        state.currentOpportunity = mappedOpportunity;
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