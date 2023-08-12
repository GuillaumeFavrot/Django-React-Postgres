import React ,{useEffect} from 'react';
import ApiTestForm from '../../components/messageForm'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { getMessages, selectStatus } from '../../state/features/messageSlice'

export default function Main() {
  const messagesStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (messagesStatus === 'idle') {
      dispatch(getMessages())
    }
  }, [])

  return (
    <div className='application container d-flex justify-content-center align-items-center'>
      <ApiTestForm />
    </div>
  )
}

