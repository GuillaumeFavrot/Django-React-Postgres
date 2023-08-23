import React, { useState } from 'react'
import Button from '../button'
import { simpleFormProps } from '../../../types'

function SimpleForm({label, onSubmitFunction, ariaLabel, buttonContent}: simpleFormProps) {            

    //Local state setup
    const [newPost, setNewPost] = useState('')

    //Local state update function
    const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {setNewPost(e.target.value)}

    //Button aria-label setup
    const buttonAriaLabel = `${ariaLabel}-submit`

    //Onsubmit function setup
    const submit = () => {
        onSubmitFunction(newPost)
        setNewPost('') //Reset local state
    }

    return (
        <>
            <label className=''>{label}</label>
            <input onChange={(e) => onPostChange(e)} className='' value={newPost} aria-label='post-update-input'/>
            <Button content={buttonContent} onClickFunction={submit} ariaLabel={buttonAriaLabel}/>
        </>
    )
}

export default SimpleForm

