/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/games')
  })

  it('cy.go() - go back or forward in the browser\'s history', () => {

    cy.visit('http://localhost:3000/games')
    cy.location('pathname').should('include', 'games')

    cy.visit('http://localhost:3000/players')
    cy.location('pathname').should('include', 'players')

    cy.go('back')
    cy.location('pathname').should('include', 'games')

  })

  it('cy.reload() - reload the page', () => {
    cy.reload()
    cy.reload(true)
  })

})
