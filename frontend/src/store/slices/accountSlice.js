import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '../../services/accountService';

// Async thunks
export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async ({ limit = 20, offset = 0 }, { rejectWithValue }) => {
    try {
      return await accountService.getAccounts(limit, offset);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch accounts' });
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  'accounts/fetchAccountById',
  async (id, { rejectWithValue }) => {
    try {
      return await accountService.getAccount(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch account' });
    }
  }
);

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      return await accountService.createAccount(accountData);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create account' });
    }
  }
);

export const updateAccount = createAsyncThunk(
  'accounts/updateAccount',
  async ({ id, accountData }, { rejectWithValue }) => {
    try {
      return await accountService.updateAccount(id, accountData);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update account' });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (id, { rejectWithValue }) => {
    try {
      await accountService.deleteAccount(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete account' });
    }
  }
);

const initialState = {
  accounts: [],
  currentAccount: null,
  total: 0,
  limit: 20,
  offset: 0,
  loading: false,
  error: null
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearCurrentAccount: (state) => {
      state.currentAccount = null;
    },
    setAccountsParams: (state, action) => {
      state.limit = action.payload.limit || state.limit;
      state.offset = action.payload.offset || state.offset;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.data;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch account by ID
      .addCase(fetchAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAccount = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create account
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
        state.total += 1;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update account
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.accounts.findIndex(account => account.id === action.payload.id);
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
        if (state.currentAccount && state.currentAccount.id === action.payload.id) {
          state.currentAccount = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter(account => account.id !== action.payload);
        state.total -= 1;
        if (state.currentAccount && state.currentAccount.id === action.payload) {
          state.currentAccount = null;
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentAccount, setAccountsParams } = accountSlice.actions;

export default accountSlice.reducer; 