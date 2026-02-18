import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteCourse {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
  rating: number;
  studentsCount: number;
  hoursCount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface FavoritesState {
  courses: FavoriteCourse[];
}

const initialState: FavoritesState = {
  courses: [
    {
      id: 1,
      title: 'تصميم واجهات المستخدم UX/UI',
      instructor: 'أحمد محمد',
      image: '/favCard.jpg',
      category: 'التصميم',
      rating: 4.8,
      studentsCount: 1250,
      hoursCount: 25,
      originalPrice: 299,
      discountedPrice: 149,
      discount: 50,
    },
  {
    id: 2,
    title: 'تطوير تطبيقات الويب باستخدام React',
    instructor: 'محمد علي',
    image: '/favCard.jpg',
    category: 'البرمجة',
    rating: 4.9,
    studentsCount: 2340,
    hoursCount: 40,
    originalPrice: 399,
    discountedPrice: 199,
    discount: 50,
  },
  {
    id: 3,
    title: 'أساسيات التسويق الرقمي',
    instructor: 'سارة أحمد',
    image: '/favCard.jpg',
    category: 'التسويق',
    rating: 4.7,
    studentsCount: 890,
    hoursCount: 15,
    originalPrice: 199,
    discountedPrice: 99,
    discount: 50,
  },
  {
    id: 4,
    title: 'إدارة المشاريع الاحترافية',
    instructor: 'خالد يوسف',
    image: '/favCard.jpg',
    category: 'الأعمال',
    rating: 4.6,
    studentsCount: 1560,
    hoursCount: 20,
    originalPrice: 349,
    discountedPrice: 174,
    discount: 50,
  },
  {
    id: 5,
    title: 'التصميم الجرافيكي للمبتدئين',
    instructor: 'نورة عبدالله',
    image: '/favCard.jpg',
    category: 'التصميم',
    rating: 4.8,
    studentsCount: 3200,
    hoursCount: 30,
    originalPrice: 249,
    discountedPrice: 124,
    discount: 50,
  },
  {
    id: 6,
    title: 'بايثون للبيانات والذكاء الاصطناعي',
    instructor: 'عمر حسن',
    image: '/favCard.jpg',
    category: 'البرمجة',
    rating: 4.9,
    studentsCount: 4100,
    hoursCount: 45,
    originalPrice: 449,
    discountedPrice: 224,
    discount: 50,
  },
],
    }

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
