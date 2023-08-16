import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../state/store';
import PostComponent from '../components/post';
import PostForm from '../components/postForm';
import { Post } from '../types';
import fs from 'fs'
import path from 'path'
import { act } from 'react-dom/test-utils';

const dummyPost: Post = { text: 'First post' }

let PostTestComponent: any;

let PostFormTestComponent: any;

describe('PostComponent', () => {
    beforeEach(() => {
        PostTestComponent = render(
            <Provider store={store}>
                <PostComponent key={dummyPost._id} _id={dummyPost._id} text={dummyPost.text}/>
            </Provider>
        );

        PostFormTestComponent = render(
            <Provider store={store}>
                <PostForm />
            </Provider>
        );

        const cssFile = fs.readFileSync(
            path.resolve(__dirname, '../../assets/App.css'),
            'utf8'
        )
        
        const { PostComponentContainer } = PostTestComponent
        
        const style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = cssFile
        PostComponentContainer.append(style)

        //I must create a post in this section

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

    it('The user can update a posts message', async () => {
        //The user clicks a posts message to reveal the modification form
        //The user types a new message in the input field
        //The user clicks the submit button
        //Expectation : The post is updated
    });
    
    it('The user can delete a post', async () => {
        //The user clicks the delete button of a particular post
        //Expectation : The post is deleted
    });
})  