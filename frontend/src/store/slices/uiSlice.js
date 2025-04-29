import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  sidebarOpen: true,
  currentView: 'dashboard',
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { 
  addNotification, 
  removeNotification, 
  toggleSidebar, 
  setCurrentView,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer; 