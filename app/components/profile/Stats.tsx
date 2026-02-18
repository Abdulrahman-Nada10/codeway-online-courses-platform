'use client';

import React from 'react';
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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الدورات المسجلة</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{registeredCourses}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <BookOpen className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الدورات المكتملة</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{completedCourses}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <GraduationCap className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الشهادات</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{certificates}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <Award className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">ساعات التعلم</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{workingHours}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <Clock className="w-5 h-5 text-[#FF6400]" />
        </div>
      </div>
    </div>
  );
};

export default Stats;

