/// <reference types="cypress" />

describe('Last.fm Fiddler', () => {
    beforeEach(() => {
        cy.visit('https://www.tomektomasik.pl/lastfmfiddler') 
        cy.on('uncaught:exception', (err, runnable) => {
            return false 
        })
    })

    it('should fetch and display data for non-existing user', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('10')
        cy.get('#recentbutton').click()

    
        cy.wait(2000)

        cy.get('#dataContainer').should('be.visible')
        cy.get('#dataContainer').children().should('have.length', 10)
    })

    it('should fetch and display selected number of tracks', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('20')
        cy.get('#recentbutton').click()

        cy.wait(2000)

        cy.get('#dataContainer').should('be.visible')
        cy.get('#dataContainer').children().should('have.length', 20)
    })
})
