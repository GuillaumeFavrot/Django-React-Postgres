type status = 'idle' | 'loading' | 'failed'
type statusText = string

export interface Message {
    _id?: number,
    text: string,
}

export interface Messages {
    messages: Message[]
}

export interface MessagesState {
    messages: Messages
    status: status
    statusText: statusText
}