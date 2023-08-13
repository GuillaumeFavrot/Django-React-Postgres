import React from 'react';
import MessageComponent from '../message';
import { Message, Messages } from '../../types';

export default function MessageList({ messages }: Messages) {
    return (
        <>
            {messages.map((message: Message) => (
                <MessageComponent key={message._id} _id={message._id} text={message.text}/>

            ))}
        </>
    );
}

