import React, { useState } from 'react'
import { Post } from '../../../types'
import { useDeletePostMutation } from '../../../state/features/api'
import PostModificationForm from '../postModificationForm'
import { useAppDispatch } from '../../../hooks'
import { updateRequestStatus } from '../../../state/features/requestStatus'
import requestErrorHandler from '../../../utils/requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export default function PostComponent({_id, text}: Post) {

	//Delete post mutation hooks setup
	const [deletePostMutation] = useDeletePostMutation()

	//Local state setup
	const [postFormState, setPostFormState] = useState('display')

	//Local state update function
	const setToModification = () => {setPostFormState('modification')}
	const setToDisplay = () => {setPostFormState('display')}

	//useAppDispatch hook setup
	const dispatch = useAppDispatch()
	
	//Post deletion function
	const postDeletionRequest = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		if (typeof _id !== 'undefined') {
			try {
				await deletePostMutation(_id).unwrap()
                dispatch(updateRequestStatus('200', 'DELETE request successful'))
			} catch (err) {
				const processed_error = requestErrorHandler(err as FetchBaseQueryError)
                dispatch(updateRequestStatus(processed_error['statusCode'], processed_error['statusText'] ))
			}
		}
	}

	return (
		<div className='' aria-label="post" >
			<form className=''>
				<div className='' >
					<a onClick={(e) => postDeletionRequest(e)} className='' type='submit' href='/' aria-label='post-delete'>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
						<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
						</svg>
					</a>
					<p onClick={() => setToModification()} className={postFormState === 'display' ? 'mb-0 d-block' : 'd-none'} aria-label="post-text">
						{text}
					</p>
					<div className={postFormState === 'display' ? 'hidden' : 'flex'} aria-label='post-update'>
						<PostModificationForm _id={_id} setToDisplay={setToDisplay}/>
					</div>
				</div>
			</form>
			<hr />
		</div>
	)
}