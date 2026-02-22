'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Upload, Save, X, BookOpen } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { addCourse } from '../store/courseSlice';
import { LessonForm } from './LessonForm';
import type { CourseFormData, LessonFormData } from '../store/types';
import { error } from 'console';
import CourseThumbnail from './CourseThumbnail';

const INITIAL_FORM: CourseFormData = {
  title: '',
  description: '',
  category: 'design',
  level: 'beginner',
  price: 0,
  thumbnail: null,
  lessons: [],
};

const CATEGORY_OPTIONS = [
  { value: 'design', label: 'التصميم' },
  { value: 'development', label: 'البرمجة' },
  { value: 'business', label: 'الأعمال' },
  { value: 'marketing', label: 'التسويق' },
  { value: 'other', label: 'أخرى' },
] as const;

const LEVEL_OPTIONS = [
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
] as const;





export function CourseForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<CourseFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addLesson = useCallback(() => {
    const newLesson: LessonFormData = {
      id: `lesson-${Date.now()}`,
      title: '',
      description: '',
      duration: '',
      videoUrl: '',
      attachments: [],
      exercises: [],
    };
    setForm(prev => ({ ...prev, lessons: [...prev.lessons, newLesson] }));
  }, []);

  const updateLesson = useCallback((index: number, updated: LessonFormData) => {
    setForm(prev => {
      const lessons = [...prev.lessons];
      lessons[index] = updated;
      return { ...prev, lessons };
    });
  }, []);

  const deleteLesson = useCallback((lessonId: string) => {
    setForm(prev => ({
      ...prev,
      lessons: prev.lessons.filter(l => l.id !== lessonId),
    }));
  }, []);

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert('يرجى إدخال عنوان الدورة');
      return;
    }

    setIsSubmitting(true);
    // Simulate async save
    await new Promise(resolve => setTimeout(resolve, 600));

    dispatch(addCourse({
      title: form.title,
      description: form.description,
      category: form.category,
      level: form.level,
      price: form.price,
      status: 'pending',
      thumbnail: form.thumbnail,
      lessonsCount: form.lessons.length,
      duration: `${Math.ceil(form.lessons.reduce((sum, l) => {
        const parts = l.duration.split(':').map(Number);
        return sum + (parts[0] || 0) + (parts[1] || 0) / 60;
      }, 0))} ساعة`,
      lessons: form.lessons.map(l => ({
        ...l,
        attachments: l.attachments,
        exercises: l.exercises.map(ex => ({
          ...ex,
        })),
      })),
    }));

    setIsSubmitting(false);
    router.push('/ins-courses');
  };

  const handleCancel = () => router.push('/ins-courses');

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-24 sm:pb-20">

      {/* ── Basic Info Section ── */}
      <section aria-labelledby="basic-info-heading">
        <div className="mb-4">
          <h2 id="basic-info-heading" className="text-base font-bold text-stone-800">
            المعلومات الأساسية
          </h2>
          <p className="text-sm text-stone-500">أدخل المعلومات الأساسية للدورة</p>
        </div>

        <div className="bg-white border border-stone-100 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="course-title" className="block text-sm font-semibold text-stone-700 mb-1.5">
              عنوان الدورة
            </label>
            <input
              id="course-title"
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="أدخل عنوان الدورة"
              required
              aria-required="true"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="course-description" className="block text-sm font-semibold text-stone-700 mb-1.5">
              وصف الدورة
            </label>
            <textarea
              id="course-description"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="أدخل وصف تفصيلي للدورة"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Category + Level + Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="course-category" className="block text-sm font-semibold text-stone-700 mb-1.5">
                التصنيف
              </label>
              <select
                id="course-category"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value as CourseFormData['category'])}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all appearance-none bg-white cursor-pointer"
              >
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="course-level" className="block text-sm font-semibold text-stone-700 mb-1.5">
                المستوى
              </label>
              <select
                id="course-level"
                value={form.level}
                onChange={(e) => updateField('level', e.target.value as CourseFormData['level'])}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all appearance-none bg-white cursor-pointer"
              >
                {LEVEL_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="course-price" className="block text-sm font-semibold text-stone-700 mb-1.5">
                السعر (ج.م)
              </label>
              <input
                id="course-price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
              />
            </div>
          </div>
        </div>
      </section>











      {/* ── Thumbnail Section ── */}
       <CourseThumbnail />

      {/* ── Lessons Section ── */}
      <section aria-labelledby="lessons-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="lessons-heading" className="text-base font-bold text-stone-800">
              الدروس والمحتوى
            </h2>
            <p className="text-sm text-stone-500">أضف دروس الدورة مع المبيروجات والمهام</p>
          </div>

          <button
            type="button"
            onClick={addLesson}
            aria-label="إضافة درس جديد"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-100 text-orange-600 text-sm font-semibold hover:bg-orange-200 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 active:scale-95"
          >
            <Plus size={16} aria-hidden="true" />
            أضف درس
          </button>
        </div>

        <div className="space-y-3">
          {form.lessons.length === 0 ? (
            <div className="bg-white border border-stone-100 rounded-2xl py-12 text-center shadow-sm">
              <BookOpen size={36} className="mx-auto text-stone-300 mb-3" aria-hidden="true" />
              <p className="text-stone-500 text-sm">لا توجد دروس بعد. اضغط على "إضافة درس" لبداء.</p>
            </div>
          ) : (
            form.lessons.map((lesson, index) => (
              <LessonForm
                key={lesson.id}
                lesson={lesson}
                index={index}
                onUpdate={(updated) => updateLesson(index, updated)}
                onDelete={() => deleteLesson(lesson.id)}
              />
            ))
          )}
        </div>
      </section>

      {/* ── Action Bar ── */}
      <div
        className="fixed bottom-0 right-0 left-0 bg-white border-t border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-3 z-40 shadow-lg"
        role="group"
        aria-label="أزرار الحفظ والإلغاء"
      >
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all"
        >
          <X size={15} aria-hidden="true" />
          <span className="hidden sm:inline">إلغاء</span>
          <span className="sm:hidden">إلغاء</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all active:scale-95"
        >
          <Save size={15} aria-hidden="true" />
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </div>
    </div>
  );
}