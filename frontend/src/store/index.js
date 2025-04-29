import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import contactReducer from './slices/contactSlice';
import opportunityReducer from './slices/opportunitySlice';
import noteReducer from './slices/noteSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    contacts: contactReducer,
    opportunities: opportunityReducer,
    notes: noteReducer,
    ui: uiReducer,
    auth: authReducer
  }
});

export default store; 