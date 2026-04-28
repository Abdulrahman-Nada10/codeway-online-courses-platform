'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/app/hooks/useAuth';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
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
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  action?: () => void;
}

const Sidebar = () => {
  const { t } = useTranslation();
  const { dir, isRTL } = useLocaleDirection();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: t('dashboard.profile'),
      href: '/userDashboard/profile',
      icon: <User className="h-5 w-5" />,
    },
    {
      id: 'courses',
      label: t('dashboard.myCourses'),
      href: '/userDashboard/my-courses',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: 'liveSession',
      label: t('dashboard.liveSession'),
      href: '/userDashboard/liveSession',
      icon: <PlaySquare className="h-5 w-5" />,
    },
    {
      id: 'favorites',
      label: t('dashboard.favorites'),
      href: '/userDashboard/favorites',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: 'certificates',
      label: t('dashboard.certificates'),
      href: '/userDashboard/certificates',
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      id: 'settings',
      label: t('dashboard.settings'),
      href: '/userDashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: 'logout',
      label: t('auth.logout'),
      href: '#',
      icon: <LogOut className="h-5 w-5" />,
      action: handleLogout,
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    const baseClasses =
      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start transition-all duration-200';

    if (item.action) {
      return (
        <li key={item.id}>
          <button
            onClick={() => {
              item.action?.();
              setIsMobileMenuOpen(false);
            }}
            className={`${baseClasses} bg-white text-black hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800`}
          >
            <span className="text-current">{item.icon}</span>
            <span className="font-cairo font-medium">{item.label}</span>
          </button>
        </li>
      );
    }

    return (
      <li key={item.id}>
        <Link
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${baseClasses} ${
            isActive
              ? 'bg-[#113555] text-white'
              : 'bg-white text-black hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span className="text-current">{item.icon}</span>
          <span className="font-cairo font-medium">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed z-90 rounded-lg bg-[#FF6400] p-2 text-white shadow-lg transition-all duration-300 lg:hidden ${
          isScrolled ? 'top-2.5' : 'top-27.5'
        } rtl:left-4 ltr:right-4`}
        aria-label={t('dashboard.menu')}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className="fixed top-4 bottom-4 z-60 hidden w-64 flex-col gap-2 rounded-xl border-l border-gray-100 bg-white px-2 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:flex rtl:right-4 ltr:left-4"
        dir={dir}
      >
        <div className="z-140 justify-start border-b border-gray-100 px-3 pb-4 dark:border-slate-800">
          <Link href="/">
            <Image
              src="/logo.png"
              alt={t('nav.brand')}
              width={89}
              height={49}
              className="object-contain"
            />
          </Link>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto">
          <ul className="space-y-2 px-1">{menuItems.map(renderMenuItem)}</ul>
        </nav>

        <div className="mt-auto border-t border-gray-100 pt-4 dark:border-slate-800">
          <ul className="space-y-2 px-1">{bottomItems.map(renderMenuItem)}</ul>
        </div>
      </div>

      <aside
        className={`fixed top-0 z-70 h-screen w-64 transform flex-col bg-white transition-transform duration-300 ease-in-out dark:bg-slate-950 lg:hidden rtl:right-0 ltr:left-0 ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : isRTL
              ? 'translate-x-full'
              : '-translate-x-full'
        }`}
        dir={dir}
      >
        <div className="flex justify-center border-b border-gray-100 p-6 dark:border-slate-800">
          <Image
            src="/logo.png"
            alt={t('nav.brand')}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">{menuItems.map(renderMenuItem)}</ul>
        </nav>

        <div className="border-t border-gray-100 p-4 dark:border-slate-800">
          <ul className="space-y-2">{bottomItems.map(renderMenuItem)}</ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
