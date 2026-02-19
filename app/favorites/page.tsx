'use client';

import React from 'react';
import Navbar from '../components/NavbarInstructor';
import Sidebar from '../components/Sidebar';
import FavoriteCourseCard from '../components/FavoriteCourseCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const favoriteCourses = useSelector((state: RootState) => state.favorites.courses
);
  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden">
      
      <Sidebar />

      <div className="lg:mr-68 xl:mr-70 mr-0">
        
        <Navbar />

        <main className="p-2 sm:p-3 lg:p-6">

          <div className="mb-3 sm:mb-6 text-right">
            <h1 className="font-cairo font-bold text-lg sm:text-xl lg:text-2xl text-[#113555]">
              المفضلة
            </h1>
            <p className="font-cairo text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
              الدورات التي أضفتها إلى قائمتك المفضلة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {favoriteCourses.map((course) => (
              <FavoriteCourseCard key={course.id} course={course} />
            ))}
          </div>

          {favoriteCourses.length === 0 && (
            <div className="text-center py-10 sm:py-12">
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg font-cairo">
                  لا توجد دورات في المفضلة
                </p>
                <p className="text-gray-400 text-xs sm:text-sm font-cairo">
                  أضف دورات إلى المفضلة لحفظها هنا
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

