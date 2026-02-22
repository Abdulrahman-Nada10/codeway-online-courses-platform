import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CoursesState, Course, CourseStatus } from './types';

const mockCourses: Course[] = Array.from({ length: 6 }, (_, i) => ({
  id: `course-${i + 1}`,
  title: 'أساسيات تصميم واجهة المستخدم',
  description: 'دورة شاملة في تصميم واجهات المستخدم الحديثة باستخدام أحدث الأدوات والتقنيات',
  category: 'design',
  level: 'beginner',
  price: 130000,
  status: i === 6 ? 'pending' : 'active',
  rating: 4.8,
  studentsCount: 450,
  lessonsCount: 24,
  duration: '12 ساعة',
  revenue: i === 6 ? 0 : 130000,
  thumbnail: null,
  lessons: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})).concat([{
  id: 'course-7',
  title: 'أساسيات تصميم واجهة المستخدم',
  description: 'دورة شاملة في تصميم واجهات المستخدم الحديثة',
  category: 'design',
  level: 'beginner',
  price: 0,
  status: 'pending',
  rating: 0,
  studentsCount: 450,
  lessonsCount: 24,
  duration: '12 ساعة',
  revenue: 0,
  thumbnail: null,
  lessons: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}]);

const initialState: CoursesState = {
  courses: mockCourses,
  selectedCourse: null,
  statusFilter: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
  deleteModal: {
    isOpen: false,
    courseId: null,
  },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<CourseStatus | 'all'>) {
      state.statusFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addCourse(state, action: PayloadAction<Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'studentsCount' | 'revenue'>>) {
      const newCourse: Course = {
        ...action.payload,
        id: `course-${Date.now()}`,
        rating: 0,
        studentsCount: 0,
        revenue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.courses.push(newCourse);
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = { ...action.payload, updatedAt: new Date().toISOString() };
      }
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(c => c.id !== action.payload);
      state.deleteModal = { isOpen: false, courseId: null };
    },
    openDeleteModal(state, action: PayloadAction<string>) {
      state.deleteModal = { isOpen: true, courseId: action.payload };
    },
    closeDeleteModal(state) {
      state.deleteModal = { isOpen: false, courseId: null };
    },
    setSelectedCourse(state, action: PayloadAction<Course | null>) {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  setStatusFilter,
  setSearchQuery,
  addCourse,
  updateCourse,
  deleteCourse,
  openDeleteModal,
  closeDeleteModal,
  setSelectedCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;