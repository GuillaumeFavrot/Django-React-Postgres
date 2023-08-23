import React, { useState } from 'react'
import Button from '../button'
import { simpleFormProps } from '../../../types'

function SimpleForm({label, onSubmitFunction, ariaLabel, buttonContent}: simpleFormProps) {            

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
        <div className=''>  
            <label className=''>{label}</label>
            <input onChange={(e) => onPostChange(e)} className='' value={data} aria-label='post-update-input'/>
            <Button content={buttonContent} onClickFunction={submit} ariaLabel={buttonAriaLabel}/>
        </div>
    )
}

export default SimpleForm

