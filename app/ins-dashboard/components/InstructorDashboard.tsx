"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import DashboardStats from "./DashboardStats";
import ActivityChart from "./ActivityChart";
import RecentRegistrations from "./RecentRegistrations";
import TopCourses from "./TopCourses";
import QuickActions from "./QuickActions";

export default function InstructorDashboard() {
    const [greeting] = useState(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "صباح الخير";
        if (hour < 17) return "مساء الخير";
        return "مساء الخير";
    });

    return (
        <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
            {/* ─── Header Section ──────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-secondary font-cairo">
                        لوحة التحكم
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-1 font-cairo">
                        {greeting}، م. محمد محمود 👋
                    </p>
                </div>
                <Link
                    href="/ins-courses"
                    className="
            group flex items-center gap-2 rounded-xl
            bg-gradient-to-l from-[#FF6400] to-[#FF8533]
            px-5 py-2.5 text-sm font-semibold text-white
            shadow-lg shadow-orange-200/60
            transition-all duration-300 ease-out
            hover:shadow-xl hover:shadow-orange-300/60
            hover:-translate-y-0.5
            active:translate-y-0 active:shadow-md
            font-cairo
          "
                >
                    <Plus
                        size={18}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:rotate-90"
                    />
                    إضافة دورة جديدة
                </Link>
            </div>

            {/* ─── Stats Cards ─────────────────────────────── */}
            <DashboardStats />

            {/* ─── Main Content Grid ───────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Activity Chart - takes 2 columns */}
                <div className="xl:col-span-2">
                    <ActivityChart />
                </div>
                {/* Recent Registrations */}
                <div className="xl:col-span-1">
                    <RecentRegistrations />
                </div>
            </div>

            {/* ─── Bottom Section ──────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <TopCourses />
                </div>
                <div className="xl:col-span-1">
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}
