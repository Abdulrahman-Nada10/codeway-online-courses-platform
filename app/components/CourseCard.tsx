'use client';

import React from 'react';
import Image from 'next/image';

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

      {/* Course Image */}
      <div className="relative w-full aspect-video">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">

        {/* Title */}
        <h3 className="font-cairo font-bold text-sm sm:text-base text-[#113555] line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="font-cairo text-xs sm:text-sm text-gray-500 flex items-center gap-2">
          {course.instructor}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <span>
            {course.completedLessons} / {course.totalLessons} درس
          </span>
          <span>
            {course.completedHours} / {course.totalHours} ساعة
          </span>
        </div>

        {/* Progress */}
        {!course.isCompleted && (
          <div className="flex flex-col gap-1">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#FF6400] to-[#FF8C42] rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{course.progress}%</span>
              <span>آخر مشاهدة: {course.lastWatched || 'اليوم'}</span>
            </div>
          </div>
        )}

        {/* Button */}
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
