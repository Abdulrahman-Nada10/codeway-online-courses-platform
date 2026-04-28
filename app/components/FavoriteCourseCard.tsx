'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { localizeFavoriteCourse } from '@/app/data/favoriteCourses';
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

const FavoriteCourseCard = ({
  course,
  isFav = false,
}: {
  course: FavoriteCourse;
  isFav?: boolean;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const localizedCourse = localizeFavoriteCourse(course, t);

  return (
    <div className="h-96.25 w-full max-w-86 overflow-hidden rounded-[10px] bg-input-bg shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="relative h-45 w-full">
        <Image
          src={localizedCourse.image}
          alt={localizedCourse.title}
          fill
          className="object-cover"
        />

        <div className="absolute top-2 rounded-full bg-[#F7F7F7CC] px-2.5 py-2 rtl:right-3 ltr:left-3">
          <span className="font-cairo text-xs font-medium text-[#113555] dark:text-slate-900">
            {localizedCourse.category}
          </span>
        </div>

        <div className="absolute top-3 flex h-6.25 w-12.5 items-center justify-center rounded-[14px] bg-[#EB4335] rtl:left-3 ltr:right-3">
          <span className="font-cairo font-bold text-white">
            {localizedCourse.discount}%
          </span>
        </div>

        {isFav && (
          <button
            className="absolute bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 dark:bg-slate-800 rtl:left-3 ltr:right-3"
            aria-label={t('favorites.removeFromFavorites')}
            onClick={() => dispatch(removeFromFavorites(localizedCourse.id))}
          >
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        <h3 className="line-clamp-2 font-cairo text-base font-bold text-main-text">
          {localizedCourse.title}
        </h3>

        <p className="font-cairo -mt-1 text-sm font-medium text-sub-text">
          {t('dashboard.instructorPrefix')} {localizedCourse.instructor}
        </p>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4 fill-[#F5A00F] text-[#F5A00F]" />
            <span className="font-cairo font-medium">{localizedCourse.rating}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 text-sub-text" />
            <span className="font-cairo font-medium">{localizedCourse.studentsCount}</span>
          </div>

          <div className="flex items-center gap-2.5 ">
            <Clock className="h-4 w-4 text-sub-text" />
            <span className="font-cairo font-medium">
              {localizedCourse.hoursCount} {t('dashboard.hoursUnit')}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="font-cairo text-md font-medium text-[#FF6400]">
                {localizedCourse.discountedPrice}
              </span>
              <span className="font-cairo text-sm font-medium text-[#FF6400]">
                {t('common.currency')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-cairo text-sm font-medium text-gray-300">
                {t('common.currency')}
              </span>
              <span className="font-cairo text-md font-medium text-gray-300 line-through">
                {localizedCourse.originalPrice}
              </span>
            </div>
          </div>

          <button className="h-8 w-20 rounded-lg border border-[#FF6400] font-cairo text-sm font-semibold text-main-text transition-all duration-200 hover:bg-[#FF6400] hover:text-white">
            {isFav ? t('favorites.enrollNow') : t('favorites.viewCourse')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCourseCard;
