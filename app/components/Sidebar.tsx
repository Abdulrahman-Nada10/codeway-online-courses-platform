'use client';

import React, { useState } from 'react';
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
  X ,
  PlaySquare
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

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'الملف الشخصي',
      href: '/profile',
      icon: (
        <User className="w-5 h-5" />
      ),
    },
    {
      id: 'courses',
      label: 'دوراتي',
      href: '/my-courses',
      icon: (
        <BookOpen className="w-5 h-5" />
      ),
    },
    {
      id: 'favorites',
      label: 'المفضلة',
      href: '/favorites',
      icon: (
        <Heart className="w-5 h-5" />
      ),
    },
    {
      id: 'certificates',
      label: 'شهاداتي',
      href: '/certificates',
      icon: (
        <Award className="w-5 h-5" />
      ),
    },
    {
      id: 'liveSession',
      label: 'حصة مباشرة',
      href: '/liveSession', 
      icon: (
        <PlaySquare className="w-5 h-5" />
      ),
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'الإعدادات',
      href: '/settings',
      icon: (
        <Settings className="w-5 h-5" />
      ),
    },
    {
      id: 'logout',
      label: 'تسجيل الخروج',
      href: '/logout',
      icon: (
        <LogOut className="w-5 h-5" />
      ),
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-[#113555] text-white'
              : 'bg-white text-[#000000] hover:bg-gray-100'
          }`}
        >
          <span className={isActive ? 'text-white' : 'text-[#000000]'}>
            {item.icon}
          </span>
          <span className="font-cairo font-medium">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#FF6400] text-white rounded-lg shadow-lg"
        aria-label="القائمة"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`
        hidden lg:flex flex-col
        fixed right-6 top-6 bottom-12
        w-56 sm:w-60 md:w-64
        bg-white rounded-2xl
        py-6 px-2
        gap-2
        z-40
        shadow-sm
      `}>
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-b border-gray-100">
          <div className="flex items-center justify-start">
            <div className="w-20 h-14 sm:w-22 sm:h-16 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="شعار الموقع"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1.5 sm:space-y-2 px-1">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>

        <div className="pt-3 sm:pt-4 mt-auto border-t border-gray-100">
          <ul className="space-y-1.5 sm:space-y-2 px-1">
            {bottomItems.map(renderMenuItem)}
          </ul>
        </div>
      </aside>

      <aside className={`
        lg:hidden
        fixed top-0 right-0 h-screen w-56 sm:w-60 md:w-64
        bg-white flex flex-col
        transform transition-transform duration-300 ease-in-out z-50
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="شعار الموقع"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <ul className="space-y-1.5 sm:space-y-2">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>

        <div className="p-3 sm:p-4 border-t border-gray-100">
          <ul className="space-y-1.5 sm:space-y-2">
            {bottomItems.map(renderMenuItem)}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

