'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Pencil,
  Users,
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  CheckSquare,
} from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAllCourses } from '../../store/selectors';
import { StatusBadge } from '../../components/Statusbadge';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';

export default function CourseViewPage() {
  const params = useParams();
  const courses = useAppSelector(selectAllCourses);
  const course = courses.find(c => c.id === params.id);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  if (!course) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-stone-300 mb-4" />
          <h1 className="text-xl font-bold text-stone-700 mb-2">الدورة غير موجودة</h1>
          <p className="text-stone-500 text-sm mb-6">لم يتم العثور على هذه الدورة</p>
          <Link
            href="/ins-courses"
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all"
          >
            العودة للدورات
          </Link>
        </div>
      </main>
    );
  }

  const stats = [
    { icon: Users, label: 'الطلاب المسجلين', value: course.studentsCount.toLocaleString('ar-SA'), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: BookOpen, label: 'عدد الدروس', value: `${course.lessonsCount} درس`, color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Clock, label: 'مدة الدورة', value: course.duration, color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: TrendingUp, label: 'الإيرادات', value: course.revenue > 0 ? `${course.revenue.toLocaleString('ar-SA')} ج.م` : 'لا يوجد', color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <ProtectedRoute allowedRoles={['instructor']}>
      <main className="min-h-screen bg-stone-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">

        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-4 sm:mb-6">
          <Link href="/ins-courses" className="hover:text-orange-500 transition-colors focus:outline-none focus:underline">
            دوراتي
          </Link>
          <ChevronRight size={14} className="rotate-180 text-stone-300" aria-hidden="true" />
          <span className="text-stone-700 font-medium line-clamp-1">{course.title}</span>
        </nav>

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4 w-full">
              {/* Thumbnail */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">
                <BookOpen size={24} className="text-white" aria-hidden="true" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl font-extrabold text-stone-900">{course.title}</h1>
                  <StatusBadge status={course.status} />
                </div>

                {course.description && (
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xl">
                    {course.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-3 flex-wrap">
                  {course.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={15} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                      <span className="text-sm font-semibold text-stone-700">{course.rating}</span>
                    </div>
                  )}
                  <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium">
                    {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </span>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium">
                    {course.price > 0 ? `${course.price.toLocaleString('ar-SA')} ج.م` : 'مجاني'}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Link
              href={`/ins-courses/${course.id}/edit`}
              aria-label="تعديل الدورة"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 active:scale-95 shadow-md shadow-orange-200 w-full sm:w-auto justify-center"
            >
              <Pencil size={15} aria-hidden="true" />
              تعديل
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-3 sm:p-4">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2 sm:mb-3`}>
                <stat.icon size={18} className={stat.color} aria-hidden="true" />
              </div>
              <p className="text-xs text-stone-500 mb-0.5">{stat.label}</p>
              <p className="text-sm sm:text-base font-bold text-stone-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Lessons List */}
        {course.lessons && course.lessons.length > 0 && (
          <section aria-labelledby="lessons-section-title">
            <div className="flex items-center justify-between mb-4">
              <h2 id="lessons-section-title" className="text-base font-bold text-stone-800">
                محتوى الدورة
              </h2>
              <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {course.lessons.length} درس
              </span>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    aria-expanded={expandedLesson === lesson.id}
                    aria-controls={`lesson-body-${lesson.id}`}
                    className="w-full flex items-center gap-3 px-5 py-4 text-right hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-semibold text-stone-800">{lesson.title || `درس ${index + 1}`}</p>
                      {lesson.duration && (
                        <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          {lesson.duration}
                        </p>
                      )}
                    </div>
                    {expandedLesson === lesson.id
                      ? <ChevronUp size={16} className="text-stone-400 flex-shrink-0" aria-hidden="true" />
                      : <ChevronDown size={16} className="text-stone-400 flex-shrink-0" aria-hidden="true" />
                    }
                  </button>

                  {/* Lesson Body */}
                  {expandedLesson === lesson.id && (
                    <div
                      id={`lesson-body-${lesson.id}`}
                      className="px-5 pb-4 border-t border-stone-50 pt-3 space-y-3"
                    >
                      {lesson.description && (
                        <p className="text-sm text-stone-600 leading-relaxed">{lesson.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {lesson.videoUrl && (
                          <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-orange-600 font-medium hover:text-orange-700 transition-colors"
                          >
                            <Play size={13} aria-hidden="true" />
                            مشاهدة الفيديو
                          </a>
                        )}

                        {lesson.attachments?.length > 0 && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-stone-500">
                            <FileText size={13} aria-hidden="true" />
                            {lesson.attachments.length} مرفق
                          </span>
                        )}

                        {lesson.exercises?.length > 0 && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-stone-500">
                            <CheckSquare size={13} aria-hidden="true" />
                            {lesson.exercises.length} تمرين
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty lessons */}
        {(!course.lessons || course.lessons.length === 0) && (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm py-12 text-center">
            <BookOpen size={36} className="mx-auto text-stone-300 mb-3" aria-hidden="true" />
            <p className="text-stone-500 text-sm">لا توجد دروس مضافة لهذه الدورة بعد</p>
            <Link
              href={`/ins-courses/${course.id}/edit`}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 text-orange-600 text-sm font-semibold hover:bg-orange-200 transition-all"
            >
              <Pencil size={14} aria-hidden="true" />
              إضافة دروس
            </Link>
          </div>
        )}

        </div>
      </main>
    </ProtectedRoute>
  );
}
