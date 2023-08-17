import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../state/store';
import PostForm from '../components/postForm';
import { act } from 'react-dom/test-utils';

let PostFormTestComponent: any;

describe('PostComponent', () => {

    beforeEach(() => {        
        PostFormTestComponent = render(
            <Provider store={store}>
                <PostForm />
            </Provider>
        );
    });
    
    it('The user can click on "get posts" button to retrieve all posts and see them displayed on the screen', async () => {
        //The user clicks on "get posts"
        const getPostsButton = PostFormTestComponent.queryByTestId('Get-posts')
        await act( async () => {
            await fireEvent.click(getPostsButton);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : All posts are requested from the database and displayed on the screen or
        // If no posts are found, a message "No post available" is displayed on the screen as well as a "GET Request OK with status code 200" status message
        const postList = screen.queryAllByTestId("post");
        let result;
        if (postList.length > 0) {
            result = true;
        } else if (screen.getByText("No post available in DB") && screen.getByText("GET Request OK with status code 200")) {
            result = true;
        } else {
            result = false;
        }
        expect(result).toBe(true);
        });
        

    it('The user can create a new post and see it displayed on the screen', async () => {
        //The user types a new post in the input field
        const user = userEvent.setup()
        const input = PostFormTestComponent.getByTestId("NewMessageInput");
        await act( async () => {
            await user.type(input, "New Post")
        })
        //The user clicks on "create post"
        const submitButton = PostFormTestComponent.getByText("Submit")
        await act( async () => {
            await fireEvent.click(submitButton);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The new post is created in the database and displayed on the screen
        expect(screen.getByText("New Post")).toBeInTheDocument();
    });

    it('The user can update a posts message', async () => {
        //The user types a new message in the input field
        const user = userEvent.setup()
        const input = screen.getByTestId("PostInput");
        await act( async () => {
            await user.type(input, "Corrected post")
        })
        //The user clicks the submit button
        const inputSubmit = screen.getByTestId("InputSubmit");
        await act( async () => {
            await fireEvent.click(inputSubmit);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The post is updated
        expect(screen.getByText("Corrected post")).toBeInTheDocument();
    });
    
    it('The user can delete a post', async () => {
        //The user clicks the delete button of a particular post
        const deleteButton = screen.getByText("Corrected post").previousSibling
        await act( async () => {
            await fireEvent.click(deleteButton as Element);
            await new Promise((r) => setTimeout(r, 500));
        })
        //Expectation : The post is deleted
        expect(screen.queryByText("Corrected post")).not.toBeInTheDocument();
    });
})  