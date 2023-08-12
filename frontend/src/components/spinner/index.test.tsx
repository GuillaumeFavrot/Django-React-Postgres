import React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from './index'

describe('Spinner', () => {
  it('renders without text', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.spinner')).toBeInTheDocument()
    expect(container.querySelector('h4')).not.toBeInTheDocument()
  })

  it('renders with text', () => {
    const { container } = render(<Spinner text="Loading..." />)
    expect(container.querySelector('.spinner')).toBeInTheDocument()
    expect(container.querySelector('h4')).toHaveTextContent('Loading...')
  })

  it('renders with custom size', () => {
    const { container } = render(<Spinner size="10em" />)
    expect(container.querySelector('.spinner')).toBeInTheDocument()
    expect(container.querySelector('.loader')).toHaveStyle('height: 10em; width: 10em;')
  })
})