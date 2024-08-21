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

    it('should fetch and display selected number of tracks (20)', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('20')
        cy.get('#recentbutton').click()

        cy.wait(2000)

        cy.get('#dataContainer').should('be.visible')
        cy.get('#dataContainer').children().should('have.length', 20)
    })

    it('should fetch and display selected number of tracks (50)', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('50')
        cy.get('#recentbutton').click()

        cy.wait(2000)

        cy.get('#dataContainer').should('be.visible')
        cy.get('#dataContainer').children().should('have.length', 50)
    })

    it('should open the sidebar with lyrics when the lyrics button is clicked', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('10')
        cy.get('#recentbutton').click()

        // Wait for the data to load
        cy.wait(2000)

        // Verify that data is loaded
        cy.get('#dataContainer').should('be.visible')
        cy.get('#dataContainer').children().should('have.length', 10)

        // Verify that the lyrics button becomes visible
        cy.get('#LyricsButton').should('be.visible')
        
        // Check the initial state of the sidebar
        cy.get('#searchResultsContainer').should('not.be.visible')

        // Click the lyrics button
        cy.get('#LyricsButton').click()

        // Scroll into view and verify that the sidebar becomes visible and contains text
        cy.get('#searchResultsContainer').scrollIntoView().should('be.visible')
        cy.get('#searchResultsContainer').should('not.be.empty')
    })

    it('should navigate through pagination correctly', () => {
        cy.get('#username').type('do_not_exist')
        cy.get('#tracksPerPage').select('10')
        cy.get('#recentbutton').click()

        // Wait for the data to load
        cy.wait(2000)

        // Verify initial state of pagination
        cy.get('#currentPage').should('contain', '1')
        cy.get('#totalPages').invoke('text').then((totalPages) => {
            const totalPagesInt = parseInt(totalPages, 10)
            expect(totalPagesInt).to.be.greaterThan(1)

            // Navigate to the next page
            cy.get('#nextPage').click()
            cy.wait(1000)
            cy.get('#currentPage').should('contain', '2')

            // Navigate back to the previous page
            cy.get('#prevPage').click()
            cy.wait(1000)
            cy.get('#currentPage').should('contain', '1')

            // Navigate to the last page
            cy.get('#pageInput').clear().type(totalPagesInt)
            cy.get('#goToPage').click()
            cy.wait(1000)
            cy.get('#currentPage').should('contain', totalPagesInt)

            // Navigate back to the first page
            cy.get('#pageInput').clear().type('1')
            cy.get('#goToPage').click()
            cy.wait(1000)
            cy.get('#currentPage').should('contain', '1')
        })
    })

    it('should fetch and display tracks for the selected date', () => {
        // Select date 26.06.2024
        cy.get('#username').type('do_not_exist')
        cy.get('#scrobbleDate').type('2024-06-26');

        // Click button
        cy.get('#fetchByDateButton').click();

        // Wait for data to load
        cy.wait(2000);

        // Verify that data is loaded
        cy.get('#dataContainer').should('be.visible');
        cy.get('#dataContainer').children().should('have.length.greaterThan', 0); // Check that there is at least one track
    });
});
