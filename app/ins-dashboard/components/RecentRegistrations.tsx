"use client";

import { UserPlus, Clock, ArrowUpLeft } from "lucide-react";

// ─── Data ───────────────────────────────────────────
const REGISTRATIONS = [
    {
        id: 1,
        name: "أحمد محمد",
        course: "أساسيات البرمجة بلغة بايثون",
        time: "منذ 5 دقائق",
        avatar: "أ",
        avatarColor: "from-blue-400 to-blue-500",
    },
    {
        id: 2,
        name: "سارة أحمد",
        course: "تصميم واجهات المستخدم UI/UX",
        time: "منذ 20 دقيقة",
        avatar: "س",
        avatarColor: "from-pink-400 to-pink-500",
    },
    {
        id: 3,
        name: "محمود خالد",
        course: "تطوير تطبيقات الويب بـ React",
        time: "منذ ساعة",
        avatar: "م",
        avatarColor: "from-emerald-400 to-emerald-500",
    },
    {
        id: 4,
        name: "نور الدين",
        course: "قواعد البيانات SQL المتقدمة",
        time: "منذ ساعتين",
        avatar: "ن",
        avatarColor: "from-purple-400 to-purple-500",
    },
    {
        id: 5,
        name: "ليلى حسن",
        course: "أساسيات البرمجة بلغة بايثون",
        time: "منذ 3 ساعات",
        avatar: "ل",
        avatarColor: "from-amber-400 to-amber-500",
    },
    {
        id: 6,
        name: "عمر سعيد",
        course: "تطوير تطبيقات الموبايل Flutter",
        time: "منذ 5 ساعات",
        avatar: "ع",
        avatarColor: "from-cyan-400 to-cyan-500",
    },
];

// ─── Main Component ─────────────────────────────────
export default function RecentRegistrations() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <UserPlus size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-secondary font-cairo">
                            أحدث التسجيلات
                        </h3>
                        <p className="text-xs text-gray-400 font-cairo">آخر الطلاب المسجلين</p>
                    </div>
                </div>
                <button className="text-xs text-[#FF6400] hover:text-[#e65900] font-cairo font-medium transition-colors flex items-center gap-1">
                    عرض الكل
                    <ArrowUpLeft size={12} />
                </button>
            </div>

            {/* Registrations List */}
            <div className="flex-1 overflow-y-auto space-y-1 -mx-2 px-2 custom-scrollbar">
                {REGISTRATIONS.map((reg, index) => (
                    <div
                        key={reg.id}
                        className="
              group flex items-center gap-3 p-3 rounded-xl
              hover:bg-gray-50/80 transition-all duration-200
              cursor-pointer
            "
                        style={{ animationDelay: `${index * 60}ms` }}
                    >
                        {/* Avatar */}
                        <div
                            className={`
                w-10 h-10 rounded-xl bg-gradient-to-br ${reg.avatarColor}
                flex items-center justify-center shrink-0
                text-white text-sm font-bold shadow-sm
                transition-transform duration-200
                group-hover:scale-105
              `}
                        >
                            {reg.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-secondary font-cairo truncate">
                                {reg.name}
                            </p>
                            <p className="text-xs text-gray-400 font-cairo truncate mt-0.5">
                                {reg.course}
                            </p>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1 shrink-0">
                            <Clock size={11} className="text-gray-300" />
                            <span className="text-[10px] text-gray-400 font-cairo whitespace-nowrap">
                                {reg.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
