'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  User,
  BookOpen,
  Heart,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // حالة طي القائمة

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'profile', label: 'الملف الشخصي', href: '/profile', icon: <User className="w-5 h-5" /> },
    { id: 'courses', label: 'دوراتي', href: '/my-courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'favorites', label: 'المفضلة', href: '/favorites', icon: <Heart className="w-5 h-5" /> },
    { id: 'certificates', label: 'شهاداتي', href: '/certificates', icon: <Award className="w-5 h-5" /> },
  ];

  const bottomItems: MenuItem[] = [
    { id: 'settings', label: 'الإعدادات', href: '/settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'logout', label: 'تسجيل الخروج', href: '/logout', icon: <LogOut className="w-5 h-5" /> },
  ];

  const renderMenuItem = (item: MenuItem, isMobile: boolean = false) => {
    const isActive = pathname === item.href;
    const hideText = !isMobile && isCollapsed; // إخفاء النص فقط في الشاشات الكبيرة إذا كانت مطوية
    
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center ${hideText ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-[#113555] text-white'
              : 'bg-white text-[#000000] hover:bg-gray-100'
          }`}
          title={hideText ? item.label : undefined} // إظهار الاسم عند تمرير الماوس
        >
          <span className={isActive ? 'text-white' : 'text-[#000000]'}>
            {item.icon}
          </span>
          {!hideText && <span className="font-cairo font-medium">{item.label}</span>}
        </Link>
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed left-4 z-50 p-2 bg-[#FF6400] text-white rounded-lg shadow-lg transition-all duration-300 ${
          isScrolled ? 'top-2.5' : 'top-27.5'
        }`}
        aria-label="القائمة"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* القائمة الجانبية للشاشات الكبيرة */}
      <div className={`
        hidden lg:flex flex-col
        fixed right-0 top-0 bottom-0 /* لازق عاليمين ومارجن للناف بار */
        ${isCollapsed ? 'w-20' : 'w-64'} /* تغيير العرض عند الطي */
        bg-white
        py-6 px-2
        gap-2
        z-999
        shadow-sm
        border-l border-gray-100
        transition-all duration-300 ease-in-out
      `}>
        {/* زر الطي والفتح */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-3 top-8 bg-white border border-gray-200 text-gray-500 hover:text-gray-800 rounded-full p-1 z-50 shadow-sm transition-colors"
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <div className="px-3 pb-4 border-b border-gray-100 flex items-center justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="شعار الموقع"
              width={isCollapsed ? 40 : 64}
              height={isCollapsed ? 40 : 64}
              className="object-contain transition-all duration-300"
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-2 px-1">
            {menuItems.map(item => renderMenuItem(item, false))}
          </ul>
        </nav>

        <div className="pt-4 mt-auto border-t border-gray-100">
          <ul className="space-y-2 px-1">
            {bottomItems.map(item => renderMenuItem(item, false))}
          </ul>
        </div>
      </div>
      
      {/* القائمة الجانبية للموبايل (بدون تغيير) */}
      <aside className={`
        lg:hidden
        fixed top-0 right-0 h-screen w-64
        bg-white flex flex-col
        transform transition-transform duration-300 ease-in-out z-50
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100 flex justify-center">
          <Image src="/logo.png" alt="شعار الموقع" width={64} height={64} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => renderMenuItem(item, true))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <ul className="space-y-2">
            {bottomItems.map(item => renderMenuItem(item, true))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;