import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import PostList from './index';

test('Renders no posts', async () => {
    render(
        <Provider store={store}>
            <PostList/>
        </Provider>
    );

    const postList = screen.queryByText('No post available in DB');
    expect(postList).toBeInTheDocument();
});

