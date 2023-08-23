/* istanbul ignore file */
export interface Post {
    _id?: number,
    text: string,
}

export type Posts = Post[]

export interface PostsProp {
    posts: Post[]
}

export type requestStatusPayload = {
    statusString: string,
    statusCode: string,
}

export interface modificationFormProps {
    _id: number | undefined
    setToDisplay: () => void
}