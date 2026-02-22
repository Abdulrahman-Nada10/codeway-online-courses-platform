'use client';

import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteCourse, closeDeleteModal } from '../store/courseSlice';
import { selectDeleteModal, selectAllCourses } from '../store/selectors';

export function DeleteCourseModal() {
  const dispatch = useAppDispatch();
  const { isOpen, courseId } = useAppSelector(selectDeleteModal);
  const courses = useAppSelector(selectAllCourses);

  const course = courses.find(c => c.id === courseId);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeDeleteModal());
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, dispatch]);

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch(closeDeleteModal())}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scale-in">
        <button
          onClick={() => dispatch(closeDeleteModal())}
          aria-label="إغلاق النافذة"
          className="absolute left-4 top-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" aria-hidden="true" />
          </div>

          <div>
            <h2 id="delete-modal-title" className="text-lg font-bold text-stone-900">
              حذف الدورة
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              هل أنت متأكد من حذف دورة{' '}
              <span className="font-semibold text-stone-700">"{course.title}"</span>؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>

          <div className="flex gap-3 w-full pt-2">
            <button
              onClick={() => dispatch(closeDeleteModal())}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-medium text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all"
            >
              إلغاء
            </button>
            <button
              onClick={() => dispatch(deleteCourse(course.id))}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all active:scale-95"
            >
              تأكيد الحذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}