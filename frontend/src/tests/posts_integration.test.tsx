import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { setupStore } from '../state/store';
import { act } from 'react-dom/test-utils';
import Main from '../pages/main';


import { server } from '../mocks/api/server'
import { apiSlice } from '../state/features/api'
import PostList from '../components/logical/postList';
import PostForm from '../components/logical/postForm';
import PostModificationForm from '../components/logical/postModificationForm';
import PostComponent from '../components/logical/post';
import { renderWithProviders } from './test-utils';
import { rest } from 'msw'


// let MainTestComponent: any;
let store = setupStore({});



describe('PostComponent', () => {
    
    // Establish API mocking before all tests.
    beforeAll(() => {
        server.listen();
    });

    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    afterEach(() => {
        server.resetHandlers();
        // This is the solution to clear RTK Query cache after each test
        store.dispatch(apiSlice.util.resetApiState());
    });

    // Clean up after the tests are finished.
    afterAll(() => server.close());

    it("table should render after fetching from API", async () => {
        const postList = renderWithProviders(<PostList/>)

        await waitFor(() => {
            expect(postList.getByText('Post 1')).toBeInTheDocument();
        })
    })

    it("table should render after creating a new post and refetching data from the API", async () => {


        //The user types a new post in the input field
        
        const postForm = renderWithProviders(<PostForm/>)

        const user = userEvent.setup()
        const input = postForm.getByLabelText('post-add-input');

        await waitFor( async () => {
            await user.type(input, 'New Post')
        })

        //The user clicks on "create post"
        const submitButton = postForm.getByText('Submit')

        await waitFor( async () => {
            await fireEvent.click(submitButton);
        })

        //The postlist is rerendrered with the new data
        const postList = renderWithProviders(<PostList/>)

        await waitFor(() => {
            expect(postList.getByText('New Post')).toBeInTheDocument();
        })
    })

    it("table should render after updating a post and refetching data from the API", async () => {


        //The user types a new post in the input field
        const postModificationForm = renderWithProviders(<PostModificationForm _id={1} setToDisplay={()=> {}}/>)

        //The user types a new message in the input field
        const user = userEvent.setup()
        const input = postModificationForm.getByLabelText('post-update-input');

        await waitFor( async () => {
            await user.type(input, 'Post 2')
        })

        //The user clicks the submit button
        const inputSubmit = postModificationForm.getByLabelText('post-update-submit');
        await waitFor( async () => {
            await fireEvent.click(inputSubmit);
        })

        //The postlist is rerendrered with the new data
        const postList = renderWithProviders(<PostList/>)

        await waitFor(() => {
            expect(postList.getByText('Post 2')).toBeInTheDocument();
        })
    })

    it("table should render after updating a post and refetching data from the API", async () => {

        //The user types a new post in the input field
        const postComponent = renderWithProviders(<PostComponent _id={1} text={"Post 3"}/>)

        //The user clicks the delete button of a particular post
        const deleteButton = postComponent.getByLabelText('post-delete')
        await act( async () => {
            await fireEvent.click(deleteButton as Element);
        })

        //The postlist is rerendrered with the new data
        const postListAfter = renderWithProviders(<PostList/>)

        await waitFor(() => {
            expect(postListAfter.queryByText('Post 2')).not.toBeInTheDocument();
        })
    })
})  