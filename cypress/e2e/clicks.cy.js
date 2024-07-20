/// <reference types="cypress" />

describe('Homepage', () => {
    it('should load successfully', () => {
      cy.visit('https://www.tomektomasik.pl')
      cy.contains('Tomek Tomasik')  
  })
})


  describe('Click actions', () => {
    beforeEach(() => {
      cy.visit('https://www.tomektomasik.pl')
      cy.on('uncaught:exception', (err, runnable) => {
        return false  
      })
    })
  
//navbar and menu
  
describe('Responsive Design', () => {
  it('should display correctly on mobile', () => {
    cy.viewport('iphone-6')
    cy.visit('https://www.tomektomasik.pl')
    cy.get('.navbar-burger').should('be.visible').click() 
    cy.get('.navbar-menu').should('be.visible') 
})
})

  it('should display correctly on desktop', () => {
    cy.viewport(1280, 720)
    cy.visit('https://www.tomektomasik.pl')
    cy.get('.navbar-burger').should('not.be.visible')
    cy.get('.navbar-menu').should('be.visible') 
  })
})

  
