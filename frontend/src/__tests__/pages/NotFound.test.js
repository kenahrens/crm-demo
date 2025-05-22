import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

test('renders not found page', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  
  // Check for 404 or not found text
  const notFoundElement = screen.queryByText(/404/i) || 
                         screen.queryByText(/not found/i) ||
                         screen.queryByText(/page doesn't exist/i);
  expect(notFoundElement).toBeInTheDocument();
}); 