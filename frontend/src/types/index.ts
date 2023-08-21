/* istanbul ignore file */
export interface Post {
    _id?: number,
    text: string,
}

export type Posts = Post[]

export interface PostsProp {
    posts: Post[]
}