import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { CourseTable } from '../components/Coursetable';
import { CourseFilters } from '../components/Coursefilters';
import { DeleteCourseModal } from '../components/Deletecoursemodal';


export const metadata = {
  title: 'دوراتي | منصة التعلم',
  description: 'إدارة الدورات والمحتوى التعليمي',
};  

export default function Page() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10">

          {/* ── Page Header ── */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="text-right">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                دوراتي
              </h1>
              <p className="text-stone-500 text-sm mt-0.5">
                إدارة الدورات والمحتوى التعليمي
              </p>
            </div>

            <Link
              href="/ins-courses/new"
              aria-label="إضافة دورة جديدة"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-all shadow-md shadow-orange-200 w-full sm:w-auto justify-center"
            >
              <Plus size={18} aria-hidden="true" />
              إضافة دورة جديدة
            </Link>
          </header>

          {/* ── Filters ── */}
          <section aria-label="أدوات الفلترة والبحث" className="mb-6">
            <CourseFilters />
          </section>

          {/* ── Table ── */}
          <section aria-label="قائمة الدورات">
            <CourseTable />
          </section>
        </div>
      </main>
            <DeleteCourseModal />

    </>
  );
}
