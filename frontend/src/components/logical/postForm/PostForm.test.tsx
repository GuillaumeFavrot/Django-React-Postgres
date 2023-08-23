import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import PostForm from './index';
import { act } from 'react-dom/test-utils';

let component: any;

describe('PostForm', () => {
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <PostForm />
            </Provider>
        );
    });

    it('Should render properly and display "Enter your test post"', () => {
        expect(component.getByText(/Enter your test post/i)).toBeInTheDocument();
        });
    
    it('The text typed by the user in the input field is properly catched and saved in local state', async () => {
        const user = userEvent.setup()
        const input = component.getByLabelText('post-add-input');
        await act( async () => {
            await user.type(input, 'Entered text')
        })
        expect(input.value).toBe('Entered text');
    });

})

