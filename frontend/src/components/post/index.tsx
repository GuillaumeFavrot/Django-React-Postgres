import React, { useState } from 'react'
import { Post } from '../../types'
import { useDeletePostMutation, useUpdatePostMutation } from '../../state/features/api'


export default function PostComponent({_id, text}: Post) {

  //Delete and update post mutation hooks setup
  const [deletePostMutation] = useDeletePostMutation()
  const [updatePostMutation] = useUpdatePostMutation()

  //Local state setup
  const [postFormState, setPostFormState] = useState('display')
  const [newPost, setNewPost] = useState('')

  //Local state update function
  const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {setNewPost(e.target.value)}
  const setToModification = () => {setPostFormState('modification')}
  const setToDisplay = () => {setPostFormState('display')}

  //Post update function
  const postModificationRequest = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (typeof _id !== 'undefined') {
      try {
        await updatePostMutation({text : newPost, _id : _id}).unwrap()
      } catch (err) {
        console.error('Failed to update the post: ', err)
      }
      setToDisplay()
      setNewPost('') 
    }
  }
  
  //Post deletion function
  const postDeletionRequest = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (typeof _id !== 'undefined') {
      try {
        await deletePostMutation(_id).unwrap()
      } catch (err) {
        console.error('Failed to delete the post: ', err)
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
          <div className={postFormState === 'display' ? 'd-none' : 'd-flex'} aria-label='post-update'>
            <input onChange={(e) => onPostChange(e)} className='' value={newPost} aria-label='post-update-input'/>
            <a onClick={(e) => postModificationRequest(e)} className='' type='submit' href='/' aria-label='post-update-submit'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
            </a>
          </div>
        </div>
      </form>
      <hr />
    </div>
  )
}