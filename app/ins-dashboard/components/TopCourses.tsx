"use client";

import { Trophy, Star, Users, TrendingUp, ArrowUpLeft } from "lucide-react";

// ─── Data ───────────────────────────────────────────
const TOP_COURSES = [
    {
        id: 1,
        title: "أساسيات البرمجة بلغة بايثون",
        students: 245,
        rating: 4.8,
        progress: 92,
        earnings: "12,500",
        color: "#FF6400",
        trend: "+15%",
    },
    {
        id: 2,
        title: "تصميم واجهات المستخدم UI/UX",
        students: 198,
        rating: 4.9,
        progress: 87,
        earnings: "9,800",
        color: "#3B82F6",
        trend: "+22%",
    },
    {
        id: 3,
        title: "تطوير تطبيقات الويب بـ React",
        students: 176,
        rating: 4.7,
        progress: 78,
        earnings: "8,400",
        color: "#10B981",
        trend: "+8%",
    },
    {
        id: 4,
        title: "قواعد البيانات SQL المتقدمة",
        students: 132,
        rating: 4.6,
        progress: 65,
        earnings: "6,200",
        color: "#8B5CF6",
        trend: "+12%",
    },
    {
        id: 5,
        title: "تطوير تطبيقات الموبايل Flutter",
        students: 98,
        rating: 4.5,
        progress: 54,
        earnings: "4,800",
        color: "#EC4899",
        trend: "+5%",
    },
];

// ─── Main Component ─────────────────────────────────
export default function TopCourses() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                        <Trophy size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-secondary font-cairo">
                            أفضل الدورات
                        </h3>
                        <p className="text-xs text-gray-400 font-cairo">حسب عدد الطلاب المسجلين</p>
                    </div>
                </div>
                <button className="text-xs text-[#FF6400] hover:text-[#e65900] font-cairo font-medium transition-colors flex items-center gap-1">
                    عرض الكل
                    <ArrowUpLeft size={12} />
                </button>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto -mx-2">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-right text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                #
                            </th>
                            <th className="text-right text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                الدورة
                            </th>
                            <th className="text-center text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                الطلاب
                            </th>
                            <th className="text-center text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                التقييم
                            </th>
                            <th className="text-center text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                الاتجاه
                            </th>
                            <th className="text-left text-xs font-medium text-gray-400 font-cairo pb-3 px-2">
                                الأرباح
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {TOP_COURSES.map((course, index) => (
                            <tr
                                key={course.id}
                                className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
                            >
                                <td className="py-3.5 px-2">
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                        style={{ backgroundColor: course.color }}
                                    >
                                        {index + 1}
                                    </div>
                                </td>
                                <td className="py-3.5 px-2">
                                    <p className="text-sm font-semibold text-secondary font-cairo truncate max-w-[200px]">
                                        {course.title}
                                    </p>
                                    {/* Progress bar */}
                                    <div className="mt-1.5 h-1 w-full max-w-[120px] bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700 ease-out"
                                            style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                                        />
                                    </div>
                                </td>
                                <td className="py-3.5 px-2 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Users size={13} className="text-gray-400" />
                                        <span className="text-sm font-bold text-secondary">{course.students}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 px-2 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Star size={13} className="text-amber-400 fill-amber-400" />
                                        <span className="text-sm font-bold text-secondary">{course.rating}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 px-2 text-center">
                                    <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                        <TrendingUp size={11} />
                                        <span className="text-xs font-bold">{course.trend}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 px-2 text-left">
                                    <span className="text-sm font-bold text-secondary">{course.earnings}</span>
                                    <span className="text-xs text-gray-400 mr-0.5">ج.م</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
