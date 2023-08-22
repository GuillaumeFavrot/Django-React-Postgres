import React from 'react';
import ApiTestForm from '../../components/postForm'
import PostList from '../../components/postList'
import { useGetPostsQuery } from '../../state/features/api'


export default function Main() {

  //Get posts mutation hook setup
  const { data: posts, isLoading, isFetching, isSuccess, isError, error } = useGetPostsQuery()

  
  //Post content setup
  let content: string = 'Failed to load posts'
  let postContent: JSX.Element | string = 'No post available in DB'

  if (isLoading) {
    content = 'Loading...'
  } 
  
  else if (isSuccess) {
    if (posts && posts.length > 0) {
        postContent = <PostList posts={posts}/>
      }
    isFetching ? content = 'Updating...' : content = 'Get request successfull'
  } 
  
  else if (isError) {

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


  return (
    <div >
      <ApiTestForm />
      <hr />
      <div>
        <h4 className='text-3xl font-bold underline'>Server response</h4>
        <p>{content}</p>
      </div>
      <hr />
      <div className={isFetching ? 'disabled' : ''}>{postContent}</div>
    </div>
  )
}

