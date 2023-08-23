import React, { useState } from 'react'
import Button from '../button'
import { simpleFormProps } from '../../../types'

function SimpleForm({title, onSubmitFunction, ariaLabel, buttonContent}: simpleFormProps) {            

    //Local state setup
    const [data, setData] = useState('')

    //Local state update function
    const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {setData(e.target.value)}

    //Button aria-label setup
    const buttonAriaLabel = `${ariaLabel}-submit`

    //Onsubmit function setup
    const submit = () => {
        onSubmitFunction(data)
        setData('') //Reset local state
    }

    return (
        <div className='simple-form'>
            <h4 className='form-title'>{title}</h4>
            <div className='form-group'>
                <input onChange={(e) => onPostChange(e)} className='form-input' value={data} aria-label='post-update-input'/>
                <Button content={buttonContent} onClickFunction={submit} ariaLabel={buttonAriaLabel}/>
            </div>
        </div> 
    )
}

export default SimpleForm

