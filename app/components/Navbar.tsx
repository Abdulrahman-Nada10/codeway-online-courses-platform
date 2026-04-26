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
} from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { getDashboardRoute } from "@/libs/auth-routing";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الدورات", href: "/list-of-courses" },
  { name: "المميزات", href: "/features" },
  { name: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const dashboardLink = getDashboardRoute(user?.role);
  const displayName = user?.name ?? "حسابي";
  const avatarSrc = user?.avatar ?? "/profile.jpg";

  return (
    <header
      className="w-8/12 bg-transparent p-3 sm:p-5 font-cairo fixed top-0 left-1/2 -translate-x-1/2 z-50"
      dir="rtl"
    >
      <nav
        ref={navbarRef}
        className="mx-auto  max-w-7xl bg-white rounded-2xl sm:rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-orange-50/50 px-4 sm:px-8 py-3 transition-all duration-300"
      >
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 shrink-0 group">
            <div
              className={`flex items-center gap-2 transition-all duration-300 ${isSearchOpen ? "hidden sm:flex" : "flex"}`}
            >
              <Link href="/" className="shrink-0 hover:scale-105 transition-transform">
                <Image
                  src="/favicon.ico"
                  alt="Logo"
                  width={45}
                  height={45}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center px-4">
            {isAuthenticated && isSearchOpen ? (
              <div className="w-full max-w-xl relative animate-in fade-in zoom-in duration-300">
                <input
                  autoFocus
                  type="text"
                  placeholder="ابحث عن دوراتك..."
                  className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl py-2.5 pr-12 pl-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-gray-700"
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
                      className="px-5 py-2 text-[15px] font-bold text-gray-500 hover:text-orange-600 rounded-xl hover:bg-orange-50 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-1 sm:gap-3">
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                    className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                  >
                    <Search size={22} />
                  </button>
                ) : null}

                <Link href="/cart" className="p-2.5 text-gray-500 hover:text-orange-600 relative">
                  <ShoppingCart size={22} />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-600 rounded-full border-2 border-white shadow-sm" />
                </Link>

                <Link href="/notifications" className="p-2.5 text-gray-500 hover:text-orange-600">
                  <Bell size={22} />
                </Link>

                <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />

                <Link href={dashboardLink} className="flex items-center gap-3 pr-2 group">
                  <span className="text-sm font-bold text-gray-700 hidden md:block group-hover:text-orange-600 transition">
                    {displayName}
                  </span>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100 shadow-sm group-hover:border-orange-500 transition-all">
                    <Image src={avatarSrc} alt="Profile" fill className="object-cover" />
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  aria-label="تسجيل الخروج"
                  title="تسجيل الخروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-[#1D3E61] transition-all"
                >
                  <LogIn size={18} />
                  <span>تسجيل الدخول</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center gap-2 group"
                >
                  <span>ابدأ التعلم</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            <button
              className="lg:hidden p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-orange-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-50 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-4 font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                >
                  {link.name}
                </Link>
              ))}

              {!isAuthenticated ? (
                <Link
                  href="/login"
                  className="p-4 font-bold text-[#1D3E61] border-t border-gray-50 mt-2 flex items-center gap-2"
                >
                  <LogIn size={20} /> تسجيل الدخول
                </Link>
              ) : null}

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-4 font-bold text-red-600 border-t border-gray-50 mt-2 flex items-center gap-2 text-right"
                >
                  <LogOut size={20} /> تسجيل الخروج
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
