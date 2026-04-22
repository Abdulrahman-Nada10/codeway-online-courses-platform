"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  Award,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  LucideIcon,
  GraduationCap,
  ChartArea,
  BookUser,
  CircleDollarSign,
} from "lucide-react";
import SidebarItem from "./SidebarInstructorItems";
import Link from "next/link";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

// ─── Config ──────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "نظرة عامة",    href: "/ins-dashboard",     icon: ChartArea, exact: true },
  { label: "دوراتي",       href: "/ins-courses",        icon: BookOpen                    },
  { label: "الطلاب",       href: "/ins-students",       icon: BookUser                       },
  { label: "الأرباح",      href: "/ins-earnings",       icon: CircleDollarSign                  },
  { label: "الشهادات",     href: "/ins-certificates",   icon: Award                       },
  { label: "الملف الشخصي", href: "/ins-profile",        icon: UserCircle                  },
];

const FOOTER_ITEMS: NavItem[] = [
  { label: "الإعدادات",  href: "/ins-settings", icon: Settings, exact: true },
  { label: "تسجيل خروج", href: "/ins-logout",   icon: LogOut,   exact: true },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isItemActive(pathname: string, href: string, exact = false): boolean {
  return exact ? pathname === href : pathname.startsWith(href);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setIsCollapsed((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const renderNavItems = (items: NavItem[], collapsed: boolean) =>
    items.map((item) => (
      <SidebarItem
        key={item.href}
        {...item}
        isActive={isItemActive(pathname, item.href, item.exact)}
        isCollapsed={collapsed}
      />
    ));

  return (
    <>
      {/* ── Mobile hamburger button ─────────────────────────────────────── */}
      <button
        onClick={() => setIsMobileOpen(true)}
        aria-label="فتح القائمة"
        className="
          fixed right-4 top-4 z-50 flex items-center justify-center
          rounded-xl border border-gray-100 bg-white/80 p-2.5
          shadow-lg shadow-gray-200/50 backdrop-blur-sm
          transition-all duration-200 ease-in-out hover:bg-orange-50 hover:shadow-orange-100/50
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500
          md:hidden
        "
      >
        <Menu size={18} strokeWidth={1.75} className="text-gray-700" />
      </button>

      {/* ── Mobile overlay ─────────────────────────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-250 ease-out md:hidden
          ${isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-50 flex w-72 flex-col
          bg-white shadow-2xl shadow-gray-300/50 font-cairo
          transition-transform duration-250 ease-out md:hidden
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        dir="rtl"
        aria-label="القائمة الجانبية"
      >
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 bg-gray-50 px-5">
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="shrink-0 hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="Logo"
                width={52}
                height={52}
                className="object-contain"
              />
            </Link>
          </div>
          <button
            onClick={closeMobile}
            aria-label="إغلاق القائمة"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
         
          {renderNavItems(NAV_ITEMS, false)}
        </nav>

        {/* Mobile footer - simplified */}
        <div className="flex flex-col gap-1 border-t border-gray-100 p-4 mt-auto">
          {renderNavItems(FOOTER_ITEMS, false)}
        </div>
      </aside>

      {/* ── Desktop sidebar — fixed on the right ────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-60 hidden flex-col
          border-l border-gray-100 bg-white font-cairo
          shadow-[-4px_0_24px_-8px_rgba(0,0,0,0.1)]
          transition-all duration-200 ease-in-out md:flex
          ${isCollapsed ? "w-18" : "w-64"}
        `}
        dir="rtl"
        aria-label="القائمة الجانبية"
      >
        {/* Logo area */}
        <div className="flex items-start justify-start pt-6 pb-5 shrink-0">
          <Link href="/" className="shrink-0 hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="Logo"
              width={52}
              height={52}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Toggle button — floats on the left edge */}
        <button
          onClick={toggle}
          aria-label={isCollapsed ? "توسيع القائمة" : "طي القائمة"}
          className="
            absolute -left-3 top-18 z-10
            flex h-6 w-6 items-center justify-center
            rounded-full border border-gray-100 bg-white
            shadow-sm
            transition-all duration-200 ease-in-out hover:bg-orange-50 hover:border-orange-500
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500
          "
        >
          <ChevronRight
            size={14}
            strokeWidth={1.75}
            className={`text-gray-500 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Section label */}
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
          }`}
        >
          
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
          {renderNavItems(NAV_ITEMS, isCollapsed)}
        </nav>

        {/* Footer - with visual separation */}
        <div className="flex flex-col gap-1 border-t border-gray-100 px-3 py-4 mt-2">
          {renderNavItems(FOOTER_ITEMS, isCollapsed)}
        </div>

        {/* User avatar area */}
        <div className="border-t border-gray-100 px-3 py-3">
          <div
            className={`flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-orange-500 text-sm font-bold text-white shadow-sm">
              م
            </div>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                المدرّس
              </p>
              <p className="whitespace-nowrap text-xs text-gray-400">
                instructor@egc.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
