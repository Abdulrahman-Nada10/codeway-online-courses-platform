import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { SearchState } from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type RootState = {
  search: SearchState;
};

export type AppDispatch = typeof store.dispatch;

