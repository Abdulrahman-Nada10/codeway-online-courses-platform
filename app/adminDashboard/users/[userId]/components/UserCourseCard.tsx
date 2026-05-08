import React from 'react';
import { useTranslation } from 'react-i18next';
import { CourseProgress } from '@/types';

interface UserCourseCardProps {
  course: CourseProgress;
}

const UserCourseCard: React.FC<UserCourseCardProps> = ({ course }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFF3EB] dark:bg-[#0F172A] rounded-2xl p-5 border border-orange-50 dark:border-gray-800 transition-all ">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col items-start justify-center  gap-4 flex-1">
         
          <h3 className="text-lg font-bold text-gray-800 dark:text-white  transition-colors">
            {course.name}
          </h3>

          <div className="flex items-center gap-4 w-full md:w-auto min-w-[500px]">

            <div className="flex-1 h-2.5 bg-[#ffffff] dark:bg-slate-700 rounded-full overflow-hidden border border-orange-50">
              <div
                className="h-full bg-[#FF6B00] rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gray-500">{course.progress}%</span>
         
          </div>
        </div>

         <div className="flex items-center justify-end gap-4 w-full md:w-auto min-w-[200px]">
          <span className="bg-[#F59F00] text-white px-6 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
            {t(`admin.users.details.courses.status.${course.status}`)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default UserCourseCard;
