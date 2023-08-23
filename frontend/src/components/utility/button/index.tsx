import React from 'react'
import { buttonProps } from '../../../types'

function Button({content, onClickFunction, ariaLabel}: buttonProps) {
    
    return (
        <button className='' onClick={() => onClickFunction()} aria-label={ariaLabel}>
                {content}
        </button>
    )
}

export default Button