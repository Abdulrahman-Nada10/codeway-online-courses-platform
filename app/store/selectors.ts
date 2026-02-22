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