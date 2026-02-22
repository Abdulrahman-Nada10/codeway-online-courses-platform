'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Bell as BellIcon } from './icons';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="p-3 sm:p-4 lg:p-6 pt-3 sm:pt-4 lg:pt-6">
      <nav className="bg-white rounded-2xl px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 shadow-sm">
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="hidden md:block relative p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="الإشعارات"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#113555]" strokeWidth={2} />
            <span className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF6400] rounded-full"></span>
          </button>

          <div className="md:hidden relative">
            <button
              className="relative p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="الإشعارات"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#113555]" strokeWidth={2} />
              <span className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF6400] rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-cairo font-bold text-sm sm:text-base text-[#113555]">الإشعارات</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="font-cairo text-xs sm:text-sm text-[#113555]">تم إضافة دورة جديدة</p>
                    <span className="font-cairo text-xs text-gray-400">منذ ساعة</span>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="font-cairo text-xs sm:text-sm text-[#113555]">تم منحك شهادة جديدة</p>
                    <span className="font-cairo text-xs text-gray-400">منذ يوم</span>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="font-cairo text-xs sm:text-sm text-[#113555]">خصم 20% على جميع الدورات</p>
                    <span className="font-cairo text-xs text-gray-400">منذ يومين</span>
                  </div>
                </div>
                <Link href="/settings" className="block p-3 text-center bg-gray-50 hover:bg-gray-100">
                  <span className="font-cairo text-xs sm:text-sm text-[#FF6400]">عرض كل الإشعارات</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/profile" className="block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-[#FF6400] cursor-pointer">
                <Image
                  src="/profile.jpg"
                  alt="البروفايل"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-cairo font-bold text-sm sm:text-base text-[#113555] leading-tight">
                عمر محمد السيد
              </span>
              <span className="font-cairo font-light text-xs text-[#FF6400]">مدرب</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

