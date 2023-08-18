import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { addPost, getPosts, selectStatus, selectPosts, selectStatusText } from '../../state/features/postSlice'
import PostList from '../postList'
import { Posts } from '../../types'


export default function PostForm() {

  const posts = useAppSelector(selectPosts)
  const postsStatus = useAppSelector(selectStatus)
  const postsStatusText = useAppSelector(selectStatusText)
  
  const [newPost, setNewPost] = useState('')
  const dispatch = useAppDispatch()
  

  let content: string = "Failed to load posts"

  if (postsStatus === 'loading') {
    content = "Loading..."
  } else if (postsStatus === 'idle') {
    content =  postsStatusText    
  }

  let postContent: JSX.Element | string = "No post available in DB"

  if (posts.length > 0) {
    postContent = <PostList posts={posts}/>
  }

  function onPostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPost(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addPost({text : newPost}))
    setNewPost('')
  }

  const getAllPosts = () => {
    if (postsStatus === 'idle') {
      dispatch(getPosts())
    }
  }

  return (
    <div>
      <h1 className='text-center main-title'>API Tester</h1>
      <form onSubmit={(e)=>{onSubmit(e)}} className='d-flex flex-column justify-content-center'>
        <div className="mb-3">
          <label className="form-label text-center">Enter your test post</label>
          <input onChange ={(e)=>onPostChange(e)} type="testPst" className="add-post-form" id="testPost" value={newPost} data-testid="NewMessageInput"></input>
        </div>
        <button type="submit" className="add-post-submit" data-testid="Submit">Submit</button>
      </form>
      <button onClick={() => getAllPosts()} className="get-posts" data-testid="Get-posts">Get posts</button>
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