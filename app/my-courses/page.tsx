'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import FilterSection from '../components/FilterSection';
import { useAppSelector } from '../store/hooks';
import { allCourses, FilterType } from '../data/courses';
import { CircleHelp } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden  mt-26">
      
      <Sidebar />

      <div className="lg:mr-70 xl:mr-70 md:mr-0">
        
        <Navbar />

        <main className="p-3 sm:p-4 lg:p-6">

          <div className="mb-4 sm:mb-6 text-right">
            <h1 className="font-cairo font-bold text-xl sm:text-2xl text-[#113555]">
              دوراتي
            </h1>
            <p className="font-cairo text-sm text-gray-600 mt-1">
              تابع تقدمك في الدورات المسجل بها
            </p>
          </div>

          <FilterSection 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-10 sm:py-12">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <CircleHelp className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg font-cairo">
                  لا توجد نتائج مطابقة للبحث
                </p>
                <p className="text-gray-400 text-xs sm:text-sm font-cairo">
                  جرب كلمات مختلفة أو فلاتر أخرى
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

