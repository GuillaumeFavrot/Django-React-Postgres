import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostComponent from './index';
import { Post } from '../../types';

const dummyPost: Post = { _id: 1, text: 'First post' }

let component: any;

describe('PostComponent', () => {
    render(
        <Provider store={store}>
          <PostComponent key={dummyPost._id} _id={dummyPost._id} text={dummyPost.text}/>
        </Provider>
      );
})

it('should display the post text', () => {
    const postText = screen.getByText(dummyPost.text)
    expect(postText).toBeInTheDocument();
    });

// it('should display the post delete button', () => {
//     const deleteLink = screen.queryByTestId('Delete');
//     expect(deleteLink).toBeInTheDocument();
//     }
// );  

test('should display the post delete button', () => {
    render(
        <Provider store={store}>
          <PostComponent key={dummyPost._id} _id={dummyPost._id} text={dummyPost.text}/>
        </Provider>
    );
    const postList = screen.queryByTestId("Delete");
    expect(postList).toBeInTheDocument();
});