import React from 'react';
import PostComponent from '../post';
import { Post, PostsProp } from '../../types';

export default function PostList({ posts }: PostsProp) {
    return (
        <>
            {posts.map((post: Post) => (
                <PostComponent key={post._id} _id={post._id} text={post.text}/>
            ))}
        </>
    );
}
