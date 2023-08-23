import React from 'react';
import PostComponent from '../post';
import { Post } from '../../../types';
import { useGetPostsQuery } from '../../../state/features/api'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectStatus, updateRequestStatus } from '../../../state/features/requestStatus'
import requestErrorHandler from '../../../utils/requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

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

    //Retrieval of the request status code from the app state
    const status = useAppSelector(selectStatus)

    //Post list content setup
    ////If the request is loading, display a loading message
    if (isLoading) {
        postContent = 'Loading...'
    } 
    
    ////If the request is successful...
    else if (isSuccess) {
        ////and there are posts in the DB, display the posts
        if (posts && posts.length > 0) {
            postContent =  <>
                {posts.map((post: Post) => (
                    <PostComponent key={post._id} _id={post._id} text={post.text}/>
                ))}        
            </>
            ////If no status code is available (ie this request is not a refetch triggered by another request), update the request status
            if (status === '') {
                statusCode = '200'
                statusText = 'GET request successful'
                dispatch(updateRequestStatus(statusCode, statusText))                
            }
        }
        ////If a refetch is triggered by another request, display a loading message
        if (isFetching) {
            postContent = 'Updating...' 
        }
    } 
    
    ////If the request is not successful, display an error message
    else if (isError) {
        const processed_error = requestErrorHandler(error as FetchBaseQueryError)
        dispatch(updateRequestStatus(processed_error['statusCode'], processed_error['statusText'] ))    
    }

    return (
        <>
            <div className={isFetching ? 'opacity-40' : ''}>{postContent}</div>
        </>
    );
}
