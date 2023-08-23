import React, { useState } from 'react'
import { useUpdatePostMutation } from '../../state/features/api'
import { modificationFormProps } from '../../types'
import { useAppDispatch } from '../../hooks'
import { updateRequestStatus } from '../../state/features/requestStatus'
import requestErrorHandler from '../../utils/requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';


function PostModificationForm({_id, setToDisplay}: modificationFormProps) {

    //Update post mutation hooks setup
    const [updatePostMutation, {error}] = useUpdatePostMutation()

    //Local state setup
    const [newPost, setNewPost] = useState('')

    //Local state update function
	const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {setNewPost(e.target.value)}

    //useAppDispatch hook setup
    const dispatch = useAppDispatch()

    //Post update function
	const postModificationRequest = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		if (typeof _id !== 'undefined') {
            try {
                await updatePostMutation({text : newPost, _id : _id}).unwrap()
                dispatch(updateRequestStatus('200', 'PUT request successful'))
                setToDisplay()
                setNewPost('') 
            } catch (err) {
                console.error('Failed to update the post: ', err)
                const processed_error = requestErrorHandler(error as FetchBaseQueryError)
                dispatch(updateRequestStatus(processed_error['statusCode'], processed_error['statusText'] ))
            }
		}
	}

    return (
        <>
            <input onChange={(e) => onPostChange(e)} className='' value={newPost} aria-label='post-update-input'/>
            <a onClick={(e) => postModificationRequest(e)} className='' type='submit' href='/' aria-label='post-update-submit'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
            </a>
        </>
    )
}

export default PostModificationForm