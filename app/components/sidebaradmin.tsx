"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  CreditCard, FileText, Award, Settings, LogOut,
  Languages,
  Sun,
  Moon,
  Menu as MenuIcon,
  X
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'admin.sidebar.overview', icon: LayoutDashboard, href: '/adminDashboard' },
  { name: 'admin.sidebar.users', icon: Users, href: '/adminDashboard/users' },
  { name: 'admin.sidebar.instructors', icon: GraduationCap, href: '/adminDashboard/instructors' },
  { name: 'admin.sidebar.courses', icon: BookOpen, href: '/adminDashboard/courses' },
  { name: 'admin.sidebar.payments', icon: CreditCard, href: '/adminDashboard/payments' },
  { name: 'admin.sidebar.reports', icon: FileText, href: '/adminDashboard/reports' },
  { name: 'admin.sidebar.certificates', icon: Award, href: '/adminDashboard/certificates' },
];

export default function SidebarAdmin() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="lg:hidden fixed top-2 inset-s-2 z-60 p-3 bg-white/10 backdrop-blur-md dark:bg-[#1E293B] rounded-2xl shadow-lg border border-orange-100 dark:border-gray-800 text-[#E9611D]"
        >
          <MenuIcon size={20} />
        </button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-70"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-[80] transition-all duration-500 ease-in-out flex flex-col bg-white dark:bg-[#1E293B] shadow-2xl lg:shadow-xl border border-gray-100 dark:border-gray-800
          ${isOpen 
            ? 'inset-y-0 inset-s-0 w-74 translate-x-0 overflow-y-auto' 
            : 'lg:top-4 lg:bottom-4 lg:inset-s-4 lg:w-[270px] lg:h-auto lg:min-h-[calc(100vh-32px)] lg:rounded-xl lg:translate-x-0 -translate-x-full lg:opacity-100'
          }
          ${!isOpen && (dir === 'rtl' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')}
        `}
        dir={dir}
      >
        <button
          onClick={toggleMenu}
          className="lg:hidden absolute top-6 end-6 p-2 text-gray-400 hover:text-[#E9611D]"
        >
          <X size={24} />
        </button>

        <div className="px-8 mt-8 mb-6 flex justify-center">
          <div className="flex items-center gap-1">
            <Image src="/logo.png" alt="logo" width={120} height={42}  />
            <div className="w-2 h-2 rounded-full bg-[#E9611D] mt-4"></div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group text-[#000000] dark:text-gray-300 w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-300 ${isActive ? "bg-[#FFF2EB] dark:bg-orange-500/10 " : " hover:bg-gray-50 dark:hover:bg-white/5"}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? "text-[#E9611D]" : "text-gray-400 group-hover:text-[#E9611D]"} />
                  <span className="text-[13px] font-bold">{t(item.name)}</span>
                </div>
               
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-2 gap-3 p-6 border-t border-gray-50 dark:border-white/5">
          <button onClick={toggleTheme} className="flex flex-col items-center justify-center gap-1.5 p-3 bg-gray-50 dark:bg-white/5 text-gray-600 rounded-[20px] hover:bg-orange-50 dark:hover:bg-orange-500/10 border border-gray-100 dark:border-transparent transition-all">
            {theme === "dark" ? <Sun size={18} className="text-orange-500" /> : <Moon size={18} className="text-orange-500" />}
            <span className="text-[10px] font-bold uppercase">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button onClick={toggleLanguage} className="flex flex-col items-center justify-center gap-1.5 p-3 bg-gray-50 dark:bg-white/5 text-gray-600 rounded-[20px] hover:bg-orange-50 dark:hover:bg-orange-500/10 border border-gray-100 dark:border-transparent transition-all">
            <Languages size={18} className="text-orange-500" />
            <span className="text-[10px] font-bold uppercase">{i18n.language}</span>
          </button>
        </div>

        <div className="px-2 pb-8 space-y-1">
          <Link href="/adminDashboard/settings" className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-all group">
            <Settings size={18} className="text-gray-400 group-hover:text-[#E9611D]" />
            <span className="text-[13px] font-bold">{t('admin.sidebar.settings')}</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-all">
            <LogOut size={18} />
            <span className="text-[13px] font-bold">{t('admin.sidebar.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}