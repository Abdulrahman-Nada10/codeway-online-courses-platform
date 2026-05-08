"use client";

import { Search, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NavbarAdmin() {
  const { t } = useTranslation();

  return (
    <nav className="mx-4 lg:ms-4 lg:me-8 mt-4 h-20 bg-white dark:bg-[#1E293B] rounded-xl flex items-center justify-between px-8 shadow-sm border border-orange-50/50 dark:border-transparent transition-all duration-300">
      
      
      {/* Search Bar (Right side in RTL) */}
      <div className="flex-1  ">
        <div className="relative w-full max-w-[500px]">
          <input
            type="text"
            placeholder={t('admin.navbar.searchPlaceholder') || "البحث عن دروس، مدربين..."}
            className="w-full bg-[#F9F1E9] dark:bg-white/5 border-none rounded-[22px] py-4 pe-12 ps-6 text-sm focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 text-slate-600 dark:text-gray-300"
          />
          <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Profile & Notifications (Left side in RTL) */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 p-1 ps-4 rounded-[20px] bg-white dark:bg-white/5 shadow-sm border border-gray-50 dark:border-transparent">
          <div className="text-right hidden sm:block">
            <h4 className="text-[13px] font-bold text-[#113555] dark:text-white">محمد محمود</h4>
            <p className="text-[10px] text-orange-500 font-semibold leading-none mt-1">مشرف النظام</p>
          </div>
          <div className="w-10 h-10 rounded-[15px] overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <img
              src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <button className="p-3 bg-white dark:bg-white/5 rounded-[15px] shadow-sm text-gray-400 hover:text-orange-500 transition-all border border-gray-50 dark:border-transparent">
          <Bell size={20} />
        </button>
      </div>


    </nav>
  );
}