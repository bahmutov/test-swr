import React from 'react'
import {mount} from 'cypress-react-unit-test'
import Profile from './profile'
import { SWRConfig, cache } from 'swr'

describe('SWR profile', () => {
  // to clear SWR cache in each test
  // surround each test component with
  // <SWRConfig value={{ dedupingInterval: 0 }}>
  // https://github.com/zeit/swr/pull/231
  beforeEach(() => {
    cache.clear()
  })

  it('loads data', () => {
    cy.stub(window, 'fetch').resolves({
      name: 'World'
    })
    mount(<SWRConfig value={{ dedupingInterval: 0 }}>
      <Profile />
      </SWRConfig>
    )
    cy.contains('hello World')
  })

  it('loads data with delay', () => {
    cy.stub(window, 'fetch').resolves(
      Cypress.Promise.resolve({ name: 'there' })
      .delay(3000)
    )

    mount(<SWRConfig value={{ dedupingInterval: 0 }}>
      <Profile />
    </SWRConfig>)

    cy.contains('loading...')
    cy.contains('hello there')
    cy.contains('loading...').should('not.exist')
  })
})
