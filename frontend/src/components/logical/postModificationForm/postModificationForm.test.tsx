import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useUpdatePostMutation } from '../../../state/features/api';
import { useAppDispatch } from '../../../hooks';
import PostModificationForm from './index';

jest.mock('../../../state/features/api');
jest.mock('../../../hooks');
jest.mock('../../../state/features/requestStatus');
let component: any;
const _id = 123;
const setToDisplay = jest.fn();
const dispatch = jest.fn();

describe('PostModificationForm', () => {

	beforeEach(() => {
		(useUpdatePostMutation as jest.Mock).mockReturnValue([jest.fn()]);
		(useAppDispatch as jest.Mock).mockReturnValue(dispatch);
		component = render(<PostModificationForm _id={_id} setToDisplay={setToDisplay} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the form with a submit button', () => {
		expect(component.getByLabelText('post-update-submit')).toBeInTheDocument();
	});
});