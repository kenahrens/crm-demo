// Sample Cypress test using mocked backend
describe('Login Flow with Mocked Backend', () => {
  it('should load the login page', () => {
    cy.visit('/login')
    cy.contains('Login').should('be.visible')
  })

  it('should successfully login with mocked credentials', () => {
    cy.visit('/login')

    // These credentials match the OpenAPI-generated mock
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('example_value')
    cy.get('button[type="submit"]').click()

    // After successful login, should redirect to dashboard or accounts page
    cy.url().should('not.include', '/login')
  })

  it('should handle login errors', () => {
    cy.visit('/login')

    // Invalid credentials should trigger 401 response from mock
    cy.get('input[name="email"]').type('invalid@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Should show error message
    cy.contains(/invalid|error|unauthorized/i).should('be.visible')
  })
})
