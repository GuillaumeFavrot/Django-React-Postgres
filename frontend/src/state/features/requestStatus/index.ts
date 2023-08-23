import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { statusStringType } from '../../../types';

export const requestStatusSlice = createSlice({
    name: 'requestStatus',
    initialState: {
        statusString: '',
    },
    reducers: {
        updateRequestStatus: {
			prepare: (statusCode: string, statusText: string) => {
                let statusString = `${statusCode}: ${statusText}`;
                return {
                    payload: statusString 
                };
            },
            reducer: (state, action: PayloadAction<statusStringType>) => {
                state.statusString = action.payload;
            }
        }
    },
})

export const selectStatusString = (state: RootState) => state.requestStatus.statusString


export const {updateRequestStatus} = requestStatusSlice.actions
export default requestStatusSlice.reducer
