import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { requestStatusPayload } from '../../../types';

export const requestStatusSlice = createSlice({
    name: 'requestStatus',
    initialState: {
        statusString: '',
        status: '',
    },
    reducers: {
        updateRequestStatus: {
			prepare: (statusCode: string, statusText: string) => {
                let statusString = `${statusCode}: ${statusText}`;
                return {
                    payload: {statusString, statusCode}
                };
            },
            reducer: (state, action: PayloadAction<requestStatusPayload>) => {
                state.statusString = action.payload.statusString
                state.status = action.payload.statusCode
            }
        }
    },
})

export const selectStatusString = (state: RootState) => state.requestStatus.statusString
export const selectStatus = (state: RootState) => state.requestStatus.status

export const {updateRequestStatus} = requestStatusSlice.actions
export default requestStatusSlice.reducer
