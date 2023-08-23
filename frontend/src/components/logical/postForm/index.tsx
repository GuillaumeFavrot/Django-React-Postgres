import React from 'react'
import { useAddPostMutation } from '../../../state/features/api'
import requestErrorHandler from '../../../utils/requestErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from '../../../hooks'
import { updateRequestStatus } from '../../../state/features/requestStatus'
import SimpleForm from '../../utility/simpleForm';


export default function PostForm() {

  //Add post mutation hook setup
  const [addPostMutation, { isLoading }] = useAddPostMutation()

  //useAppDispatch hook setup
  const dispatch = useAppDispatch()

  //Add post mutation submit function
  const onSubmit = async (data: string) => {
    if (!isLoading) {
      try {
        await addPostMutation({text: data}).unwrap()
        dispatch(updateRequestStatus('200', 'POST request successful'))     
      } catch (err) {
        const processed_error = requestErrorHandler(err as FetchBaseQueryError)
        dispatch(updateRequestStatus(processed_error['statusCode'], processed_error['statusText'] ))
      }
    }
  }
  
  return (
      <SimpleForm title='Enter your test post' onSubmitFunction={onSubmit} ariaLabel='post-add' buttonContent='Submit'/>
  )
}