"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronRight, ChevronLeft, X } from "lucide-react";

/**
 * الهدف:
 * هذا الملف يمثل صفحة "الطلبات / الطلاب" بنفس شكل الصورة تمامًا
 * مع كود نظيف، قابل للتوسعة، وجاهز للربط مع API لاحقًا
 */

// ============================
// 1) Types & Mock Data
// ============================

type StudentStatus = "نشط" | "معلق" | "غير نشط";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  course: string;
  specialization: string;
  progress: number;
  status: StudentStatus;
  lastActivity: string;
  enrolledDate: string;
  phone: string;
}

const specializations = [
  "التسويق الإلكتروني",
  "تطوير الويب",
  "تعلم الآلة",
  "التصميم الجرافيكي",
  "إدارة الأعمال",
  "البرمجة",
  "علوم البيانات",
];

const studentNames = [
  { first: "عبد الرحمن", last: "محمود" },
  { first: "سارة", last: "أحمد" },
  { first: "محمد", last: "علي" },
  { first: "فاطمة", last: "محمد" },
  { first: "أحمد", last: "ياسين" },
  { first: "منى", last: "إبراهيم" },
  { first: "ياسر", last: "الغامدي" },
  { first: "نورة", last: "عبدالله" },
  { first: "خالد", last: "سالم" },
  { first: "هدى", last: "أحمد" },
  { first: "عمر", last: "فريد" },
  { first: "ليلى", last: " Hussein" },
  { first: "باسم", last: "كمال" },
  { first: "رنا", last: "حاتم" },
  { first: "سمير", last: "نور الدين" },
  { first: "دنيا", last: "مصطفي" },
  { first: "وائل", last: "معتوق" },
  { first: "آسيا", last: "عثمان" },
  { first: "كرم", last: "درويش" },
  { first: "فرح", last: "أمين" },
  { first: "حسين", last: "جعفر" },
  { first: "سلمى", last: "رشيد" },
  { first: "بدر", last: "النعيمي" },
  { first: "جنى", last: "حسين" },
  { first: "رامي", last: "اسحق" },
  { first: "نيما", last: "شريف" },
  { first: "زكريا", last: "مصباح" },
  { first: "هند", last: "سعد" },
  { first: "علي", last: "رضا" },
  { first: "مريم", last: "نور" },
];

const generateStudents = (count: number): Student[] => {
  return Array.from({ length: count }).map((_, index) => {
    const name = studentNames[index % studentNames.length];
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    const statuses: StudentStatus[] = ["نشط", "معلق", "غير نشط"];
    const statusWeights = [0.6, 0.25, 0.15];
    const random = Math.random();
    let status: StudentStatus = "نشط";
    let cumulative = 0;
    for (let i = 0; i < statuses.length; i++) {
      cumulative += statusWeights[i];
      if (random < cumulative) {
        status = statuses[i];
        break;
      }
    }

    const progress = Math.floor(Math.random() * 101);
    const daysAgo = Math.floor(Math.random() * 30);
    const lastActivityDays = daysAgo === 0 ? "اليوم" : daysAgo === 1 ? "أمس" : `منذ ${daysAgo} أيام`;

    const enrolledDaysAgo = Math.floor(Math.random() * 180) + 1;
    const enrolledDate = new Date();
    enrolledDate.setDate(enrolledDate.getDate() - enrolledDaysAgo);

    const activityOptions = ["منذ ساعة", "منذ ساعتين", "منذ 3 ساعات", "منذ يوم", "منذ يومين", "منذ 3 أيام", lastActivityDays];

    return {
      id: `student-${index + 1}-${Date.now()}`,
      name: `${name.first} ${name.last}`,
      email: `${name.first.toLowerCase()}${name.last.toLowerCase()}${index}@gmail.com`,
      avatar: `https://i.pravatar.cc/100?img=${(index % 70) + 1}`,
      course: `${specialization} - المستوى ${Math.floor(Math.random() * 3) + 1}`,
      specialization,
      progress,
      status,
      lastActivity: activityOptions[Math.floor(Math.random() * activityOptions.length)],
      enrolledDate: enrolledDate.toLocaleDateString("ar-SA"),
      phone: `+966 5${Math.floor(Math.random() * 90000000 + 10000000)}`,
    };
  });
};

// Generate 50 realistic students
const allStudents = generateStudents(50);

// ============================
// 2) Components
// ============================

const ProgressBar = ({ value }: { value: number }) => {
  const getColor = (progress: number) => {

    return "bg-orange-600";
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 font-medium">{value}%</span>
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: StudentStatus }) => {
  const styles = {
    نشط: {
      container: "bg-green-100 text-green-700",
      dot: "bg-green-500",
    },
    معلق: {
      container: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
    },
    "غير نشط": {
      container: "bg-gray-100 text-gray-700",
      dot: "bg-gray-400",
    },
  };

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-0 py-1.5 ml-12
        justify-center
        rounded-full
        text-xs font-semibold
        whitespace-nowrap
        ${styles[status].container}
      `}
    >
      <span
        className={`
          w-2 h-2 rounded-full
          ${styles[status].dot}
        `}
      />
      {status}
    </span>
  );
};

const PaginationBtn = ({
  children,
  active,
  onClick,
  disabled
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-8 h-8 rounded-md text-sm font-medium border transition flex items-center justify-center
      ${active
        ? "bg-orange-500 text-white border-orange-500"
        : disabled
          ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
          : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300"
      }`}
  >
    {children}
  </button>
);

// ============================
// 3) Page
// ============================

export default function StudentsContentView() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [specializationFilter, setSpecializationFilter] = useState<string>("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 9;

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      // Search filter
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "الكل" || student.status === statusFilter;

      // Specialization filter
      const matchesSpecialization = specializationFilter === "الكل" || student.specialization === specializationFilter;

      return matchesSearch && matchesStatus && matchesSpecialization;
    });
  }, [searchQuery, statusFilter, specializationFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, specializationFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleSpecializationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecializationFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("الكل");
    setSpecializationFilter("الكل");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter !== "الكل" || specializationFilter !== "الكل";

  // Generate pagination page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <main dir="rtl" className="min-h-0 space-y-4 md:space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">الطلاب</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">متابعة تقدم الطلاب في دوراتك</p>
        </div>

      </header>

      {/* Filters */}
      <section className="bg-white rounded-xl border p-3 md:p-4 flex flex-col gap-3">
        {/* Mobile: Filters and Search stacked, Desktop: inline */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Left side - Filter buttons */}
          <div className="flex gap-2 md:gap-3 flex-wrap order-2 lg:order-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 text-sm border rounded-lg transition
                ${showFilters ? "bg-orange-500 text-white border-orange-500" : "bg-gray-50 hover:bg-orange-50"}`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">فلترة</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showFilters && (
              <>
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="px-1 md:px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 min-w-[120px]"
                >
                  <option value="الكل">جميع الحالات</option>
                  <option value="نشط">نشط</option>
                  <option value="معلق">معلق</option>
                  <option value="غير نشط">غير نشط</option>
                </select>

                <select
                  value={specializationFilter}
                  onChange={handleSpecializationFilter}
                  className="px-3 md:px-4 py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 min-w-[120px]"
                >
                  <option value="الكل">التخصصات</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </>
            )}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <X size={14} />
                <span className="hidden sm:inline">مسح الفلاتر</span>
              </button>
            )}
          </div>

          {/* Right side - Search */}
          <div className="relative w-full lg:max-w-md order-1 lg:order-2">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="بحث بالاسم أو التخصص أو البريد الإلكتروني"
              className="w-full pr-10 pl-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Table - Desktop / Cards - Mobile */}
      <section className="bg-white rounded-xl border overflow-hidden">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] p-4 bg-orange-50 text-sm font-semibold text-gray-700">
          <span>الطالب</span>
          <span>الدورة</span>
          <span>التقدم</span>
          <span>الحالة</span>
          <span>آخر نشاط</span>
        </div>

        {paginatedStudents.length === 0 ? (
          <div className="p-8 md:p-12 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500 text-sm md:text-base">لا توجد نتائج مطابقة للبحث</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-orange-500 hover:underline text-sm"
            >
              مسح الفلاتر
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Mobile Card View */}
            <div className="lg:hidden flex flex-col">
              {paginatedStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* Student Info */}
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{student.name}</p>
                      <p className="text-xs text-gray-500 truncate" dir="ltr">{student.email}</p>
                    </div>
                    <StatusBadge status={student.status} />
                  </div>

                  {/* Course Info */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-700">{student.course}</p>
                    <p className="text-xs text-gray-400">{student.specialization}</p>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">التقدم</span>
                    </div>
                    <ProgressBar value={student.progress} />
                  </div>

                  {/* Last Activity */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">آخر نشاط:</span>
                    <span className="text-xs text-gray-500">{student.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              {paginatedStudents.map((student) => (
                <div
                  key={student.id}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] p-4 items-center border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500" dir="ltr">{student.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700">{student.course}</p>
                    <p className="text-xs text-gray-400">{student.specialization}</p>
                  </div>

                  <ProgressBar value={student.progress} />

                  <StatusBadge status={student.status} />

                  <p className="text-sm text-gray-500">{student.lastActivity}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1 order-2 sm:order-1">
            <PaginationBtn
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight size={14} />
            </PaginationBtn>

            {pageNumbers.map((page, index) => (
              typeof page === "number" ? (
                <PaginationBtn
                  key={index}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationBtn>
              ) : (
                <span key={index} className="px-1 text-gray-400">...</span>
              )
            ))}

            <PaginationBtn
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft size={14} />
            </PaginationBtn>
          </div>

          <span className="text-xs order-1 sm:order-2 text-center sm:text-right">
            عرض البيانات من {startIndex + 1} إلى {Math.min(startIndex + itemsPerPage, filteredStudents.length)} من أصل {filteredStudents.length} طالب
          </span>
        </footer>
      )}
    </main>
  );
}
