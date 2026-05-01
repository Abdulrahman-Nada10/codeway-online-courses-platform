import { mockQuizzes } from './mockQuizzes';

export const getQuizById = (id: string) => {
  return mockQuizzes.find((quiz) => quiz.id === id);
};