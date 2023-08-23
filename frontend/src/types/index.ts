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
    setToDisplay: Function
}

export interface buttonProps {
    content : string | React.JSX.Element
    onClickFunction: Function
    ariaLabel: string
    color?: string
}

export interface simpleFormProps {
    title: string
    onSubmitFunction: Function
    ariaLabel: string
    buttonContent: string | React.JSX.Element
}
