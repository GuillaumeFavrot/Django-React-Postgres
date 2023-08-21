import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { act } from 'react-dom/test-utils';
import Main from '../pages/main';

let MainTestComponent: any;

describe('PostComponent', () => {

    beforeEach(() => {        
        MainTestComponent = render(
            <Provider store={store}>
                <Main />
            </Provider>
        );
    });
    
    it('All posts are fetched uppon page load', async () => {
        //Expectation : All posts are requested from the database and displayed on the screen or
        // If no posts are found, a message "No post available" is displayed on the screen as well as a "GET Request OK with status code 200" status message
        await act( async () => {
            await new Promise((r) => setTimeout(r, 500));
        })
        const postList = screen.queryAllByLabelText('post');
        let result;
        if (postList.length > 0) {
            result = true;
        } else if (screen.getByText('No post available in DB') && screen.getByText('Get request successfull')) {
            result = true;
        } else {
            result = false;
        }
        expect(result).toBe(true);
        });
        

    it('The user can create a new post and see it displayed on the screen', async () => {
        //The user types a new post in the input field
        const user = userEvent.setup()
        const input = MainTestComponent.getByLabelText('post-add-input');
        await act( async () => {
            await user.type(input, 'New Post')
        })
        //The user clicks on "create post"
        const submitButton = MainTestComponent.getByText('Submit')
        await act( async () => {
            await fireEvent.click(submitButton);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The new post is created in the database and displayed on the screen
        expect(screen.getByText('New Post')).toBeInTheDocument();
    });

    it('The user can update a posts message', async () => {
        //The user types a new message in the input field
        const user = userEvent.setup()
        const input = screen.getByLabelText('post-update-input');
        await act( async () => {
            await user.type(input, 'Corrected post')
        })
        //The user clicks the submit button
        const inputSubmit = screen.getByLabelText('post-update-submit');
        await act( async () => {
            await fireEvent.click(inputSubmit);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The post is updated
        expect(screen.getByText('Corrected post')).toBeInTheDocument();
    });
    
    it('The user can delete a post', async () => {
        //The user clicks the delete button of a particular post
        const deleteButton = screen.getByText('Corrected post').previousSibling
        await act( async () => {
            await fireEvent.click(deleteButton as Element);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The post is deleted
        expect(screen.queryByText('Corrected post')).not.toBeInTheDocument();
    });
})  