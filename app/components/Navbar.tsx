"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Bell, Menu, X, ArrowLeft, LogIn } from "lucide-react";

// روابط التنقل الأساسية
const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الدورات", href: "/list-of-courses" },
  { name: "المميزات", href: "/#features" },
  { name: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  // يمكنك تغيير هذه الحالة لاحقاً بناءً على نظام التوثيق (Auth) لديك
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          const y = elem.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  // إغلاق القوائم والبحث عند الضغط خارج النافبار
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

  return (
    <header className="w-11/12 md:w-10/12 lg:w-8/12 bg-transparent p-3 sm:p-5 font-cairo fixed top-0 left-1/2 -translate-x-1/2 z-50" dir="rtl">
      <nav 
        ref={navbarRef}
        className="mx-auto max-w-7xl bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-primary/5 px-4 sm:px-8 py-3 transition-all duration-300"
      >
        <div className="flex items-center justify-between h-14">

          <div className="flex items-center gap-2 shrink-0 group">
            <div className={`flex items-center gap-2 transition-all duration-300 ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
              <Link href="/" onClick={(e) => handleNavClick(e, "/")} className="shrink-0 hover:scale-105 transition-transform">
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

          {/* --- القسم الأوسط: روابط أو مربع بحث --- */}
          <div className="flex-1 flex justify-center items-center px-4">
            {isLoggedIn && isSearchOpen ? (
              <div className="w-full max-w-xl relative animate-in fade-in zoom-in duration-300">
                <input
                  autoFocus
                  type="text"
                  placeholder="ابحث عن دوراتك..."
                  className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-2.5 pr-12 pl-4 outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-gray-700"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
              </div>
            ) : (
              <ul className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="px-5 py-2 text-[15px] font-bold text-gray-500 hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* --- القسم الأيسر: الإجراءات --- */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {isLoggedIn ? (
              <div className="flex items-center gap-1 sm:gap-2">
                {!isSearchOpen && (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                    className="p-2 sm:p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
                  >
                    <Search size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>
                )}
                <Link href="/cart" className="p-2 sm:p-2.5 text-gray-400 hover:text-primary relative transition-colors duration-200">
                  <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
                  <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full border-2 border-white shadow-sm"></span>
                </Link>
                <Link href="/notifications" className="p-2 sm:p-2.5 text-gray-400 hover:text-primary transition-colors duration-200">
                  <Bell size={20} className="sm:w-[22px] sm:h-[22px]" />
                </Link>
                
                <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block"></div>

                <Link href="/userDashboard/profile" className="flex items-center gap-2 sm:gap-3 pr-1 sm:pr-2 group">
                  <span className="text-sm font-bold text-gray-700 hidden md:block group-hover:text-primary transition-colors duration-200">م. محمد محمود</span>
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm group-hover:border-primary transition-all duration-200">
                    <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-primary transition-all duration-200"
                >
                  <LogIn size={18} />
                  <span>تسجيل الدخول</span>
                </Link>
                <Link 
                  href="/register" 
                  className="bg-primary text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>ابدأ التعلم</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {/* زر القائمة للجوال */}
            <button 
              className="lg:hidden p-2 sm:p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>

        {/* --- القائمة المنسدلة للجوال --- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="p-3.5 font-bold text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link 
                  href="/login" 
                  className="p-3.5 font-bold text-primary border-t border-gray-100 mt-2 flex items-center gap-2"
                >
                  <LogIn size={20} /> تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}