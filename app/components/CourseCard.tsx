'use client';

import React from 'react';
import Image from 'next/image';
import { User, BookOpen, Clock } from './icons';

interface Course {
  id: number;
  title: string;
  instructor: string;
  completedLessons: number;
  totalLessons: number;
  totalHours: number;
  completedHours: number;
  progress: number;
  isCompleted: boolean;
  image: string;
  lastWatched?: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div className="relative w-full aspect-video">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">

        <h3 className="font-cairo font-bold text-sm sm:text-base text-[#113555] line-clamp-2">
          {course.title}
        </h3>

        <p className="font-cairo text-xs sm:text-sm text-gray-500 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          {course.instructor}
        </p>

        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <span className='flex items-center gap-2'>
            <BookOpen className="w-4 h-4" />
            {course.completedLessons} / {course.totalLessons} درس
          </span>
          <span className='flex items-center gap-2'>
            <Clock className="w-4 h-4" />
            {course.completedHours} / {course.totalHours} ساعة
          </span>
        </div>

        {!course.isCompleted && (
          <div className="flex flex-col gap-1">
            
                  <div className="flex items-center gap-10">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-[#FF6400] to-[#FF8C42] rounded-full transition-all duration-500 "
                        style={{ width: `${course.progress}%` }}
                      />
 

                    </div>

                    <span className="text-md font-medium text-gray-600 whitespace-nowrap">
                      {course.progress}%
                    </span>
                  </div>
                  <span className="flex justify-end text-xs text-gray-500 mt-1 font-light">
                    آخر مشاهدة: {course.lastWatched || "اليوم"}
                  </span>

          </div>
        )}

        <button
          className={`mt-2 w-full py-2 sm:py-3 rounded-lg font-cairo font-semibold text-sm sm:text-base transition-all duration-200 ${
            course.isCompleted
              ? 'bg-white text-black border border-[#FF6400] hover:bg-gray-50 mb-0 mt-12'
              : 'bg-[#FF6400] text-white hover:bg-[#E55A00]'
          }`}
        >
          {course.isCompleted ? 'مراجعة الدورة' : 'متابعة التعلم'}
        </button>

      </div>
      </div>
  );
};

export default CourseCard;
