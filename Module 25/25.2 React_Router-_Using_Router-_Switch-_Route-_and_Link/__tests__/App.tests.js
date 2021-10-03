import React from 'react';
import {Router} from 'react-router-dom'
import {render} from '@testing-library/react';
import App from '../src/App';
import {createMemoryHistory} from 'history'
import {fireEvent} from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  test('landing on a bad page shows 404 page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const { getByRole } = render(
      <Router history={history}>
        <App/>
      </Router>
    )
    expect(getByRole('heading')).toHaveTextContent('404 Not Found')
  })

  test('routes for /, /about, /contact', () => {
    const history = createMemoryHistory()
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    
    expect(container.innerHTML).toMatch('Welcome to the home page')

    fireEvent.click(getByText(/about/i))

    expect(container.innerHTML).toMatch('You are on the about page')

    fireEvent.click(getByText(/contact/i))

    expect(container.innerHTML).toMatch('Please feel free to email us')
  })
})
