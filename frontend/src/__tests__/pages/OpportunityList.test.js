import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import OpportunityList from '../../pages/opportunities/OpportunityList';

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    opportunities: () => ({
      opportunities: [
        { 
          id: '1', 
          name: 'Test Opportunity', 
          stage: 'Negotiation',
          status: 'Negotiation',
          amount: 50000,
          closeDate: '2023-12-31',
          accountId: '1',
          accountName: 'Test Account'
        }
      ],
      loading: false,
      error: null
    })
  }
});

test('renders opportunity list page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <OpportunityList />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for opportunities heading or add button
  const opportunitiesElement = screen.queryByText(/opportunities/i) || 
                              screen.queryByText(/add opportunity/i) ||
                              screen.queryByText(/new opportunity/i);
  expect(opportunitiesElement).toBeInTheDocument();
}); 