"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, Settings } from "lucide-react";
import SearchBar from "@/app/components/SearchBar";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
<header
  className="
    w-full
    sm:w-11/12
    md:w-10/12
    lg:w-[calc(100%-280px)]
    xl:w-[calc(100%-256px)]
    2xl:w-[calc(100%-300px)]
    bg-transparent
    p-3 sm:p-5
    font-cairo
    fixed top-0 left-0
    z-50
  "
  dir="rtl"
>
      <nav className="mx-auto max-w-7xl bg-white rounded-2xl sm:rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-orange-50/50 px-4 sm:px-8 py-3 flex items-center justify-between gap-3">


        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
          <SearchBar />
        </div>

    
        <div className="flex items-center gap-2 sm:gap-3">

          
          <div className="relative">
            <button
              aria-label="الإشعارات"
              title="الإشعارات"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 rounded-xl hover:bg-orange-50 transition"
            >
              <Bell className="h-5 w-5 text-[#113555]" />
              <span className="absolute top-1 left-1 w-2 h-2 bg-[#FF6400] rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">

                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-cairo font-bold text-sm text-[#113555]">
                    الإشعارات
                  </h3>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="text-sm text-[#113555]">
                      تم إضافة دورة جديدة
                    </p>
                    <span className="text-xs text-gray-400">منذ ساعة</span>
                  </div>

                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <p className="text-sm text-[#113555]">
                      تم الرد على سؤالك
                    </p>
                    <span className="text-xs text-gray-400">منذ يوم</span>
                  </div>

                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-[#113555]">
                      خصم 20% على الدورات
                    </p>
                    <span className="text-xs text-gray-400">منذ يومين</span>
                  </div>
                </div>
              </div>
            )}
          </div>


        
          <div className="flex items-center gap-2 sm:gap-3">

            <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-[#FF6400]">
              <Image
                src="/profile.jpg"
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col items-start text-right">
              <span className="font-cairo font-bold text-sm text-[#113555] leading-tight">
               عمر محمد 
              </span>
              <span className="font-cairo text-xs text-[#FF6400]">
                طالب
              </span>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}