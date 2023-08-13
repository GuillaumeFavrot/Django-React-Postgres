import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { addMessage, getMessages, selectStatus, selectMessages, selectStatusText } from '../../state/features/messageSlice'
import MessageList from '../messageList'
import { Spinner } from '../spinner'


export default function ApiTestForm() {

  const messages = useAppSelector(selectMessages)
  const messagesStatus = useAppSelector(selectStatus)
  const messagesStatusText = useAppSelector(selectStatusText)
  
  const [newMessage, setNewMessage] = useState('')
  const dispatch = useAppDispatch()
  

  let content: JSX.Element | string = "Failed to load messages"

  if (messagesStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (messagesStatus === 'idle') {
    content = <MessageList messages={messages} />     
  }

  function onMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewMessage(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addMessage({text : newMessage}))
    setNewMessage('')
  }

  const getPosts = () => {
    if (messagesStatus === 'idle') {
      dispatch(getMessages())
    }
  }

  return (
    <div>
      <h1 className='text-center'>API Tester</h1>
      <form onSubmit={(e)=>{onSubmit(e)}} className='d-flex flex-column justify-content-center'>
        <div className="mb-3">
          <label className="form-label text-center">Enter your test message</label>
          <input onChange ={(e)=>onMessageChange(e)} type="testMessage" className="form-control" id="testMessage" value={newMessage}></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <button onClick={() => getPosts()}>Get posts</button>
      <hr />
      <div>
        <h4 className='text-center w-100'>Server response</h4>
        <p className='text-center w-100'>{messagesStatusText}</p>
      </div>
      <hr />
      {content}
    </div>
  )
}