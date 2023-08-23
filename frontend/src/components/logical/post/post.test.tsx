import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../../state/store';
import PostComponent from './index';
import { Post } from '../../../types';
import { act } from 'react-dom/test-utils';

const dummyPost: Post = { _id: 1, text: 'First post' }

let component: any;

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
        const deleteLink = component.queryByLabelText("post-delete");
        expect(deleteLink).toBeInTheDocument();
    });  
})
