"use client";

import Link from "next/link";
import {
    BookOpen,
    Users,
    Award,
    Settings,
    FileText,
    MessageSquare,
    ChevronLeft,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────
const QUICK_ACTIONS = [
    {
        id: "add-course",
        label: "إضافة دورة جديدة",
        description: "أنشئ دورة تعليمية جديدة",
        href: "/ins-courses",
        icon: <BookOpen size={20} strokeWidth={1.75} />,
        iconBg: "bg-orange-50 group-hover:bg-orange-100",
        iconColor: "text-[#FF6400]",
    },
    {
        id: "view-students",
        label: "إدارة الطلاب",
        description: "عرض وإدارة طلابك",
        href: "/ins-students",
        icon: <Users size={20} strokeWidth={1.75} />,
        iconBg: "bg-blue-50 group-hover:bg-blue-100",
        iconColor: "text-blue-500",
    },
    {
        id: "certificates",
        label: "إصدار شهادات",
        description: "إنشاء شهادات للطلاب",
        href: "/ins-certificates",
        icon: <Award size={20} strokeWidth={1.75} />,
        iconBg: "bg-amber-50 group-hover:bg-amber-100",
        iconColor: "text-amber-500",
    },
    {
        id: "earnings",
        label: "تقارير الأرباح",
        description: "عرض تقارير الأرباح المفصلة",
        href: "/ins-earnings",
        icon: <FileText size={20} strokeWidth={1.75} />,
        iconBg: "bg-emerald-50 group-hover:bg-emerald-100",
        iconColor: "text-emerald-500",
    },
    {
        id: "settings",
        label: "الإعدادات",
        description: "إدارة حسابك والتفضيلات",
        href: "/ins-settings",
        icon: <Settings size={20} strokeWidth={1.75} />,
        iconBg: "bg-gray-50 group-hover:bg-gray-100",
        iconColor: "text-gray-500",
    },
];

// ─── Main Component ─────────────────────────────────
export default function QuickActions() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                    <MessageSquare size={18} strokeWidth={1.75} />
                </div>
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-secondary font-cairo">
                        إجراءات سريعة
                    </h3>
                    <p className="text-xs text-gray-400 font-cairo">وصول سريع لأهم الصفحات</p>
                </div>
            </div>

            {/* Actions List */}
            <div className="flex-1 space-y-2">
                {QUICK_ACTIONS.map((action) => (
                    <Link
                        key={action.id}
                        href={action.href}
                        className="
              group flex items-center gap-3 p-3 rounded-xl
              hover:bg-gray-50/80 
              transition-all duration-200
              border border-transparent hover:border-gray-100
            "
                    >
                        <div
                            className={`
                w-10 h-10 rounded-xl ${action.iconBg} ${action.iconColor}
                flex items-center justify-center shrink-0
                transition-all duration-200
                group-hover:scale-105
              `}
                        >
                            {action.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-secondary font-cairo">
                                {action.label}
                            </p>
                            <p className="text-xs text-gray-400 font-cairo mt-0.5">
                                {action.description}
                            </p>
                        </div>

                        <ChevronLeft
                            size={16}
                            className="text-gray-300 shrink-0 transition-all duration-200 group-hover:text-[#FF6400] group-hover:-translate-x-1"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
