import React from 'react'
import { useAppSelector } from '../../../hooks'
import { selectStatusString } from '../../../state/features/requestStatus'

function RequestStatusComponent() {

    //Retrieval of the requests status string from the app states
    const statusString = useAppSelector(selectStatusString)

    return (
        <div className='container p-2'>
            <h4 className='font-bold text-center mb-1'>Server response</h4>
            <p className='text-center'>{statusString}</p>
        </div>
    )
}

export default RequestStatusComponent