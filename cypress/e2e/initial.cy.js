/// <reference types="cypress" />

describe('Homepage', () => {
    it('should load successfully', () => {
      cy.visit("https://www.tomektomasik.pl")
      cy.contains('Tomek Tomasik')

    })
  })
  
  describe('Navigation', () => {
    beforeEach(() => {
      cy.visit('https://www.tomektomasik.pl')
      cy.on('uncaught:exception', (err, runnable) => {
        return false 
      })
    })
  
    const links = [
      { selector: 'a[href="/#about"]', urlPart: '/#about', text: 'I am a jelly enthusiast.' },
      { selector: 'a[href="/#contact"]', urlPart: '/#contact', text: 'Contact Us' },
      { selector: 'a[href="/3d-models"]', urlPart: '/3d-models', text: '3D Models' },
      { selector: 'a[href="/artwork"]', urlPart: '/artwork', text: 'Gallery' },
      { selector: 'a[href="/music"]', urlPart: '/music', text: 'Music' },
      { selector: 'a[href="/apps"]', urlPart: '/apps', text: 'APPS' },
      { selector: 'a[href="/blog"]', urlPart: '/blog', text: 'blog' },
    ]
  
    links.forEach(link => {
      it(`should navigate to the ${link.urlPart} page`, () => {
        cy.get(link.selector).each(($el) => {
          cy.wrap($el).click({force: true})
          cy.url().should('include', link.urlPart)
          cy.go('back')
        })
      })
    })
  })
