import React from 'react'
import { buttonProps } from '../../../types'

function Button({content, onClickFunction, ariaLabel}: buttonProps) {

    console.log(ariaLabel)
    return (
        <>
            <button onClick={(e) => onClickFunction()} aria-label={ariaLabel}>
                {content}
            </button>
        </>
    )
}

export default Button