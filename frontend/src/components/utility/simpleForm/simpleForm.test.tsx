import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SimpleForm from './index';

let component: any;
const onSubmitFunction = jest.fn();
const title = 'Test Form';
const ariaLabel = 'test-form';
const buttonContent = 'Submit';

describe('SimpleForm', () => {

	beforeEach(() => {
		component = render(<SimpleForm
			title={title}
			onSubmitFunction={onSubmitFunction}
			ariaLabel={ariaLabel}
			buttonContent={buttonContent}
		/>
		);
	})

	it('should render the form with the correct title', () => {
		expect(component.getByText(title)).toBeInTheDocument();
	});

	it('should call the onSubmitFunction when the form is submitted', () => {
		const input = component.getByLabelText(`${ariaLabel}-input`);
		const button = component.getByLabelText(`${ariaLabel}-submit`);
		fireEvent.change(input, { target: { value: 'Test Data' } });
		fireEvent.click(button);
		expect(onSubmitFunction).toHaveBeenCalledWith('Test Data');
	});
});