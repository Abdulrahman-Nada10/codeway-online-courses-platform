'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-video w-full">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <h3 className="line-clamp-2 font-cairo text-sm font-bold text-[#113555] dark:text-slate-100 sm:text-base">
          {course.title}
        </h3>

        <p className="flex items-center gap-2 font-cairo text-xs text-gray-500 dark:text-slate-400 sm:text-sm">
          <User className="h-5 w-5 text-gray-600 dark:text-slate-400" />
          {course.instructor}
        </p>

        <div className="flex min-[480px]:flex-row min-[480px]:justify-between flex-col gap-2 text-xs text-gray-600 dark:text-slate-400 sm:text-sm">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {course.completedLessons} / {course.totalLessons} {t('dashboard.lessonsUnit')}
          </span>

          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {course.completedHours} / {course.totalHours} {t('dashboard.hoursUnit')}
          </span>
        </div>

        {!course.isCompleted && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#FF6400] to-[#FF8C42] transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <span className="whitespace-nowrap text-sm font-medium text-gray-600 dark:text-slate-300">
                {course.progress}%
              </span>
            </div>

            <span className="mt-1 flex justify-end text-xs font-light text-gray-500 dark:text-slate-400">
              {t('dashboard.lastWatched')}: {course.lastWatched || t('dashboard.lastWatchedToday')}
            </span>
          </div>
        )}

        <Link
          href={`/userDashboard/my-courses/${course.id}`}
          className={`mt-3 w-full rounded-xl py-2.5 text-center font-cairo text-sm font-semibold transition-all duration-200 sm:py-3 sm:text-base ${
            course.isCompleted
              ? 'border border-[#FF6400] bg-white text-black hover:bg-gray-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:mt-12'
              : 'bg-[#FF6400] text-white hover:bg-[#E55A00]'
          }`}
        >
          {course.isCompleted
            ? t('dashboard.reviewCourse')
            : t('dashboard.continueLearning')}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
