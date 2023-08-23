import React, { useState } from 'react'
import { useAddPostMutation } from '../../state/features/api'
import requestErrorHandler from '../../utils/requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from '../../hooks'
import { updateRequestStatus } from '../../state/features/requestStatus'


export default function PostForm() {

  //Add post mutation hook setup
  const [addPostMutation, { isLoading, error }] = useAddPostMutation()

  //Local state setup
  const [newPost, setNewPost] = useState('')

  //Local state update function
  function onPostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPost(e.target.value)
  }

  //useAppDispatch hook setup
  const dispatch = useAppDispatch()

  //Add post mutation submit function
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([newPost].every(Boolean) && !isLoading) {
      try {
        await addPostMutation({text: newPost}).unwrap()
        setNewPost('')
        dispatch(updateRequestStatus('200', 'POST request successful'))     
      } catch (err) {
        console.error('Failed to save the post: ', err)
        const processed_error = requestErrorHandler(error as FetchBaseQueryError)
        dispatch(updateRequestStatus(processed_error['statusCode'], processed_error['statusText'] ))
      }
    }
  }

  return (
    <div>
      <form onSubmit={(e)=>{onSubmit(e)}} className=''>
        <div className=''>
          <label className=''>Enter your test post</label>
          <input onChange ={(e)=>onPostChange(e)} type='testPost' className='' id='testPost' aria-label='post-add-input' value={newPost}></input>
        </div>
        <button type='submit' className='' aria-label='post-add-submit'>Submit</button>
      </form>
    </div>
  )
}