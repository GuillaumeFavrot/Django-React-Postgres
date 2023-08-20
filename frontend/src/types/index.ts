/* istanbul ignore file */
type status = 'idle' | 'loading' | 'failed'
type statusText = string

export interface Post {
    _id?: number,
    text: string,
}

export type Posts = Post[]

export interface PostsProp {
    posts: Post[]
}

export interface PostsState {
    posts: Posts
    status: status
    statusText: statusText
}