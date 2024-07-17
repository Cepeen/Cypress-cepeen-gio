/// <reference types="cypress" />

describe('Homepage', () => {
    it('should load successfully', () => {
      cy.visit('https://www.tomektomasik.pl')
      cy.contains('Welcome to our site')  // zmień na odpowiedni tekst
    })
  })
  
  describe('Click actions', () => {
    beforeEach(() => {
      cy.visit('https://www.tomektomasik.pl')
      cy.on('uncaught:exception', (err, runnable) => {
        return false  // Ignoruj nieoczekiwane wyjątki
      })
    })
  
    const actions = [
      { selector: '#alertButton', action: 'click', expectedResult: 'Button clicked!' }, // Przykład kliknięcia na przycisk, który wyświetla alert
      { selector: '.animated-element', action: 'mouseover', expectedResult: 'active' }, // Przykład aktywacji animacji po najechaniu
      // Dodaj tutaj inne akcje, np. w formularzach, kliknięcia w linki, itp.
    ]
  
    actions.forEach(action => {
      it(`should perform ${action.action} action`, () => {
        cy.get(action.selector).trigger(action.action) // Wykonaj akcję na znalezionym elemencie
        if (action.expectedResult === 'active') {
          cy.get(action.selector).should('have.class', action.expectedResult)
        } else {
          cy.on('window:alert', (txt) => {
            expect(txt).to.contains(action.expectedResult)
          })
        }
      })
    })
  })
  
  describe('Forms', () => {
    it('should submit a contact form', () => {
      cy.visit('https://www.tomektomasik.pl/contact')
      cy.get('#name').type('John Doe')  // zmień na odpowiedni selektor
      cy.get('#email').type('john.doe@example.com')
      cy.get('#message').type('Hello, this is a test message.')
      cy.get('#submit').click()
      cy.contains('Thank you for your message!')  // zmień na odpowiedni tekst
    })
  })
  
  describe('Subpages', () => {
    it('should load the Services page', () => {
      cy.visit('https://www.tomektomasik.pl/services')
      cy.contains('Our Services')  // zmień na odpowiedni tekst
    })
  
    it('should load the Contact page', () => {
      cy.visit('https://www.tomektomasik.pl/contact')
      cy.contains('Contact Us')  // zmień na odpowiedni tekst
    })
  })
  
  describe('Responsive Design', () => {
    it('should display correctly on mobile', () => {
      cy.viewport('iphone-6')
      cy.visit('https://www.tomektomasik.pl')
      cy.get('.mobile-menu').should('be.visible')  // zmień na odpowiedni selektor
    })
  
    it('should display correctly on desktop', () => {
      cy.viewport(1280, 720)
      cy.visit('https://www.tomektomasik.pl')
      cy.get('.desktop-menu').should('be.visible')  // zmień na odpowiedni selektor
    })
  })
  
  