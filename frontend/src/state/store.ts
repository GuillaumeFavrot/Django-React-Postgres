import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postReducer from './features/postSlice';
import { apiSlice } from './api';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
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
