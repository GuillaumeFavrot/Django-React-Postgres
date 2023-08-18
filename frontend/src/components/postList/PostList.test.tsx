import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostList from "./index";
import { Post } from "../../types";

const dummyPosts: Post[] = [
    { _id: 1, text: 'First post' },
    { _id: 2, text: 'Second post' },
    { _id: 3, text: 'Third post' },
];

test('API Tester title', async () => {
    render(
        <Provider store={store}>
            <PostList posts={dummyPosts} />
        </Provider>
    );
    const postList = screen.queryAllByLabelText("post");
    expect(postList).toHaveLength(3);
});

