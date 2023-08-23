import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from './features/api';
import appViewReducer from './features/appView';
import requestStatusReducer from './features/requestStatus';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    appView: appViewReducer,
    requestStatus: requestStatusReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
