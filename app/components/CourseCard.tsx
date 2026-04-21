'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <h3 className="line-clamp-2 font-cairo text-sm font-bold text-[#113555] sm:text-base">
          {course.title}
        </h3>

        <p className="flex items-center gap-2 font-cairo text-xs text-gray-500 sm:text-sm">
          <User className="h-5 w-5 text-gray-600" />
          {course.instructor}
        </p>

        <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {course.completedLessons} / {course.totalLessons} درس
          </span>

          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {course.completedHours} / {course.totalHours} ساعة
          </span>
        </div>

        {!course.isCompleted && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-10">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#FF6400] to-[#FF8C42] transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <span className="whitespace-nowrap text-md font-medium text-gray-600">
                {course.progress}%
              </span>
            </div>

            <span className="mt-1 flex justify-end text-xs font-light text-gray-500">
              آخر مشاهدة: {course.lastWatched || 'اليوم'}
            </span>
          </div>
        )}

        <Link
          href={`/my-courses/${course.id}`}
          className={`mt-2 w-full rounded-lg py-2 text-center font-cairo text-sm font-semibold transition-all duration-200 sm:py-3 sm:text-base ${
            course.isCompleted
              ? 'mb-0 mt-12 border border-[#FF6400] bg-white text-black hover:bg-gray-50'
              : 'bg-[#FF6400] text-white hover:bg-[#E55A00]'
          }`}
        >
          {course.isCompleted ? 'مراجعة الدورة' : 'متابعة التعلم'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
