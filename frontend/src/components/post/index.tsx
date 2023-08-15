import React, { useState } from 'react'
import { modifyPost, deletePost } from '../../state/features/postSlice'
import { Post } from '../../types'
import { useAppDispatch } from '../../hooks'


export default function PostComponent({_id, text}: Post) {

  const dispatch = useAppDispatch()

  const [postState, setPostState] = useState('display')

  const [newPost, setNewPost] = useState('')

  const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(e.target.value)
  }

  const postModification = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(modifyPost(
      {
        text : newPost,
        _id : _id
      }
    ))
    setToDisplay()
    setNewPost('')    
  }
  
  const postDeleteRequest = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (typeof _id === 'undefined') {
      return
    }
    dispatch(deletePost(_id))
  }

  const setToModification = () => {
    setPostState('modification')
  }

  const setToDisplay = () => {
    setPostState('display')
  }

  return (
    <div className='mb-2' data-testid="post" >
      <h6>Post : </h6> 
      <form className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-start' >
          <a onClick={(e) => postDeleteRequest(e)} className="text-danger me-1" type="submit" href="/" title='Delete' data-testid='Delete'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
          </a>
          <p onClick={() => setToModification()} className={postState === 'display' ? 'mb-0 d-block' : 'd-none'}>
            {text}
          </p>
          <div className={postState === 'display' ? 'd-none' : 'd-flex'} data-testid="Modify">
            <input onChange={(e) => onPostChange(e)} className='form-control-sm' value={newPost} data-testid="Input"/>
            <a onClick={(e) => postModification(e)} className="text-danger ps-1" type="submit" href="/">
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