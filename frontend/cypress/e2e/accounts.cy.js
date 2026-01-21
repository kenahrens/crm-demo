// Sample Cypress test for accounts page with mocked backend
describe('Accounts Page with Mocked Backend', () => {
  beforeEach(() => {
    // Login first (using mocked auth)
    cy.visit('/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('example_value')
    cy.get('button[type="submit"]').click()
    cy.wait(500) // Wait for redirect
  })

  it('should display accounts list', () => {
    cy.visit('/accounts')

    // The mocked backend will return the accounts from the OpenAPI spec
    cy.contains('Accounts').should('be.visible')

    // Should show table or list of accounts
    cy.get('[data-testid="accounts-list"], table, .MuiDataGrid-root').should('exist')
  })

  it('should be able to navigate to account details', () => {
    cy.visit('/accounts')

    // Click on first account if it exists
    cy.get('a[href*="/accounts/"], button').first().click({ force: true })

    // Should navigate to account detail page
    cy.url().should('match', /\/accounts\/[a-f0-9-]+/)
  })

  it('should handle error responses', () => {
    // Visit a non-existent account (will trigger 404 from mock)
    cy.visit('/accounts/00000000-0000-0000-0000-000000000000', { failOnStatusCode: false })

    // Should show error state or 404 message
    cy.contains(/not found|error|404/i).should('be.visible')
  })
})
