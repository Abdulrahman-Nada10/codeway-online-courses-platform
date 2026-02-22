"use client";

import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

// ─── Data ───────────────────────────────────────────
const MONTHLY_DATA = [
    { month: "يناير", students: 45, earnings: 3200 },
    { month: "فبراير", students: 62, earnings: 4100 },
    { month: "مارس", students: 78, earnings: 5300 },
    { month: "أبريل", students: 55, earnings: 3800 },
    { month: "مايو", students: 92, earnings: 6200 },
    { month: "يونيو", students: 110, earnings: 7800 },
    { month: "يوليو", students: 88, earnings: 6100 },
    { month: "أغسطس", students: 125, earnings: 8900 },
    { month: "سبتمبر", students: 98, earnings: 7200 },
    { month: "أكتوبر", students: 140, earnings: 9500 },
    { month: "نوفمبر", students: 115, earnings: 8300 },
    { month: "ديسمبر", students: 150, earnings: 10200 },
];

const WEEKLY_DATA = [
    { month: "السبت", students: 12, earnings: 800 },
    { month: "الأحد", students: 18, earnings: 1200 },
    { month: "الاثنين", students: 15, earnings: 950 },
    { month: "الثلاثاء", students: 22, earnings: 1500 },
    { month: "الأربعاء", students: 28, earnings: 1900 },
    { month: "الخميس", students: 20, earnings: 1350 },
    { month: "الجمعة", students: 8, earnings: 500 },
];

type FilterType = "monthly" | "weekly";

// ─── Custom Tooltip ─────────────────────────────────
function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
}) {
    if (!active || !payload) return null;

    return (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 font-cairo text-sm min-w-[160px]">
            <p className="font-bold text-secondary mb-2 border-b border-gray-50 pb-1.5">{label}</p>
            {payload.map((p) => (
                <div key={p.dataKey} className="flex items-center justify-between gap-4 py-0.5">
                    <span className="text-gray-500 text-xs">
                        {p.dataKey === "students" ? "الطلاب" : "الأرباح"}
                    </span>
                    <span className="font-bold text-secondary text-xs">
                        {p.dataKey === "earnings"
                            ? `${p.value.toLocaleString("ar-EG")} ج.م`
                            : p.value.toLocaleString("ar-EG")}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ─── Main Component ─────────────────────────────────
export default function ActivityChart() {
    const [filter, setFilter] = useState<FilterType>("monthly");
    const [activeMetric, setActiveMetric] = useState<"students" | "earnings">("students");

    const data = filter === "monthly" ? MONTHLY_DATA : WEEKLY_DATA;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6400]">
                        <Activity size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-secondary font-cairo">
                            إحصائيات النشاط
                        </h3>
                        <p className="text-xs text-gray-400 font-cairo">تحليل الأداء والنمو</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Metric Toggle */}
                    <div className="flex items-center bg-gray-50 rounded-lg p-0.5 gap-0.5">
                        <button
                            onClick={() => setActiveMetric("students")}
                            className={`px-3 py-1.5 rounded-md text-xs font-cairo font-medium transition-all duration-200 ${activeMetric === "students"
                                ? "bg-white text-[#FF6400] shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            الطلاب
                        </button>
                        <button
                            onClick={() => setActiveMetric("earnings")}
                            className={`px-3 py-1.5 rounded-md text-xs font-cairo font-medium transition-all duration-200 ${activeMetric === "earnings"
                                ? "bg-white text-[#FF6400] shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            الأرباح
                        </button>
                    </div>

                    {/* Period Toggle */}
                    <div className="flex items-center bg-gray-50 rounded-lg p-0.5 gap-0.5">
                        <button
                            onClick={() => setFilter("weekly")}
                            className={`px-3 py-1.5 rounded-md text-xs font-cairo font-medium transition-all duration-200 ${filter === "weekly"
                                ? "bg-white text-[#FF6400] shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            أسبوعي
                        </button>
                        <button
                            onClick={() => setFilter("monthly")}
                            className={`px-3 py-1.5 rounded-md text-xs font-cairo font-medium transition-all duration-200 ${filter === "monthly"
                                ? "bg-white text-[#FF6400] shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            شهري
                        </button>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[280px] sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF6400" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#FF6400" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "Cairo" }}
                            axisLine={false}
                            tickLine={false}
                            dy={8}
                        />
                        <YAxis
                            tick={{ fill: "#9CA3AF", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            dx={-4}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {activeMetric === "students" && (
                            <Area
                                type="monotone"
                                dataKey="students"
                                stroke="#FF6400"
                                strokeWidth={2.5}
                                fill="url(#colorStudents)"
                                dot={false}
                                activeDot={{
                                    r: 5,
                                    fill: "#FF6400",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                            />
                        )}
                        {activeMetric === "earnings" && (
                            <Area
                                type="monotone"
                                dataKey="earnings"
                                stroke="#10B981"
                                strokeWidth={2.5}
                                fill="url(#colorEarnings)"
                                dot={false}
                                activeDot={{
                                    r: 5,
                                    fill: "#10B981",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6400]" />
                    <span className="text-xs text-gray-500 font-cairo">الطلاب الجدد</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-500 font-cairo">الأرباح</span>
                </div>
            </div>
        </div>
    );
}
