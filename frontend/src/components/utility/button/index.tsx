import React from 'react'
import { buttonProps } from '../../../types'

function Button({color, content, onClickFunction, ariaLabel}: buttonProps) {

    let className: string;

    switch (color) {
        case 'secondary':
            className = 'btn btn-secondary'
            break;
        case 'success':
            className = 'btn btn-success'
            break;
        case 'danger':
            className = 'btn btn-danger'
            break;
        case 'warning':
            className = 'btn btn-warning'
            break;
        default:
            className = 'btn btn-primary'
            break;
    }
    
    const trigger = () => {
        if (onClickFunction) {
            onClickFunction()
        }
    }

    return (
        <button type='submit' className={className} onClick={() => trigger()} aria-label={ariaLabel}>
                {content}
        </button>
    )
}

export default Button