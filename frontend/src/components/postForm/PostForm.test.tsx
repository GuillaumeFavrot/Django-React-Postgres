import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostForm from './index';
import { Post } from '../../types';
import { act } from 'react-dom/test-utils';

const dummyPost: Post = { _id: 1, text: 'First post' }

let component: any;


// Unit tests

describe('PostForm', () => {
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <PostForm />
            </Provider>
        );
    });

    it('Should render properly and display "API Tester"', () => {
        expect(component.getByText(/API Tester/i)).toBeInTheDocument();
        });
    
    it('The text typed by the user in the input field is properly catched and saved in local state', async () => {
        const user = userEvent.setup()
        const input = component.getByTestId("Input");
        await act( async () => {
            await user.type(input, "Entered text")
        })
        expect(input.value).toBe("Entered text");
        });

})

// Integration tests

describe('PostForm', () => {
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <PostForm />
            </Provider>
        );
    });

    it('The user can click on "get posts" button to retrieve all posts and see them displayed on the screen', async () => {
        //The user clicks on "get posts"
        //Expectation 1 : All posts are requested from the database and displayed on the screen
        //Expectation 2 : If no posts are found, a message "No post available" is displayed on the screen as well as a "200 OK" status
    });

    it('The user can create a new post and see it displayed on the screen', async () => {
        //The user types a new post in the input field
        //The user clicks on "create post"
        //Expectation : The new post is created in the database and displayed on the screen
    });
})