export type CourseStatus = 'active' | 'pending' | 'inactive';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseCategory = 'design' | 'development' | 'business' | 'marketing' | 'other';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  attachments: string[];
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  content: string;
  notes: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  status: CourseStatus;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: string;
  revenue: number;
  thumbnail: string | null;
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  statusFilter: CourseStatus | 'all';
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  deleteModal: {
    isOpen: boolean;
    courseId: string | null;
  };
}

export interface CourseFormData {
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  thumbnail: string | null;
  lessons: LessonFormData[];
}

export interface LessonFormData {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  attachments: string[];
  exercises: ExerciseFormData[];
}

export interface ExerciseFormData {
  id: string;
  title: string;
  content: string;
  notes: string;
}
