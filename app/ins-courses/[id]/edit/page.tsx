'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Save,
  X,
  Plus,
  Upload,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Link2,
  FileText,
  BookOpen,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCourse } from '../../../store/courseSlice';
import { selectAllCourses } from '../../../store/selectors';
import type { Course, LessonFormData, ExerciseFormData } from '../../../store/types';
import CourseThumbnail from '@/app/components/CourseThumbnail';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CourseEditPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectAllCourses);
  const course = courses.find(c => c.id === params.id);

  const [form, setForm] = useState<Course | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize form from store
  useEffect(() => {
    if (course) {
      setForm(structuredClone(course));
    }
  }, [course?.id]); // Only re-init if course ID changes

  // ── Field updaters ──────────────────────────────────────────────────────────

  const updateField = useCallback(<K extends keyof Course>(field: K, value: Course[K]) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
    setIsDirty(true);
  }, []);

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
    setForm(prev => prev ? { ...prev, lessons: [...prev.lessons, newLesson] } : null);
    setIsDirty(true);
  }, []);

  const updateLesson = useCallback((index: number, updated: LessonFormData) => {
    setForm(prev => {
      if (!prev) return null;
      const lessons = [...prev.lessons];
      lessons[index] = updated;
      return { ...prev, lessons };
    });
    setIsDirty(true);
  }, []);

  const deleteLesson = useCallback((lessonId: string) => {
    setForm(prev => prev
      ? { ...prev, lessons: prev.lessons.filter(l => l.id !== lessonId) }
      : null
    );
    setIsDirty(true);
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form || !form.title.trim()) {
      alert('يرجى إدخال عنوان الدورة');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedLessonCount = form.lessons.length;
    const totalMinutes = form.lessons.reduce((sum, l) => {
      const [h = 0, m = 0] = l.duration.split(':').map(Number);
      return sum + h * 60 + m;
    }, 0);

    dispatch(updateCourse({
      ...form,
      lessonsCount: updatedLessonCount,
      duration: totalMinutes > 0 ? `${Math.ceil(totalMinutes / 60)} ساعة` : form.duration,
    }));

    setIsSaving(false);
    setIsDirty(false);
    router.push(`/ins-courses/${form.id}`);
  };

  const handleCancel = () => {
    if (isDirty && !confirm('لديك تغييرات غير محفوظة. هل تريد المغادرة؟')) return;
    router.push(`/ins-courses/${params.id}`);
  };

  // ── Guards ──────────────────────────────────────────────────────────────────

  if (!course || !form) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-stone-300 mb-4" />
          <h1 className="text-xl font-bold text-stone-700 mb-2">الدورة غير موجودة</h1>
          <Link href="/ins-courses" className="mt-2 text-sm text-orange-500 hover:underline">
            العودة للدورات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['instructor']}>
      <main className="min-h-screen bg-stone-50">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-10 pb-28">

        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-4 sm:mb-6">
          <Link href="/ins-courses" className="hover:text-orange-500 transition-colors focus:outline-none focus:underline">
            دوراتي
          </Link>
          <ChevronRight size={14} className="rotate-180 text-stone-300" aria-hidden="true" />
          <Link
            href={`/ins-courses/${course.id}`}
            className="hover:text-orange-500 transition-colors focus:outline-none focus:underline max-w-[100px] sm:max-w-[160px] truncate"
          >
            {course.title}
          </Link>
          <ChevronRight size={14} className="rotate-180 text-stone-300" aria-hidden="true" />
          <span className="text-stone-700 font-medium">تعديل</span>
        </nav>

        <header className="mb-6 sm:mb-8 text-right">
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">تعديل الدورة</h1>
          <p className="text-stone-500 text-sm mt-0.5">
            عدّل بيانات الدورة ثم احفظ التغييرات
          </p>
        </header>

        <div className="space-y-8">

          {/* ── Basic Info ── */}
          <section aria-labelledby="edit-basic-heading">
            <SectionHeader
              id="edit-basic-heading"
              title="المعلومات الأساسية"
              subtitle="أدخل المعلومات الأساسية للدورة"
            />
            <div className="bg-white border border-stone-100 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5">

              <FormField label="عنوان الدورة" htmlFor="edit-title" required>
                <input
                  id="edit-title"
                  type="text"
                  value={form.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="أدخل عنوان الدورة"
                  required
                  className={INPUT_CLS}
                />
              </FormField>

              <FormField label="وصف الدورة" htmlFor="edit-desc">
                <textarea
                  id="edit-desc"
                  value={form.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="أدخل وصف تفصيلي للدورة"
                  rows={4}
                  className={`${INPUT_CLS} resize-none`}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="التصنيف" htmlFor="edit-category">
                  <select
                    id="edit-category"
                    value={form.category}
                    onChange={e => updateField('category', e.target.value as Course['category'])}
                    className={`${INPUT_CLS} appearance-none cursor-pointer`}
                  >
                    {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </FormField>

                <FormField label="المستوى" htmlFor="edit-level">
                  <select
                    id="edit-level"
                    value={form.level}
                    onChange={e => updateField('level', e.target.value as Course['level'])}
                    className={`${INPUT_CLS} appearance-none cursor-pointer`}
                  >
                    {LEVEL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </FormField>

                <FormField label="السعر (ج.م)" htmlFor="edit-price">
                  <input
                    id="edit-price"
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={e => updateField('price', Number(e.target.value))}
                    className={INPUT_CLS}
                  />
                </FormField>
              </div>
            </div>
          </section>

          {/* ── Thumbnail ── */}
          <CourseThumbnail />

          {/* ── Lessons ── */}
          <section aria-labelledby="edit-lessons-heading">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader
                id="edit-lessons-heading"
                title="الدروس والمحتوى"
                subtitle="أضف أو عدّل دروس الدورة"
                noMargin
              />
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
                  <p className="text-stone-500 text-sm">لا توجد دروس بعد. اضغط "أضف درس" للبداية.</p>
                </div>
              ) : (
                form.lessons.map((lesson, index) => (
                  <EditLessonCard
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
        </div>
      </div>

      {/* ── Sticky Save Bar ── */}
      <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-3 z-40 shadow-lg">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all"
        >
          <X size={15} aria-hidden="true" />
          <span className="hidden sm:inline">إلغاء</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {isDirty && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 sm:px-3 py-1.5 rounded-full font-medium hidden sm:inline">
              تغييرات غير محفوظة
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all active:scale-95"
          >
            <Save size={15} aria-hidden="true" />
            {isSaving ? 'جاري...' : 'حفظ'}
          </button>
        </div>
      </div>
      </main>
    </ProtectedRoute>
  );
}

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const INPUT_CLS =
  'w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all bg-white';

// ─── Sub-components ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle: string;
  noMargin?: boolean;
}

function SectionHeader({ id, title, subtitle, noMargin }: SectionHeaderProps) {
  return (
    <div className={noMargin ? '' : 'mb-4'}>
      <h2 id={id} className="text-base font-bold text-stone-800">{title}</h2>
      <p className="text-sm text-stone-500">{subtitle}</p>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, htmlFor, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 mr-1" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── EditLessonCard ────────────────────────────────────────────────────────────

interface EditLessonCardProps {
  lesson: LessonFormData;
  index: number;
  onUpdate: (lesson: LessonFormData) => void;
  onDelete: () => void;
}

function EditLessonCard({ lesson, index, onUpdate, onDelete }: EditLessonCardProps) {
  const [expanded, setExpanded] = useState(index === 0);

  const update = <K extends keyof LessonFormData>(field: K, value: LessonFormData[K]) =>
    onUpdate({ ...lesson, [field]: value });

  const addExercise = () => {
    const ex: ExerciseFormData = {
      id: `ex-${Date.now()}`,
      title: `تمرين (${lesson.exercises.length + 1})`,
      content: '',
      notes: '',
    };
    update('exercises', [...lesson.exercises, ex]);
  };

  const updateExercise = (i: number, updated: ExerciseFormData) => {
    const exs = [...lesson.exercises];
    exs[i] = updated;
    update('exercises', exs);
  };

  const deleteExercise = (id: string) =>
    update('exercises', lesson.exercises.filter(e => e.id !== id));

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-100">
        <GripVertical size={16} className="text-stone-300 cursor-grab flex-shrink-0" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`edit-lesson-${lesson.id}`}
          className="flex-1 flex items-center gap-2 text-right focus:outline-none"
        >
          <span className="text-sm font-semibold text-stone-700">
            {index + 1}. {lesson.title || `درس ${index + 1}`}
          </span>
          {lesson.duration && (
            <span className="text-xs text-stone-400 mr-auto">{lesson.duration}</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'طي الدرس' : 'توسيع الدرس'}
          className="p-1.5 rounded-lg hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {expanded
            ? <ChevronUp size={15} className="text-stone-500" aria-hidden="true" />
            : <ChevronDown size={15} className="text-stone-500" aria-hidden="true" />
          }
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="حذف الدرس"
          className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div id={`edit-lesson-${lesson.id}`} className="p-5 space-y-4">

          {/* Title + Duration */}
          <div className="grid grid-cols-[1fr_9rem] gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5" htmlFor={`lt-${lesson.id}`}>
                عنوان الدرس
              </label>
              <input
                id={`lt-${lesson.id}`}
                type="text"
                value={lesson.title}
                onChange={e => update('title', e.target.value)}
                placeholder="عنوان الدرس"
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5" htmlFor={`ld-${lesson.id}`}>
                المدة
              </label>
              <input
                id={`ld-${lesson.id}`}
                type="text"
                value={lesson.duration}
                onChange={e => update('duration', e.target.value)}
                placeholder="15:00"
                className={INPUT_CLS}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5" htmlFor={`ldesc-${lesson.id}`}>
              وصف الدرس
            </label>
            <textarea
              id={`ldesc-${lesson.id}`}
              value={lesson.description}
              onChange={e => update('description', e.target.value)}
              placeholder="وصف مختصر عن محتوى الدرس"
              rows={3}
              className={`${INPUT_CLS} resize-none`}
            />
          </div>

          {/* Video Upload */}
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2">فيديو الدرس</p>
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-5 text-center hover:border-orange-300 hover:bg-orange-50/20 transition-all cursor-pointer group">
              <Upload size={22} className="mx-auto text-stone-400 group-hover:text-orange-400 mb-2 transition-colors" aria-hidden="true" />
              <p className="text-stone-500 text-xs mb-2">اسحب الفيديو هنا أو أضفه للرفع</p>
              <button type="button" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-300">
                <Upload size={12} aria-hidden="true" />
                رفع الفيديو
              </button>
              <p className="text-stone-400 text-xs mt-1">MP4 أو WEBM — أقصى 150 MB</p>
            </div>
            <div className="mt-2 relative">
              <Link2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input
                type="url"
                value={lesson.videoUrl}
                onChange={e => update('videoUrl', e.target.value)}
                placeholder="https://youtube.com/..."
                aria-label="رابط يوتيوب"
                dir="ltr"
                className="w-full pr-8 pl-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2">المرفقات</p>
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-orange-300 transition-all cursor-pointer">
              <button type="button" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300">
                <FileText size={12} aria-hidden="true" />
                رفع المرفقات
              </button>
              <p className="text-stone-400 text-xs mt-1">PDF، DOC، PPT، ZIP</p>
            </div>
          </div>

          {/* Exercises */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-600">المهام والتمارين</p>
              <button
                type="button"
                onClick={addExercise}
                className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors focus:outline-none"
              >
                <Plus size={13} aria-hidden="true" />
                إضافة مهمة
              </button>
            </div>

            {lesson.exercises.map((ex, i) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                index={i}
                onUpdate={updated => updateExercise(i, updated)}
                onDelete={() => deleteExercise(ex.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ExerciseCard ──────────────────────────────────────────────────────────────

interface ExerciseCardProps {
  exercise: ExerciseFormData;
  index: number;
  onUpdate: (ex: ExerciseFormData) => void;
  onDelete: () => void;
}

function ExerciseCard({ exercise, index, onUpdate, onDelete }: ExerciseCardProps) {
  const update = <K extends keyof ExerciseFormData>(f: K, v: ExerciseFormData[K]) =>
    onUpdate({ ...exercise, [f]: v });

  return (
    <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-stone-600">تمرين ({index + 1})</span>
        <button
          type="button"
          onClick={onDelete}
          aria-label="حذف التمرين"
          className="p-1 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none"
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={exercise.title}
          onChange={e => update('title', e.target.value)}
          placeholder="عنوان التمرين"
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
        />
        <textarea
          value={exercise.content}
          onChange={e => update('content', e.target.value)}
          placeholder="محتوى التمرين"
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
        />
      </div>
    </div>
  );
}
