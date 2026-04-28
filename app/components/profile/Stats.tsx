'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Award, Clock } from 'lucide-react';

interface StatsProps {
  registeredCourses: number;
  completedCourses: number;
  certificates: number;
  workingHours: number;
}

const Stats: React.FC<StatsProps> = ({
  registeredCourses,
  completedCourses,
  certificates,
  workingHours,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      <div className="flex min-w-0 items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate font-cairo text-[10px] text-gray-500 dark:text-slate-400 sm:text-xs">{t('profile.registeredCourses')}</p>
          <p className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl">{registeredCourses}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <BookOpen className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate font-cairo text-[10px] text-gray-500 dark:text-slate-400 sm:text-xs">{t('profile.completedCourses')}</p>
          <p className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl">{completedCourses}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <GraduationCap className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate font-cairo text-[10px] text-gray-500 dark:text-slate-400 sm:text-xs">{t('profile.certificates')}</p>
          <p className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl">{certificates}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <Award className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-4">
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate font-cairo text-[10px] text-gray-500 dark:text-slate-400 sm:text-xs">{t('profile.learningHours')}</p>
          <p className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl">{workingHours}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <Clock className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>
    </div>
  );
};

export default Stats;

