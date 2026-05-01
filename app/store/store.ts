import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import favoritesReducer from './favoritesSlice';
import coursesReducer from "./courseSlice";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    courses: coursesReducer,
    auth: authReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

