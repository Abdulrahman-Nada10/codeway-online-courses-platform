import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { SearchState } from './searchSlice';
import favoritesReducer from './favoritesSlice';
import coursesReducer from "./courseSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

