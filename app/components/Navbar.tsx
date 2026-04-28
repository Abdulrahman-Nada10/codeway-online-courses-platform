"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  ArrowLeft,
  LogIn,
  LogOut,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/app/hooks/useAuth";
import { getDashboardRoute } from "@/libs/auth-routing";

const navLinks = [
  { name: "nav.home", href: "/" },
  { name: "nav.courses", href: "/list-of-courses" },
  { name: "nav.features", href: "/features" },
  { name: "nav.contact", href: "/contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const dashboardLink = getDashboardRoute(user?.role);
  const displayName = user?.name ?? t("nav.user_name");
  const avatarSrc = user?.avatar ?? "/profile.jpg";

  return (
    <header
      className="w-full bg-white dark:bg-[#191C33] font-cairo fixed top-0 z-50 shadow-xl dark:border-b dark:border-gray-800"
      dir="rtl"
    >
      <nav
        ref={navbarRef}
        className="mx-auto max-w-7xl border border-orange-50/50 dark:border-0 px-4 sm:px-8 py-1.5 transition-all duration-300"
      >
        <div className="flex items-center justify-between h-14">
          {/* --- القسم الأيمن: الشعار --- */}
          <div className="flex items-center gap-2 shrink-0 group">
            <div
              className={`flex items-center gap-2 transition-all duration-300 ${
                isSearchOpen ? "hidden sm:flex" : "flex"
              }`}
            >
              <Link
                href="/"
                className="shrink-0 hover:scale-105 transition-transform"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* --- القسم الأوسط: روابط أو مربع بحث --- */}
          <div className="flex-1 flex justify-center items-center px-4">
            {isAuthenticated && isSearchOpen ? (
              <div className="w-full max-w-xl relative animate-in fade-in zoom-in duration-300">
                <input
                  autoFocus
                  type="text"
                  placeholder={t("courses.search")}
                  className="w-full bg-orange-50/50 dark:bg-slate-800/50 border border-orange-100 dark:border-slate-700 rounded-2xl py-2.5 pr-12 pl-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-gray-700 dark:text-slate-200"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600"
                  size={20}
                />
              </div>
            ) : (
              <ul className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="px-5 py-2 text-[15px] font-bold text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-all"
                    >
                      {t(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* --- القسم الأيسر: الإجراءات --- */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              /* واجهة المستخدم المسجل */
              <div className="flex items-center gap-1 sm:gap-3">
                {!isSearchOpen && (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                    className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-full transition-all"
                  >
                    <Search size={22} />
                  </button>
                )}
                <Link
                  href="/cart"
                  className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 relative"
                >
                  <ShoppingCart size={22} />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-600 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
                </Link>
                <Link
                  href="/notifications"
                  className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  <Bell size={22} />
                </Link>

                <div className="h-8 w-px bg-gray-100 dark:bg-slate-800 mx-1 hidden sm:block" />

                {/* Theme Toggle */}
                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-full transition-all"
                  >
                    {mounted &&
                      (theme === "dark" ? (
                        <Sun size={22} />
                      ) : (
                        <Moon size={22} />
                      ))}
                  </button>

                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-full transition-all flex items-center gap-1"
                  >
                    <Languages size={22} />
                    <span className="text-xs font-bold uppercase">
                      {i18n.language}
                    </span>
                  </button>
                </div>

                <div className="h-8 w-px bg-gray-100 dark:bg-slate-800 mx-1 hidden sm:block" />

                <Link
                  href={dashboardLink}
                  className="flex items-center gap-3 pr-2 group"
                >
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300 hidden md:block group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                    {displayName}
                  </span>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100 dark:border-slate-700 shadow-sm group-hover:border-orange-500 transition-all">
                    <Image
                      src={avatarSrc}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                  aria-label="تسجيل الخروج"
                  title="تسجيل الخروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              /* واجهة الزائر (Guest) */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-slate-400 hover:text-[#1D3E61] dark:hover:text-orange-400 transition-all"
                >
                  <LogIn size={18} />
                  <span>{t("auth.login")}</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center gap-2 group"
                >
                  <span>ابدأ التعلم</span>
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            )}

            {/* زر القائمة للجوال */}
            <button
              className="lg:hidden p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- القائمة المنسدلة للجوال --- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-4 font-bold text-gray-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all"
                >
                  {t(link.name)}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-3 p-4 border-t border-gray-50 dark:border-slate-800">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-2xl hover:bg-orange-50 dark:hover:bg-slate-700 transition-all border border-gray-100 dark:border-slate-700"
                >
                  {mounted &&
                    (theme === "dark" ? (
                      <Sun size={20} className="text-orange-600" />
                    ) : (
                      <Moon size={20} className="text-orange-600" />
                    ))}
                  <span className="text-sm font-bold">
                    {theme === "dark" ? "Light" : "Dark"}
                  </span>
                </button>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-2xl hover:bg-orange-50 dark:hover:bg-slate-700 transition-all border border-gray-100 dark:border-slate-700"
                >
                  <Languages size={20} className="text-orange-600" />
                  <span className="text-sm font-bold uppercase">
                    {i18n.language}
                  </span>
                </button>
              </div>

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="p-4 font-bold text-[#1D3E61] dark:text-orange-400 border-t border-gray-50 dark:border-slate-800 mt-2 flex items-center gap-2"
                >
                  <LogIn size={20} /> {t("auth.login")}
                </Link>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-4 font-bold text-red-600 border-t border-gray-50 dark:border-slate-800 mt-2 flex items-center gap-2 text-right"
                >
                  <LogOut size={20} /> تسجيل الخروج
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

