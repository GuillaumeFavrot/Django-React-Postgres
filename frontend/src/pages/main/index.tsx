import React ,{useEffect} from 'react';
import ApiTestForm from '../../components/messageForm'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { getMessages, selectStatus } from '../../state/features/messageSlice'

export default function Main() {

  return (
    <div className='application container d-flex justify-content-center align-items-center'>
      <ApiTestForm />
    </div>
  )
}

