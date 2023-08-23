import React from 'react'
import { useAppSelector } from '../../hooks'
import { selectStatusString } from '../../state/features/requestStatus'

function RequestStatusComponent() {
    
    const statusString = useAppSelector(selectStatusString)
    return (
        <div>
            <h4>Server response</h4>
            <p>{statusString}</p>
        </div>
    )
}

export default RequestStatusComponent