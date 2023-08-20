import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { addPost, } from '../../state/features/postSlice'
import PostList from '../postList'
import { useGetPostsQuery } from '../../state/api'


export default function PostForm() {

  const [newPost, setNewPost] = useState('')
  const dispatch = useAppDispatch()

  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery()

  let content: string = "Failed to load posts"
  let postContent: JSX.Element | string = "No post available in DB"

  if (isLoading) {
    content = "Loading..."
  } else if (isSuccess) {
    content =  "Get request successfull"
    postContent = <PostList posts={posts}/>   
  } else if (isError) {
    let statusCode : string = ''
    let errorStatus : string = ''
    if (error && 'status' in error) {
      errorStatus = error.status.toString()
    }
    if (error && 'originalStatus' in error) {
      statusCode = error.originalStatus.toString()
    }
    content = `${errorStatus} with status code : ${statusCode}`
  }
  
  function onPostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPost(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addPost({text : newPost}))
    setNewPost('')
  }

  return (
    <div>
      <h1 className='' aria-label="main-title">API Tester</h1>
      <form onSubmit={(e)=>{onSubmit(e)}} className='d-flex flex-column justify-content-center'>
        <div className="mb-3">
          <label className="">Enter your test post</label>
          <input onChange ={(e)=>onPostChange(e)} type="testPost" className="" id="testPost" aria-label="post-add-input" value={newPost}></input>
        </div>
        <button type="submit" className="" aria-label="post-add-submit">Submit</button>
      </form>
      <hr />
      <div>
        <h4 className='text-center w-100'>Server response</h4>
        <p className='text-center w-100'>{content}</p>
      </div>
      <hr />
      {postContent}
    </div>
  )
}