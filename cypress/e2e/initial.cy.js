/// <reference types="cypress" />

describe('Homepage', () => {
  it('should load successfully', () => {
      cy.visit("https://www.tomektomasik.pl")
      cy.contains('Tomek Tomasik')
  })
})

// Basic navigation tests
describe('Navigation', () => {
  beforeEach(() => {
      cy.visit('https://www.tomektomasik.pl')
      cy.on('uncaught:exception', (err, runnable) => {
          return false
      })
  })

  const links = [
      // Navbar
      { selector: 'a[href="/#about"]', urlPart: '/#about', text: 'I am a jelly enthusiast.' },
      { selector: 'a[href="/#contact"]', urlPart: '/#contact', text: 'Contact Us' },
      { selector: 'a[href="/3d-models"]', urlPart: '/3d-models', text: '3D Models' },
      { selector: 'a[href="/artwork"]', urlPart: '/artwork', text: 'Gallery' },
      { selector: 'a[href="/music"]', urlPart: '/music', text: 'Music' },
      { selector: 'a[href="/apps"]', urlPart: '/apps', text: 'APPS' },
      { selector: 'a[href="/blog"]', urlPart: '/blog', text: 'blog' },
      // Footer
      { selector: 'a[href="/privacy-policy"]', urlPart: '/privacy-policy', text: 'privacy-policy' },
  ]

  links.forEach(link => {
      it(`should navigate to the ${link.urlPart} page`, () => {
          cy.get(link.selector).then($el => {
              if ($el.length) {
                  cy.wrap($el).click({ force: true })
                  cy.url().should('include', link.urlPart)
                  cy.go('back')
              } else {
                  cy.log(`Element not found: ${link.selector}`)
              }
          })
      })
  })
})

describe('Blog Navigation', () => {
  it('should navigate to all links inside blog-card elements and verify navigation', () => {

      cy.visit('https://www.tomektomasik.pl/blog')
      cy.on('uncaught:exception', (err, runnable) => {
       
          return false
      })

    
      cy.get('#blog-card a').then($links => {
          const links = []
          $links.each((index, $link) => {
              const href = $link.getAttribute('href')
              if (href) {
                  links.push(href)
              }
          })

  
          links.forEach(link => {
              cy.visit(link)
              cy.url().should('include', link)
              cy.go('back')
          })
      })
  })
})
