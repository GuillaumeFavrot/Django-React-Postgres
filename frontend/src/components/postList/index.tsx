import React from 'react';
import PostComponent from '../post';
import { Post } from '../../types';
import { useGetPostsQuery } from '../../state/features/api'
import { useAppDispatch } from '../../hooks'
import { updateRequestStatus } from '../../state/features/requestStatus'

export default function PostList() {

    //Get posts mutation hook setup
    const { data: posts, isLoading, isFetching, isSuccess, isError, error } = useGetPostsQuery()

    //useAppDispatch hook setup
    const dispatch = useAppDispatch()
    
    //Post content setup
    let postContent: JSX.Element | string = 'No post available in DB'
    
    //Request status setup
    let statusCode = ''
    let statusText = ''


    if (isLoading) {
        postContent = 'Loading...'
    } 
    
    else if (isSuccess) {
        if (posts && posts.length > 0) {
            postContent =  <>
                {posts.map((post: Post) => (
                    <PostComponent key={post._id} _id={post._id} text={post.text}/>
                ))}        
            </>
            statusCode = '200'
            statusText = 'GET request successful'
            dispatch(updateRequestStatus(statusCode, statusText ))           

        }
        if (isFetching) {
            postContent = 'Updating...' 
        }
    } 
  
    else if (isError) {
        if (error && 'status' in error) {
            statusText = error.status.toString()
        }
        if (error && 'originalStatus' in error) {
            statusCode = error.originalStatus.toString()
        }
        dispatch(updateRequestStatus(statusCode, statusText ))
    }


    return (
        <>
            <div className={isFetching ? 'disabled' : ''}>{postContent}</div>
        </>
    );
}
