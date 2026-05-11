export interface Course {
  id: number;
  title: string;
  instructor: string;
  completedLessons: number;
  totalLessons: number;
  totalHours: number;
  completedHours: number;
  progress: number;
  isCompleted: boolean;
  image: string;
  category: 'all' | 'in_progress' | 'completed';
  lastWatched?: string;
}

export const allCourses: Course[] = [
  {
    id: 1,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 18,
    totalLessons: 25,
    totalHours: 20,
    completedHours: 12,
    progress: 65,
    isCompleted: false,
    image: '/card.jpg',
    category: 'in_progress',
    lastWatched: 'اليوم',
  },
  {
    id: 2,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 15,
    totalLessons: 30,
    totalHours: 15,
    completedHours: 7,
    progress: 50,
    isCompleted: false,
    image: '/card.jpg',
    category: 'in_progress',
    lastWatched: 'اليوم',
  },
  {
    id: 3,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 50,
    totalLessons: 50,
    totalHours: 25,
    completedHours: 25,
    progress: 100,
    isCompleted: true,
    image: '/card.jpg',
    category: 'completed',
    lastWatched: 'الماضي',
  },
  {
    id: 4,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 10,
    totalLessons: 25,
    totalHours: 10,
    completedHours: 4,
    progress: 40,
    isCompleted: false,
    image: '/card.jpg',
    category: 'in_progress',
    lastWatched: 'اليوم',
  },
  {
    id: 5,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 35,
    totalLessons: 35,
    totalHours: 18,
    completedHours: 18,
    progress: 100,
    isCompleted: true,
    image: '/card.jpg',
    category: 'completed',
    lastWatched: 'الماضي',
  },
  {
    id: 6,
    title: 'course title',
    instructor: 'instructor name',
    completedLessons: 20,
    totalLessons: 45,
    totalHours: 22,
    completedHours: 10,
    progress: 45,
    isCompleted: false,
    image: '/card.jpg',
    category: 'in_progress',
    lastWatched: 'اليوم',
  },
];

export type FilterType = 'all' | 'in_progress' | 'completed';

export const filters = [
  { id: 'all' as FilterType, label: 'جميع الدورات' },
  { id: 'in_progress' as FilterType, label: 'الدورات قيد التعلم' },
  { id: 'completed' as FilterType, label: 'الدورات المكتملة' },
];

