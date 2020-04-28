import React from 'react'
import {mount} from 'cypress-react-unit-test'
import Profile from './profile'

describe('SWR profile', () => {
  it('loads data', () => {
    cy.stub(window, 'fetch').resolves({
      name: 'World'
    })
    mount(<Profile />)
    cy.contains('hello World')
  })
})
