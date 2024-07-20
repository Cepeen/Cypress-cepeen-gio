/// <reference types="cypress" />


//search tests

describe('Enter search query', () => {
    it("Entering querry", () => {
        cy.visit('https://www.tomektomasik.pl/blog')
        cy.on('uncaught:exception', (err, runnable) => {
          return false
        })
        cy.get("#search-input").type("mighty adventures!")
      })})

      describe ('Enter search query', () => {
        it("Entering querry", () => {
          cy.visit('https://www.tomektomasik.pl/blog')
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
          cy.get("#search-input").type("How Dare You!")
        })})