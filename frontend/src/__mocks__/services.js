// Mocks for the various services

// Auth service mock
export const authService = {
  login: jest.fn(() => Promise.resolve({ token: 'mock-token', user: { name: 'Test User' } })),
  logout: jest.fn(() => Promise.resolve()),
  getCurrentUser: jest.fn(() => Promise.resolve({ name: 'Test User' }))
};

// Account service mock
export const accountService = {
  getAccounts: jest.fn(() => Promise.resolve([{ id: '1', name: 'Test Account' }])),
  getAccount: jest.fn(() => Promise.resolve({ id: '1', name: 'Test Account' })),
  createAccount: jest.fn(() => Promise.resolve({ id: '1', name: 'Test Account' })),
  updateAccount: jest.fn(() => Promise.resolve({ id: '1', name: 'Updated Account' })),
  deleteAccount: jest.fn(() => Promise.resolve())
};

// Contact service mock
export const contactService = {
  getContacts: jest.fn(() => Promise.resolve([{ id: '1', firstName: 'John', lastName: 'Doe' }])),
  getContact: jest.fn(() => Promise.resolve({ id: '1', firstName: 'John', lastName: 'Doe' })),
  createContact: jest.fn(() => Promise.resolve({ id: '1', firstName: 'John', lastName: 'Doe' })),
  updateContact: jest.fn(() => Promise.resolve({ id: '1', firstName: 'Jane', lastName: 'Doe' })),
  deleteContact: jest.fn(() => Promise.resolve())
};

// Opportunity service mock
export const opportunityService = {
  getOpportunities: jest.fn(() => Promise.resolve([{ id: '1', name: 'Test Opportunity' }])),
  getOpportunity: jest.fn(() => Promise.resolve({ id: '1', name: 'Test Opportunity' })),
  createOpportunity: jest.fn(() => Promise.resolve({ id: '1', name: 'Test Opportunity' })),
  updateOpportunity: jest.fn(() => Promise.resolve({ id: '1', name: 'Updated Opportunity' })),
  deleteOpportunity: jest.fn(() => Promise.resolve())
};

// Note service mock
export const noteService = {
  getNotes: jest.fn(() => Promise.resolve([{ id: '1', title: 'Test Note' }])),
  getNote: jest.fn(() => Promise.resolve({ id: '1', title: 'Test Note' })),
  createNote: jest.fn(() => Promise.resolve({ id: '1', title: 'Test Note' })),
  updateNote: jest.fn(() => Promise.resolve({ id: '1', title: 'Updated Note' })),
  deleteNote: jest.fn(() => Promise.resolve())
};

// Dashboard service mock
export const dashboardService = {
  getStats: jest.fn(() => Promise.resolve({
    accounts: 10,
    contacts: 20,
    opportunities: 5,
    totalValue: 100000
  })),
  getRecentActivities: jest.fn(() => Promise.resolve([]))
}; 