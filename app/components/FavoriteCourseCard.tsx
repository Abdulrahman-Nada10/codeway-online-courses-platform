'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeFromFavorites } from '../store/favoritesSlice';
import { Heart, Star, Users, Clock } from './icons';


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
  

const FavoriteCourseCard = ({ course, isFav = false}: { course: FavoriteCourse, isFav?: boolean; }) => {
  const dispatch = useDispatch()
  return (
    <div className="w-full max-w-86 h-96.25 bg-input-bg rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-45">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        
        <div className="absolute top-2 right-3 bg-[#F7F7F7CC] px-2.5 py-2 rounded-full">
          <span className="font-cairo text-xs font-medium text-[#113555]">
            {course.category}
          </span>
        </div>
        
        <div className="absolute top-3 left-3 w-12.5 h-6.25 bg-[#EB4335] rounded-[14px] flex items-center justify-center">
          <span className="font-cairo font-bold text-white">
            {course.discount}%
          </span>
        </div>
        
        {
          isFav &&
          <button 
          className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label="إزالة من المفضلة"
          onClick={() => dispatch(removeFromFavorites(course.id))}
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
        }
      </div>

      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="font-cairo font-bold text-base text-main-text line-clamp-2">
          {course.title}
        </h3>

        <p className="font-cairo text-sm font-medium text-sub-text -mt-1">
          م. {course.instructor}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-5">
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-[#F5A00F] fill-[#F5A00F]"/>
            <span className="font-cairo font-medium">{course.rating}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-sub-text" />
            <span className="font-cairo font-medium">{course.studentsCount}</span>
          </div>

          <div className="flex items-center gap-2.5 ">
            <Clock className="w-4 h-4 text-sub-text" />
            <span className="font-cairo font-medium">{course.hoursCount} ساعة</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 ">
          <div className="flex items-center gap-3">
              <div className='flex items-center gap-1'>  
            <span className="font-cairo text-md font-medium text-[#FF6400]">
              {course.discountedPrice}
            </span>
             <span className="font-cairo text-sm font-medium text-[#FF6400]">EGP</span>
            </div>
            <div className="flex items-center gap-1">
            <span className="font-cairo text-sm font-medium text-gray-300">EGP</span>
            <span className="font-cairo text-md font-medium text-gray-300 line-through">
              {course.originalPrice}
            </span>
            </div>
          </div>

          <button className="w-20 h-8 rounded-lg font-cairo font-semibold text-sm border border-[#FF6400] text-main-text hover:bg-[#FF6400] hover:text-white transition-all duration-200">
            {
              isFav?"سجل الآن":"عرض الدورة"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCourseCard;

