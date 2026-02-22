import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CourseForm } from '../../components/Courseform';
import Sidebar from "../../components/ui/SidebarInstructor";
import Navbar from "../../components/NavbarInstructor";

export const metadata = {
  title: 'إضافة دورة جديدة | منصة التعلم',
  description: 'إضافة دورة تعليمية جديدة',
};

export default function NewCoursePage() {
  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-stone-50 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8" dir="rtl">
          <div className="max-w-3xl mx-auto">

            {/* ── Page Header ── */}
            <header className="mb-6 sm:mb-8 text-right">
              <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-3">
                <Link
                  href="/ins-courses"
                  className="hover:text-orange-500 transition-colors focus:outline-none focus:underline"
                >
                  دوراتي
                </Link>
                <ChevronRight size={14} className="rotate-180 text-stone-300" aria-hidden="true" />
                <span className="text-stone-700 font-medium">إضافة دورة جديدة</span>
              </nav>

              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                إضافة دورة جديدة
              </h1>
              <p className="text-stone-500 text-sm mt-0.5">
                أدخل بيانات الدورة الجديدة
              </p>
            </header>

            {/* ── Form ── */}
            <CourseForm />
          </div>
        </main>
      </div>
    </>
  );
}