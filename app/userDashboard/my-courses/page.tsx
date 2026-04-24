'use client';

import { useState } from 'react';
import { CircleHelp } from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import FilterSection from '../../components/FilterSection';
import { allCourses, FilterType } from '../../data/courses';
import { useAppSelector } from '../../store/hooks';

export default function MyCourses() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const searchQuery = useAppSelector((state) => state.search.query);

  const filteredCourses = allCourses.filter((course) => {
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
    <div className="mt-24 min-h-screen overflow-x-hidden bg-[#FFF3EB] sm:mt-26 lg:mr-52">
        <main className="mx-auto max-w-375 p-3 sm:p-4 lg:p-6">
          <div className="mb-4 text-right sm:mb-6 lg:mr-15">
            <h1 className="font-cairo text-xl font-bold text-[#113555] sm:text-2xl">دوراتي</h1>
            <p className="mt-1 font-cairo text-xs text-gray-600 sm:text-sm">تابع تقدمك في الدورات المسجل بها</p>
          </div>
          <FilterSection    
          activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 lg:gap-6 lg:mr-15">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="py-10 text-center sm:py-12">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <CircleHelp className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
                <p className="font-cairo text-sm text-gray-500 sm:text-base lg:text-lg">لا توجد نتائج مطابقة للبحث</p>
                <p className="font-cairo text-xs text-gray-400 sm:text-sm">جرّب كلمات مختلفة أو فلاتر أخرى</p>
              </div>
            </div>
          )}
        </main>
      </div>
  );
}
