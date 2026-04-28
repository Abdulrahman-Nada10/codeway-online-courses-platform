'use client';

import { useEffect, useMemo } from 'react';
import FavoriteCourseCard from '../../components/FavoriteCourseCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Heart } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';
import { useTranslation } from 'react-i18next';
import { localizeFavoriteCourse } from '../../data/favoriteCourses';
import { useLocaleDirection } from '../../hooks/useLocaleDirection';

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const { dir } = useLocaleDirection();
  const dispatch = useAppDispatch();
  const favoriteCourses = useSelector((state: RootState) => state.favorites.courses);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const localizedFavorites = useMemo(
    () => favoriteCourses.map((course) => localizeFavoriteCourse(course, t)),
    [favoriteCourses, t, i18n.language]
  );

  useEffect(() => {
    dispatch(setContext('favorites'));
  }, [dispatch]);

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return localizedFavorites;
    const lower = searchQuery.toLowerCase();
    return localizedFavorites.filter(
      (course) =>
        course.title.toLowerCase().includes(lower) ||
        course.instructor.toLowerCase().includes(lower) ||
        course.category.toLowerCase().includes(lower)
    );
  }, [localizedFavorites, searchQuery]);

  return (
    <div className="mt-26 min-h-screen overflow-x-hidden bg-[#FFF3EB] dark:bg-slate-950" dir={dir}>
      <div className="mr-0 rtl:lg:mr-68 rtl:xl:mr-70 ltr:lg:ml-68 ltr:xl:ml-70">
        <main className="p-2 sm:p-3 lg:p-6">
          <div className="mb-3 text-start sm:mb-6">
            <h1 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl lg:text-2xl">
              {t('dashboard.favorites')}
            </h1>
            <p className="mt-0.5 font-cairo text-xs text-gray-600 dark:text-slate-400 sm:mt-1 sm:text-sm">
              {t('dashboard.favoritesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredFavorites.map((course) => (
              <FavoriteCourseCard key={course.id} course={course} isFav={true} />
            ))}
          </div>

          {filteredFavorites.length === 0 && (
            <div className="text-center py-10 sm:py-12">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg font-cairo">
                  {t('dashboard.noFavorites')}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm font-cairo">
                  {t('dashboard.noFavoritesDesc')}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

