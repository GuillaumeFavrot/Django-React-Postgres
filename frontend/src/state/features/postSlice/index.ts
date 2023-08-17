// This file houses all reducers and action creators functions.
// All action creators and reducers can now be written in the same file known as a slice. 
// Its is possible to write all redux logic in one single slice file however splitting this logic in multiple slices is also possible.
// There is multiple ways to write this file.
// In this template this file has been setup to use :
//  => createAsyncThunk : this function is the new recommended way to handle asynchronous call within redux 
//  => Axios : this packages handles http request. It has been chosen in this template because it has better error handling than regular fetch requests
//  => Async/await : to handle asynchronous db calls. 
// This template features the four main types of DB requests.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { Post } from '../../../types';
import { RootState } from '../../store';
import { api } from '../../../api';

// Action creators
// All action creators are rigged to handle basic CRUD operations and throw query errors.
// Just modify the function and variable names to suit your needs.

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    try {
      const response = await api.get(`/posts/`)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post: Post) => {
    try{
      const response = await api.post(`/posts/add/`, post)
      return JSON.stringify(response)
    }
    catch (e) {
      let errorMessage = "Error"
      if (e instanceof Error) errorMessage = e.message
      return JSON.stringify({
        data: [],
        status: "Null",
        statusText: errorMessage
      })
    }
  }
)

export const modifyPost = createAsyncThunk(
  'posts/modifyPost',
  async (newPost: Post) => {
    try {
      const response = await api.put(`/posts/update/`, newPost)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (id: number) => {
    console.log(id)
    try {
      const response = await api.delete(`/posts/delete/`, {data : {_id : id}})
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

// Initial state and reducers
// Each CRUD action have is own set of functions in order to modify the state whether the action is pending, fulfilled or rejected.
// All request errors are handled. 
// However the "pending" spinner has not been implemented because the nature of test requests does not require it (they are almost instanteneous).
// All reducers are standard and do not need many modifications except the name of the action creators.

const initialState = {
  posts: [],
  status: 'idle',
  statusText: '',
}

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET reducers  
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPosts.fulfilled, (state, { payload } ) => {
        let res = JSON.parse(payload)
        state.status = 'idle'
        state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
        state.posts = res.data
      })
      .addCase(getPosts.rejected, (state, { error } ) => {
        state.status = 'failed'
        state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
      })

      //POST reducers
      .addCase(addPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addPost.fulfilled, (state, { payload } ) => {
        let res = JSON.parse(payload)
        state.status = 'idle'
        state.statusText = res.status !== 'Null' ? `POST Request ${res.statusText} with status code ${res.status}` : 'POST request failed with status code 404'  
        state.posts = res.data
      })
      .addCase(addPost.rejected, (state, { error }) => {
        state.status = 'failed'
        state.statusText = `POST ${error.message}`
      })

      //PUT reducers
      .addCase(modifyPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(modifyPost.fulfilled, (state, { payload } ) => {
        let res = JSON.parse(payload)
        state.status = 'idle'
        state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
        state.posts = res.data
      })
      .addCase(modifyPost.rejected, (state, { error }) => {
        state.status = 'failed'
        state.statusText = `PUT ${error.message}`
      })
    
      //DELETE reducers
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deletePost.fulfilled, (state, { payload } ) => {
        let res = JSON.parse(payload)
        state.status = 'idle'
        state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
        state.posts = res.data
      })
      .addCase(deletePost.rejected, (state, { error }) => {
        state.status = 'failed'
        state.statusText = `DELETE ${error.message}`
      })
  },
})

export const selectPosts = (state: RootState) => state.posts.posts
export const selectStatus = (state: RootState) => state.posts.status
export const selectStatusText = (state: RootState) => state.posts.statusText


const postReducer = postSlice.reducer
export default postReducer