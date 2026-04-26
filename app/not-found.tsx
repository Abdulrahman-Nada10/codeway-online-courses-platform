'use client';

import Link from 'next/link';
import { BookOpen, Home, Search, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="min-h-screen bg-stone-50 flex items-center justify-center px-6"
      role="main"
      aria-labelledby="notfound-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div
        className="relative text-center max-w-lg w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-200">
              <BookOpen size={52} className="text-white" aria-hidden="true" />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-stone-100">
              <Search size={18} className="text-orange-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* 404 number */}
        <p
          className="text-9xl font-black text-stone-200 leading-none select-none mb-2"
          aria-hidden="true"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          404
        </p>

        {/* Heading */}
        <h1
          id="notfound-title"
          className="text-2xl font-extrabold text-stone-900 mb-3"
        >
          الصفحة غير موجودة
        </h1>

        <p className="text-stone-500 text-base leading-relaxed mb-10">
          يبدو أن الصفحة التي تبحث عنها لا وجود لها، أو أنها نُقلت إلى مكان آخر.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-all active:scale-95 shadow-md shadow-orange-200 w-full sm:w-auto justify-center"
          >
            <Home size={16} aria-hidden="true" />
            العودة للرئيسية
            <ArrowRight
              size={15}
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/ins-courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 font-semibold text-sm hover:bg-stone-50 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            <BookOpen size={16} aria-hidden="true" />
            دوراتي
          </Link>
        </div>

        {/* Divider hint */}
        <p className="mt-10 text-xs text-stone-400">
          إذا كنت تعتقد أن هذا خطأ،{' '}
          <a
            href="mailto:support@lms.com"
            className="text-orange-500 hover:text-orange-600 underline underline-offset-2 transition-colors"
          >
            تواصل مع الدعم
          </a>
        </p>
      </div>
    </main>
  );
}
