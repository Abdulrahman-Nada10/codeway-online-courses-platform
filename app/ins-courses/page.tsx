"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import { CourseTable } from "../components/Coursetable";
import { CourseFilters } from "../components/Coursefilters";
import { DeleteCourseModal } from "../components/Deletecoursemodal";

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={["instructor"]}>
      <>
        <Sidebar />
        <div className="md:mr-64 min-h-screen bg-stone-50 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
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

              <section aria-label="أدوات الفلترة والبحث" className="mb-6">
                <CourseFilters />
              </section>

              <section aria-label="قائمة الدورات">
                <CourseTable />
              </section>
            </div>
          </main>
          <DeleteCourseModal />
        </div>
      </>
    </ProtectedRoute>
  );
}

