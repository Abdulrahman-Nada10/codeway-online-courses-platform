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
  PlaySquare,
  MessagesSquare,
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'profile', label: 'الملف الشخصي', href: '/userDashboard/profile', icon: <User className="w-5 h-5" /> },
    { id: 'courses', label: 'دوراتي', href: '/userDashboard/my-courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'favorites', label: 'المفضلة', href: '/userDashboard/favorites', icon: <Heart className="w-5 h-5" /> },
    { id: 'certificates', label: 'شهاداتي', href: '/userDashboard/certificates', icon: <Award className="w-5 h-5" /> },
    { id: 'liveSession', label: 'حصة مباشرة', href: '/userDashboard/liveSession', icon: <PlaySquare className="w-5 h-5" /> },
    { id: 'community', label: 'المجتمع', href: '/userDashboard/community', icon: <MessagesSquare className="w-5 h-5" /> },
  ];

  const bottomItems: MenuItem[] = [
    { id: 'settings', label: 'الإعدادات', href: '/userDashboard/settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'logout', label: 'تسجيل الخروج', href: '/logout', icon: <LogOut className="w-5 h-5" /> },
  ];

  const renderMenuItem = (item: MenuItem, isMobile: boolean = false) => {
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
        className="lg:hidden fixed right-4 top-[18px] z-[60] p-2 bg-[#FF6400] text-white rounded-xl shadow-md transition-all duration-300"
        aria-label="القائمة"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="
        hidden lg:flex flex-col
        fixed right-4 top-4 bottom-4
        w-64
        bg-white
        py-8 px-2
        gap-2
        z-50
        shadow-sm
        rounded-xl
        border-l border-gray-100
      ">

        <div className="px-3 pb-4 border-b border-gray-100 justify-start">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="شعار الموقع"
              width={89}
              height={49}
              className="object-contain"
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-2 px-1">
            {menuItems.map(item => renderMenuItem(item))}
          </ul>
        </nav>

        <div className="pt-4 mt-auto border-t border-gray-100">
          <ul className="space-y-2 px-1">
            {bottomItems.map(item => renderMenuItem(item))}
          </ul>
        </div>
      </div>

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