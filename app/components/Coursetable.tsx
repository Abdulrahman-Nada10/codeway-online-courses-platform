'use client';

import Link from 'next/link';
import { Trash2, Pencil, Eye, BookOpen } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openDeleteModal } from '../store/courseSlice';
import { selectFilteredCourses } from '../store/selectors';
import { StatusBadge } from './Statusbadge';

export function CourseTable() {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectFilteredCourses);

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 py-16 text-center">
        <BookOpen size={40} className="mx-auto text-stone-300 mb-3" aria-hidden="true" />
        <p className="text-stone-500 font-medium">لا توجد دورات مطابقة</p>
        <p className="text-stone-400 text-sm mt-1">حاول تغيير معايير البحث أو الفلتر</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]" role="table" aria-label="جدول الدورات">
          <thead>
            <tr className="bg-orange-50 border-b border-orange-100">
              {['الدورة', 'عدد الطلاب', 'الدروس', 'المدة', 'الإيرادات', 'التقييم', 'الحالة', 'التحكم'].map(header => (
                <th
                  key={header}
                  scope="col"
                  className="px-3 sm:px-4 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-stone-600 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-50">
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className="hover:bg-orange-50/40 transition-colors duration-150 animate-fade-in-up"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {/* Course Title */}
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 flex items-center justify-center"
                        aria-hidden="true"
                        >
                        {course.thumbnail ? (
                            <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                            <BookOpen size={16} className="text-white" />
                            </div>
                        )}
                        </div>

                        <span className="font-medium text-stone-800 text-xs sm:text-sm leading-snug max-w-[120px] sm:max-w-[200px] line-clamp-2">
                        {course.title}
                        </span>
                    </div>
                    </td>


                {/* Students */}
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-stone-700 font-medium">
                  {course.studentsCount.toLocaleString('ar-SA')}
                </td>

                {/* Lessons */}
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-stone-600 hidden sm:table-cell">
                  {course.lessonsCount} درس
                </td>

                {/* Duration */}
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-stone-600 whitespace-nowrap hidden md:table-cell">
                  {course.duration}
                </td>

                {/* Revenue */}
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-stone-800 whitespace-nowrap hidden lg:table-cell">
                  {course.revenue > 0
                    ? `${course.revenue.toLocaleString('ar-SA')} ج.م`
                    : <span className="text-stone-400">-</span>
                  }
                </td>

                {/* Rating */}
                <td className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                  {course.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-base" aria-hidden="true">★</span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-700">{course.rating}</span>
                    </div>
                  ) : (
                    <span className="text-stone-400 text-xs sm:text-sm">-</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <StatusBadge status={course.status} />
                </td>

                {/* Actions */}
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <div className="flex items-center gap-1" role="group" aria-label={`إجراءات دورة ${course.title}`}>
                    <button
                      onClick={() => dispatch(openDeleteModal(course.id))}
                      aria-label={`حذف ${course.title}`}
                      className="p-1.5 sm:p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>

                    <Link
                      href={`/ins-courses/${course.id}/edit`}
                      aria-label={`تعديل ${course.title}`}
                      className="p-1.5 sm:p-2 rounded-lg text-stone-400 hover:text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </Link>

                    <Link
                      href={`/ins-courses/${course.id}`}
                      aria-label={`عرض ${course.title}`}
                      className="p-1.5 sm:p-2 rounded-lg text-stone-400 hover:text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <Eye size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}