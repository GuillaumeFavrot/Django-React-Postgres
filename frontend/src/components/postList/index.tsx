import React from 'react';
import PostComponent from '../post';
import { Post, Posts } from '../../types';

export default function PostList({ posts }: Posts) {
    return (
        <>
            {posts.map((post: Post) => (
                <PostComponent key={post._id} _id={post._id} text={post.text}/>
            ))}
        </>
    );
}
