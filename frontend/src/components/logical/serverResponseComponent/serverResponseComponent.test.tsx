import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import RequestStatusComponent from './index';
import { store } from '../../../state/store';

let component: any;

describe('RequestStatusComponent', () => {

	beforeEach(() => {
		component = render(
		<Provider store={store}>
			<RequestStatusComponent />
		</Provider>
		)});
	
	it('should render the component with the correct status string', () => {
		expect(component.getByText('Server response')).toBeInTheDocument();
		});
});