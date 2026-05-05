"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  CreditCard, FileText, Award, Settings, LogOut
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  { name: 'نظرة عامة', icon: LayoutDashboard, href: '/adminDashboard' },
  { name: 'المستخدمون', icon: Users, href: '/adminDashboard/users' },
  { name: 'المدربون', icon: GraduationCap, href: '/adminDashboard/instructors' },
  { name: 'الدورات', icon: BookOpen, href: '/adminDashboard/courses' },
  { name: 'المدفوعات', icon: CreditCard, href: '/adminDashboard/payments' },
  { name: 'التقارير', icon: FileText, href: '/adminDashboard/reports' },
  { name: 'الشهادات', icon: Award, href: '/adminDashboard/certificates' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 bg-white  fixed top-0  z-50 flex flex-col border-l border-gray-100 py-6"  dir="rtl">
      
    
      <div className="px-8 mb-10 flex justify-center">
        <div className="flex items-center gap-1">
          <Image src="/logo.png" alt="logo" width={120} height={40} />
          <div className="w-2 h-2 rounded-full bg-[#E9611D] mt-4"></div>
        </div>
      </div>

     
      <nav className="flex-1 px-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all 
              ${isActive ? "bg-[#FFF2EB] text-[#E9611D]" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? "text-[#E9611D]" : "text-gray-400 group-hover:text-[#E9611D]"} />
                <span className="text-[13px] font-bold">{item.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#E9611D]"></div>}
            </Link>
          );
        })}
      </nav>

      
      <div className="px-6 pt-6 border-t border-gray-50 space-y-1">
        <Link 
          href="/adminDashboard/settings"
          className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
        >
          <Settings size={20} className="text-gray-400" />
          <span className="text-[13px] font-bold">الإعدادات</span>
        </Link>
        
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={20} />
          <span className="text-[13px] font-bold">تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
}