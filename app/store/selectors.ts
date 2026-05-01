import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

const selectCoursesState = (state: RootState) => state.courses;

export const selectAllCourses = (state: RootState) => state.courses.courses;
export const selectStatusFilter = (state: RootState) => state.courses.statusFilter;
export const selectSearchQuery = (state: RootState) => state.courses.searchQuery;
export const selectDeleteModal = (state: RootState) => state.courses.deleteModal;
export const selectIsLoading = (state: RootState) => state.courses.isLoading;

export const selectFilteredCourses = createSelector(
  selectAllCourses,
  selectStatusFilter,
  selectSearchQuery,
  (courses, statusFilter, searchQuery) => {
    return courses.filter(course => {
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesSearch = !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }
);

export const selectCoursesStats = createSelector(
  selectAllCourses,
  (courses) => ({
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    pending: courses.filter(c => c.status === 'pending').length,
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
  })
);

export const selectQuiz = (state: RootState) => state.quiz.quiz;

export const selectCurrentQuestion = (state: RootState) => {
  const quiz = state.quiz.quiz;
  return quiz?.questions[state.quiz.currentQuestionIndex];
};

export const selectProgress = (state: RootState) => {
  const quiz = state.quiz.quiz;
  if (!quiz) return 0;

  return Math.round(
    (state.quiz.currentQuestionIndex / quiz.questions.length) * 100
  );
};

export const selectAnsweredCount = (state: RootState) => {
  return Object.keys(state.quiz.answers).length;
};

export const selectRemainingCount = (state: RootState) => {
  const quiz = state.quiz.quiz;
  if (!quiz) return 0;

  return quiz.questions.length - Object.keys(state.quiz.answers).length;
};

export const selectIsQuizActive = (state: RootState) => {
  const { quiz, isFinished, timeLeft, endTime } = state.quiz;
  return !!quiz && !isFinished && timeLeft > 0 && endTime && Date.now() < endTime;
};

export const selectQuizTimeLeft = (state: RootState) => state.quiz.timeLeft;
export const selectQuizEndTime = (state: RootState) => state.quiz.endTime;
export const selectQuizIsFinished = (state: RootState) => state.quiz.isFinished;
export const selectQuizId = (state: RootState) => state.quiz.quiz?.id;

export const selectQuizUserId = (state: RootState) => state.quiz.userId;
export const selectQuizCompleted = (state: RootState) => state.quiz.isCompleted;
export const selectQuizActive = (state: RootState) => {
  const { quiz, isFinished, timeLeft, endTime, isCompleted } = state.quiz;
  return !!quiz && !isFinished && !isCompleted && timeLeft > 0 && endTime && Date.now() < endTime;
};
