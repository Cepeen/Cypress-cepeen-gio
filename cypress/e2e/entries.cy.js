/// <reference types="cypress" />

describe('Enter search query', () => {
    it("Entering querry", () => {
        cy.visit('https://www.tomektomasik.pl/blog')
        cy.on('uncaught:exception', (err, runnable) => {
          return false
        })
        cy.get("#search-input").type("mighty adventures!")
      })})