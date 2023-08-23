import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from './index';

describe('Button', () => {

    it('renders with primary color by default', () => {
        const { getByRole } = render(<Button content="Click me" />);
        const button = getByRole('button');
        expect(button).toHaveClass('btn-primary');
    });

    it('renders with secondary color when color prop is set to "secondary"', () => {
		const { getByRole } = render(<Button content="Click me" color="secondary" />);
		const button = getByRole('button');
		expect(button).toHaveClass('btn-secondary');
    });

    it('calls onClickFunction when clicked', () => {
		const handleClick = jest.fn();
		const { getByRole } = render(<Button content="Click me" onClickFunction={handleClick} />);
		const button = getByRole('button');
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalled();
    });

    it('renders with aria-label when ariaLabel prop is set', () => {
		const { getByRole } = render(<Button content="Click me" ariaLabel="Click me now" />);
		const button = getByRole('button');
		expect(button).toHaveAttribute('aria-label', 'Click me now');
    });
});