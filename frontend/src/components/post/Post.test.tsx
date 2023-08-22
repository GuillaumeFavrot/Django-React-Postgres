import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostComponent from './index';
import { Post } from '../../types';
import fs from 'fs'
import path from 'path'
import { act } from 'react-dom/test-utils';

const dummyPost: Post = { _id: 1, text: 'First post' }

let component: any;

//Unit tests

describe('PostComponent', () => {
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <PostComponent key={dummyPost._id} _id={dummyPost._id} text={dummyPost.text}/>
            </Provider>
        );
    });

    it('should display the post text', () => {
        const postText = component.getByText(dummyPost.text)
        expect(postText).toBeInTheDocument();
        });

    it('should display the post delete button', () => {
        const deleteLink = component.queryByLabelText('post-delete');
        expect(deleteLink).toBeInTheDocument();
        });  
    
    it('The modification form should be hidden from the start then appear on click', () => {
        const modifyLink = component.queryByLabelText('post-update');
        expect(modifyLink).toHaveClass('hidden');
        const postText = component.getByText(dummyPost.text);
        fireEvent.click(postText);
        expect(modifyLink).toHaveClass('flex');
        });
    
    it('The text typed by the user in the input field is properly catched and saved in local state', async () => {
        const user = userEvent.setup()
        const input = component.getByLabelText('post-update-input');
        await act( async () => {
            await user.type(input, 'Entered text')
        })
        expect(input.value).toBe('Entered text');
        });
})

  

