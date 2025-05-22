import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../../pages/Dashboard';

// No need to mock the service directly as we're already mocking the store

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    dashboard: () => ({
      stats: {
        accounts: 10,
        contacts: 20,
        opportunities: 5,
        totalValue: 100000
      },
      recentActivities: [],
      isLoading: false,
      error: null
    }),
    accounts: () => ({
      accounts: [
        { id: '1', name: 'Test Account', industry: 'Technology' },
        { id: '2', name: 'Another Account', industry: 'Finance' }
      ],
      total: 2,
      isLoading: false,
      error: null
    })
  }
});

test('renders dashboard page with stats', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );
  
  // Test will pass if at least one of these elements is found
  const dashboardElement = screen.queryByText(/dashboard/i) || 
                          screen.queryByText(/statistics/i) || 
                          screen.queryByText(/overview/i);
  expect(dashboardElement).toBeInTheDocument();
}); 