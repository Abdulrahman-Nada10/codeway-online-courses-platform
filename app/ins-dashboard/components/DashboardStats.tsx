"use client";

import { useEffect, useState } from "react";
import {
    Users,
    TrendingUp,
    TrendingDown,
    BookOpen,
    DollarSign,
    BarChart3,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────
type StatCard = {
    id: string;
    label: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
    changeLabel: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
};

// ─── Data ───────────────────────────────────────────
const STATS: StatCard[] = [
    {
        id: "students",
        label: "إجمالي الطلاب",
        value: "850",
        change: "+12%",
        changeType: "positive",
        changeLabel: "هذا الشهر",
        icon: <Users size={22} strokeWidth={1.75} />,
        iconBg: "bg-orange-50",
        iconColor: "text-[#FF6400]",
    },
    {
        id: "registrations",
        label: "التسجيلات هذا الشهر",
        value: "25",
        change: "7%",
        changeType: "positive",
        changeLabel: "من الشهر السابق",
        icon: <BarChart3 size={22} strokeWidth={1.75} />,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
    },
    {
        id: "earnings",
        label: "إجمالي الأرباح",
        value: "47,568",
        change: "-8%",
        changeType: "negative",
        changeLabel: "من الشهر السابق",
        icon: <DollarSign size={22} strokeWidth={1.75} />,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
    },
    {
        id: "courses",
        label: "الدورات النشطة",
        value: "10",
        change: "+2",
        changeType: "positive",
        changeLabel: "دورات جديدة",
        icon: <BookOpen size={22} strokeWidth={1.75} />,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
    },
];

// ─── AnimatedCounter ────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(target.replace(/,/g, ""), 10);

    useEffect(() => {
        const duration = 1200;
        const steps = 40;
        const increment = numericTarget / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                setCount(numericTarget);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [numericTarget]);

    return (
        <span>
            {count.toLocaleString("ar-EG")}
            {suffix}
        </span>
    );
}

// ─── Main Component ─────────────────────────────────
export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            {STATS.map((stat, index) => (
                <div
                    key={stat.id}
                    className="
            group relative overflow-hidden
            rounded-2xl bg-white border border-gray-100
            p-5 sm:p-6
            shadow-sm hover:shadow-lg hover:shadow-gray-200/60
            transition-all duration-300 ease-out
            hover:-translate-y-1
            cursor-default
          "
                    style={{ animationDelay: `${index * 80}ms` }}
                >
                    {/* Decorative gradient accent */}
                    <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.04] -translate-y-8 translate-x-8
              transition-transform duration-500 group-hover:scale-150"
                        style={{
                            background:
                                stat.id === "students"
                                    ? "#FF6400"
                                    : stat.id === "registrations"
                                        ? "#3B82F6"
                                        : stat.id === "earnings"
                                            ? "#10B981"
                                            : "#8B5CF6",
                        }}
                    />

                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500 font-cairo mb-2 truncate">
                                {stat.label}
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-secondary font-cairo leading-none">
                                <AnimatedCounter target={stat.value} />
                                {stat.id === "earnings" && (
                                    <span className="text-sm sm:text-base font-medium text-gray-400 mr-1.5">
                                        ج.م
                                    </span>
                                )}
                            </p>
                        </div>
                        <div
                            className={`
                flex items-center justify-center
                w-11 h-11 sm:w-12 sm:h-12 rounded-xl
                ${stat.iconBg} ${stat.iconColor}
                transition-transform duration-300
                group-hover:scale-110 group-hover:rotate-3
                shrink-0
              `}
                        >
                            {stat.icon}
                        </div>
                    </div>

                    {/* Change indicator */}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-50">
                        {stat.changeType === "positive" ? (
                            <TrendingUp size={14} className="text-emerald-500 shrink-0" />
                        ) : (
                            <TrendingDown size={14} className="text-red-500 shrink-0" />
                        )}
                        <span
                            className={`text-xs font-bold ${stat.changeType === "positive" ? "text-emerald-500" : "text-red-500"
                                }`}
                        >
                            {stat.change}
                        </span>
                        <span className="text-xs text-gray-400 font-cairo">{stat.changeLabel}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
