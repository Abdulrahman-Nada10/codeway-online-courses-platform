'use client';

import { useState, useEffect } from 'react';
import { CircleHelp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CourseCard from '../../components/CourseCard';
import FilterSection from '../../components/FilterSection';
import { FilterType, getAllCourses } from '../../data/courses';
import { useLocaleDirection } from '../../hooks/useLocaleDirection';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';

export default function MyCourses() {
  const { t, i18n } = useTranslation();
  const { dir } = useLocaleDirection();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const searchResults = useAppSelector((state) => state.search.results);
  const allCourses = getAllCourses(t);

  useEffect(() => {
    dispatch(setContext('courses'));
  }, [dispatch]);

  const coursesToRender =
    searchQuery.trim().length > 0 && searchResults.length > 0
      ? (searchResults as typeof allCourses)
      : allCourses;

  const filteredCourses = coursesToRender.filter((course) => {
    if (activeFilter !== 'all' && course.category !== activeFilter) {
      return false;
    }

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(searchLower);
      const matchesInstructor = course.instructor.toLowerCase().includes(searchLower);
      return matchesTitle || matchesInstructor;
    }

    return true;
  });

  return (
    <div className="mt-24 min-h-screen overflow-x-hidden bg-[#FFF3EB] dark:bg-slate-950 sm:mt-26 rtl:lg:mr-52 ltr:lg:ml-52" dir={dir}>
      <main className="mx-auto max-w-375 p-3 sm:p-4 lg:p-6">
        <div className="mb-4 text-start sm:mb-6 rtl:lg:mr-15 ltr:lg:ml-15">
          <h1 className="font-cairo text-xl font-bold text-[#113555] dark:text-slate-100 sm:text-2xl">{t('dashboard.courses')}</h1>
          <p className="mt-1 font-cairo text-xs text-gray-600 dark:text-slate-400 sm:text-sm">{t('dashboard.coursesSubtitle')}</p>
        </div>
        <FilterSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 lg:gap-6 rtl:lg:mr-15 ltr:lg:ml-15">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-10 text-center sm:py-12">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <CircleHelp className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
              <p className="font-cairo text-sm text-gray-500 sm:text-base lg:text-lg">{t('dashboard.noCoursesMatch')}</p>
              <p className="font-cairo text-xs text-gray-400 sm:text-sm">{t('dashboard.tryDifferentSearch')}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
