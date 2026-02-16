'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import FilterSection from '../components/FilterSection';
import { useAppSelector } from '../store/hooks';
import { allCourses, FilterType } from '../data/courses';

export default function MyCourses() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const searchQuery = useAppSelector((state) => state.search.query);

  // Filter courses based on both search query and active filter
  const filteredCourses = allCourses.filter((course) => {
    // First apply the category filter
    if (activeFilter !== 'all' && course.category !== activeFilter) {
      return false;
    }
    
    // Then apply the search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesTitle = course.title.toLowerCase().includes(searchLower);
      const matchesInstructor = course.instructor.toLowerCase().includes(searchLower);
      return matchesTitle || matchesInstructor;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden">
      
      {/* Sidebar - لازم يكون hidden على الموبايل */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:mr-56 xl:mr-60 md:mr-60">
        
        <Navbar />

        <main className="p-3 sm:p-4 lg:p-6">

          {/* Header */}
          <div className="mb-4 sm:mb-6 text-right">
            <h1 className="font-cairo font-bold text-xl sm:text-2xl text-[#113555]">
              دوراتي
            </h1>
            <p className="font-cairo text-sm text-gray-600 mt-1">
              تابع تقدمك في الدورات المسجل بها
            </p>
          </div>

          {/* Filters */}
          <FilterSection 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Empty State - No courses found */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-10 sm:py-12">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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

