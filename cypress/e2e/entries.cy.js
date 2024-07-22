/// <reference types="cypress" />


//search tests
describe('Blog Search', () => {
  it('should search for each blog title found in blog-card elements', () => {
      cy.visit('https://www.tomektomasik.pl/blog')
      cy.on('uncaught:exception', (err, runnable) => {
          return false 
      })

     
      cy.get('.title.is-size-4-touch').then($titles => {
          const titles = []
          $titles.each((index, $title) => {
              const titleText = $title.innerText
              if (titleText) {
                  titles.push(titleText.trim()) 
              }
          })

          // Iterate over each title and perform the search
          titles.forEach(title => {
              cy.visit('https://www.tomektomasik.pl/blog')
              cy.on('uncaught:exception', (err, runnable) => {
                  return false 
              })
              cy.get('#search-input').type(`${title}{enter}`)
              cy.contains(title).should('be.visible')
          })
      })
  })
})
