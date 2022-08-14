/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.viewport() - set the viewport size and dimension', () => {

    cy.get('#sidebar').should('be.visible')

    cy.viewport('macbook-15')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('macbook-13')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('macbook-11')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('ipad-2')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('ipad-mini')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-6+')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-6')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-5')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-4')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-3')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('ipad-2', 'portrait')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
    cy.viewport('iphone-4', 'landscape')
    cy.get('#sidebar').should('be.visible')
    cy.wait(200)
  })
})
