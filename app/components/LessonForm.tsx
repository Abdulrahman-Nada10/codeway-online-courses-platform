'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus, Upload, Link2, FileText, GripVertical } from 'lucide-react';
import type { LessonFormData, ExerciseFormData } from '../store/types';

interface LessonFormProps {
  lesson: LessonFormData;
  index: number;
  onUpdate: (lesson: LessonFormData) => void;
  onDelete: () => void;
}

export function LessonForm({ lesson, index, onUpdate, onDelete }: LessonFormProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const updateField = <K extends keyof LessonFormData>(
    field: K,
    value: LessonFormData[K]
  ) => {
    onUpdate({ ...lesson, [field]: value });
  };

  const addExercise = () => {
    const newExercise: ExerciseFormData = {
      id: `ex-${Date.now()}`,
      title: `تمرين (${lesson.exercises.length + 1})`,
      content: '',
      notes: '',
    };
    updateField('exercises', [...lesson.exercises, newExercise]);
  };

  const updateExercise = (exIndex: number, updated: ExerciseFormData) => {
    const newExercises = [...lesson.exercises];
    newExercises[exIndex] = updated;
    updateField('exercises', newExercises);
  };

  const deleteExercise = (exId: string) => {
    updateField('exercises', lesson.exercises.filter(ex => ex.id !== exId));
  };

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 border-b border-stone-100">
        <GripVertical size={16} className="text-stone-300 cursor-grab" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`lesson-content-${lesson.id}`}
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
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'طي الدرس' : 'توسيع الدرس'}
          className="p-1.5 rounded-lg hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {isExpanded
            ? <ChevronUp size={16} className="text-stone-500" aria-hidden="true" />
            : <ChevronDown size={16} className="text-stone-500" aria-hidden="true" />
          }
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="حذف الدرس"
          className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div id={`lesson-content-${lesson.id}`} className="p-5 space-y-5">
          {/* Row: Title + Duration */}
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <label
                htmlFor={`lesson-title-${lesson.id}`}
                className="block text-xs font-semibold text-stone-600 mb-1.5"
              >
                عنوان الدرس
              </label>
              <input
                id={`lesson-title-${lesson.id}`}
                type="text"
                value={lesson.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="مقدمة في الفروحة"
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor={`lesson-duration-${lesson.id}`}
                className="block text-xs font-semibold text-stone-600 mb-1.5"
              >
                مدة الدرس
              </label>
              <input
                id={`lesson-duration-${lesson.id}`}
                type="text"
                value={lesson.duration}
                onChange={(e) => updateField('duration', e.target.value)}
                placeholder="15:00"
                className="w-28 px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor={`lesson-desc-${lesson.id}`}
              className="block text-xs font-semibold text-stone-600 mb-1.5"
            >
              وصف الدرس
            </label>
            <textarea
              id={`lesson-desc-${lesson.id}`}
              value={lesson.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="مقدمة شاملة عن الفروحة"
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Video */}
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2">فيديو الدرس</p>
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center hover:border-orange-300 hover:bg-orange-50/30 transition-all cursor-pointer group">
              <Upload size={24} className="mx-auto text-stone-400 group-hover:text-orange-400 mb-2 transition-colors" aria-hidden="true" />
              <p className="text-stone-500 text-sm">اسحب الفيديو هنا أو أضفة للرفع</p>
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <Upload size={13} aria-hidden="true" />
                رفع الفيديو
              </button>
              <p className="text-stone-400 text-xs mt-1.5">
                صيغة MP4 وWEBM بحجم أقصى 150 MB
              </p>
            </div>

            {/* YouTube URL */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 relative">
                <Link2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
                <input
                  type="url"
                  value={lesson.videoUrl}
                  onChange={(e) => updateField('videoUrl', e.target.value)}
                  placeholder="https://youtube.com"
                  aria-label="رابط يوتيوب"
                  className="w-full pr-8 pl-3 py-2.5 rounded-xl border border-stone-200 text-sm text-right focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
                  dir="ltr"
                />
              </div>
              <span className="text-stone-400 text-xs whitespace-nowrap">أو أدخل رابط اليوتيوب</span>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <p className="text-xs font-semibold text-stone-600 mb-2">المرفقات والملفات</p>
            <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-orange-300 transition-all cursor-pointer">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <FileText size={13} aria-hidden="true" />
                رفع المرفقات
              </button>
              <p className="text-stone-400 text-xs mt-1.5">
                ملفات بصيغة PDF، DOC، PPT، ZIP
              </p>
            </div>
          </div>

          {/* Exercises */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-stone-600">المهام والتمارين</p>
              <button
                type="button"
                onClick={addExercise}
                className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors focus:outline-none"
                aria-label="إضافة تمرين جديد"
              >
                <Plus size={14} aria-hidden="true" />
                إضافة مهمة
              </button>
            </div>

            <div className="space-y-3">
              {lesson.exercises.map((exercise, exIndex) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  index={exIndex}
                  onUpdate={(updated) => updateExercise(exIndex, updated)}
                  onDelete={() => deleteExercise(exercise.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Exercise Sub-component ────────────────────────────────────────────────────

interface ExerciseItemProps {
  exercise: ExerciseFormData;
  index: number;
  onUpdate: (exercise: ExerciseFormData) => void;
  onDelete: () => void;
}

function ExerciseItem({ exercise, index, onUpdate, onDelete }: ExerciseItemProps) {
  const update = <K extends keyof ExerciseFormData>(field: K, value: ExerciseFormData[K]) => {
    onUpdate({ ...exercise, [field]: value });
  };

  return (
    <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
      <div className="flex items-center justify-between mb-3">
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

      <div className="space-y-2.5">
        <input
          type="text"
          value={exercise.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="تمرين المتغيرات"
          aria-label={`عنوان التمرين ${index + 1}`}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-white"
        />
        <textarea
          value={exercise.content}
          onChange={(e) => update('content', e.target.value)}
          placeholder="أكتب برنامج باستخدام متغيرات"
          aria-label="محتوى التمرين"
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-white"
        />
        <div className="flex items-center gap-2">
          <Upload size={13} className="text-stone-400 shrink-0" aria-hidden="true" />
          <button
            type="button"
            className="text-xs text-stone-500 hover:text-orange-500 transition-colors"
          >
            أوامر ملاحظات
          </button>
        </div>
      </div>
    </div>
  );
}