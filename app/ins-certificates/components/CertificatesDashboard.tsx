"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Award,
  Clock,
  FileText,
  Search,
  ChevronDown,
  Filter,
  Eye,
  Download,
  ChevronRight,
  ChevronLeft,
  FileBadge,
  X,
} from "lucide-react";

// --- Types ---
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface CertificateData {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  status: "مكتمل" | "قيد الإصدار" | "ملغى";
  category: string;
  certificateUrl?: string;
}

// --- Mock Data ---
const STATS_DATA: StatCardProps[] = [
  { title: "إجمالي الشهادات", value: 1200, icon: <Award size={20} className="text-orange-500" />, iconBgColor: "bg-orange-100" },
  { title: "الشهادات الصادرة", value: 1150, icon: <FileBadge size={20} className="text-orange-500" />, iconBgColor: "bg-orange-100" },
  { title: "قيد الإصدار", value: 48, icon: <Clock size={20} className="text-orange-500" />, iconBgColor: "bg-orange-100" },
  { title: "قوالب الشهادات", value: 12, icon: <FileText size={20} className="text-orange-500" />, iconBgColor: "bg-orange-100" },
];

const CATEGORIES = [
  "تصميم واجهات المستخدم",
  "تطوير الويب",
  "البرمجة",
  "التسويق الرقمي",
  "إدارة الأعمال",
  "الذكاء الاصطناعي",
  "الأمن السيبراني",
  "تحليل البيانات",
  "تطوير التطبيقات",
  "التصميم الجرافيكي",
];

const STATUSES = ["الكل", "مكتمل", "قيد الإصدار", "ملغى"];

// Generate mock data with variety
const generateMockData = (): CertificateData[] => {
  const students = [
    "محمد محمود",
    "فاطمة أحمد",
    "علي حسن",
    "سارة خالد",
    "أحمد عبدالله",
    "نور الدين",
    "ليلى إبراهيم",
    "يوسف عمر",
    "مريم سعيد",
    "خالد محمد",
  ];

  const courses = [
    "تصميم واجهات المستخدم UI/UX",
    "تطوير تطبيقات الويب الحديثة",
    "أساسيات البرمجة بلغة Python",
    "التسويق الرقمي المتقدم",
    "إدارة المشاريع الاحترافية",
    "الذكاء الاصطناعي وتعلم الآلة",
    "الأمن السيبراني والحماية",
    "تحليل البيانات باستخدام Excel",
    "تطوير تطبيقات الموبايل",
    "التصميم الجرافيكي الإبداعي",
  ];

  const statuses: Array<"مكتمل" | "قيد الإصدار" | "ملغى"> = ["مكتمل", "قيد الإصدار", "ملغى"];

  return Array.from({ length: 150 }, (_, i) => ({
    id: `CERT-${String(i + 1).padStart(4, "0")}`,
    studentName: students[i % students.length],
    courseName: courses[i % courses.length],
    issueDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toLocaleDateString("ar-EG", { year: "numeric", month: "2-digit", day: "2-digit" }),
    status: statuses[Math.floor(Math.random() * 3)],
    category: CATEGORIES[i % CATEGORIES.length],
    certificateUrl: `/certificates/${i + 1}`,
  }));
};

const TABLE_DATA: CertificateData[] = generateMockData();

// --- Sub-Components ---

const StatCard = ({ title, value, icon, iconBgColor }: StatCardProps) => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-full ${iconBgColor}`}>{icon}</div>
    <div className="text-end">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

interface FiltersSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  onReset: () => void;
}

const FiltersSection = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onReset,
}: FiltersSectionProps) => {
  const hasActiveFilters = selectedStatus !== "الكل" || selectedCategory !== "الكل" || dateFrom || dateTo || searchQuery;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3 flex-wrap items-center">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 outline-none focus:ring-2 focus:ring-orange-500 w-40"
              aria-label="تصفية حسب الحالة"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === "الكل" ? "جميع الحالات" : status}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-8 pr-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 outline-none focus:ring-2 focus:ring-orange-500 w-48"
              aria-label="تصفية حسب التخصص"
            >
              <option value="الكل">جميع التخصصات</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Date Range Filters */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="من تاريخ"
            />
            <span className="text-gray-500 text-sm">إلى</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="إلى تاريخ"
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
              aria-label="إعادة تعيين الفلاتر"
            >
              <X size={16} />
              إعادة تعيين
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بعنوان الدورة أو اسم الطالب..."
            className="w-full pr-9 pl-4 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

interface DataTableProps {
  data: CertificateData[];
  onView: (certificate: CertificateData) => void;
  onDownload: (certificate: CertificateData) => void;
}

const DataTable = ({ data, onView, onDownload }: DataTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-700";
      case "قيد الإصدار":
        return "bg-yellow-100 text-yellow-700";
      case "ملغى":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-orange-50/50 text-gray-600 border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">رقم الشهادة</th>
              <th scope="col" className="px-6 py-4 font-semibold">الطالب</th>
              <th scope="col" className="px-6 py-4 font-semibold">الدورة</th>
              <th scope="col" className="px-6 py-4 font-semibold">التخصص</th>
              <th scope="col" className="px-6 py-4 font-semibold text-center">تاريخ الإصدار</th>
              <th scope="col" className="px-6 py-4 font-semibold text-center">الحالة</th>
              <th scope="col" className="px-6 py-4 font-semibold text-center">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  لا توجد شهادات مطابقة للبحث
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-600 font-mono text-xs">{row.id}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{row.studentName}</td>
                  <td className="px-6 py-4 text-gray-600">{row.courseName}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{row.category}</td>
                  <td className="px-6 py-4 text-gray-600 text-center">{row.issueDate}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onView(row)}
                        className="text-orange-500 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded"
                        aria-label="عرض الشهادة"
                        title="عرض الشهادة"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onDownload(row)}
                        className="text-orange-500 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded"
                        aria-label="تحميل الشهادة"
                        title="تحميل الشهادة"
                        disabled={row.status !== "مكتمل"}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
      <p>
        عرض البيانات من {startItem} إلى {endItem} من أصل {totalItems} شهادة
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 text-gray-600 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight size={18} />
        </button>
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`w-8 h-8 rounded flex items-center justify-center border transition-colors ${
              page === currentPage
                ? "bg-orange-500 text-white border-orange-500"
                : page === "..."
                ? "bg-white text-gray-400 border-gray-200 cursor-default"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 text-gray-600 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="الصفحة التالية"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
};

// Certificate Modal Component
interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

const CertificateModal = ({ certificate, onClose }: CertificateModalProps) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
          aria-label="إغلاق"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-orange-100 rounded-full">
              <Award size={48} className="text-orange-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">شهادة إتمام الدورة</h2>

          <div className="border-2 border-orange-200 rounded-lg p-8 my-6 bg-gradient-to-br from-orange-50 to-white">
            <p className="text-lg text-gray-600 mb-2">هذه الشهادة تمنح لـ</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{certificate.studentName}</h3>
            <p className="text-gray-600 mb-2">لإتمامه بنجاح دورة</p>
            <h4 className="text-xl font-semibold text-orange-600 mb-4">{certificate.courseName}</h4>
            <p className="text-sm text-gray-500">رقم الشهادة: {certificate.id}</p>
            <p className="text-sm text-gray-500">تاريخ الإصدار: {certificate.issueDate}</p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                // Simulate download
                const link = document.createElement("a");
                link.href = certificate.certificateUrl || "#";
                link.download = `certificate-${certificate.id}.pdf`;
                link.click();
              }}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Download size={18} />
              تحميل الشهادة
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function CertificatesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredData = useMemo(() => {
    return TABLE_DATA.filter((cert) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === "الكل" || cert.status === selectedStatus;

      // Category filter
      const matchesCategory = selectedCategory === "الكل" || cert.category === selectedCategory;

      // Date filter
      const certDate = new Date(cert.issueDate.split("-").reverse().join("-"));
      const matchesDateFrom = !dateFrom || certDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || certDate <= new Date(dateTo);

      return matchesSearch && matchesStatus && matchesCategory && matchesDateFrom && matchesDateTo;
    });
  }, [searchQuery, selectedStatus, selectedCategory, dateFrom, dateTo]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("الكل");
    setSelectedCategory("الكل");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle view certificate
  const handleViewCertificate = (certificate: CertificateData) => {
    setSelectedCertificate(certificate);
  };

  // Handle download certificate
  const handleDownloadCertificate = (certificate: CertificateData) => {
    if (certificate.status !== "مكتمل") {
      alert("لا يمكن تحميل الشهادة. الشهادة غير مكتملة بعد.");
      return;
    }

    // Simulate download
    const link = document.createElement("a");
    link.href = certificate.certificateUrl || "#";
    link.download = `certificate-${certificate.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`تم تحميل شهادة ${certificate.studentName} بنجاح!`);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCategory, dateFrom, dateTo]);

  return (
    <div className="p-6 mr-64 bg-[#fdfaf7] min-h-screen font-cairo" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">الشهادات</h1>
          <p className="text-sm text-gray-500">إدارة شهادات الطلاب</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} />
          إصدار شهادة
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS_DATA.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Filters Section */}
      <FiltersSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        onReset={handleResetFilters}
      />

      {/* Data Table */}
      <DataTable data={paginatedData} onView={handleViewCertificate} onDownload={handleDownloadCertificate} />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Certificate Modal */}
      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
    </div>
  );
}
