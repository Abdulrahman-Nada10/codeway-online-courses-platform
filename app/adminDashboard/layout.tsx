"use client";

import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/sidebaradmin";
import { useTranslation } from "react-i18next";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="flex min-h-screen bg-page-bg dark:bg-[#0F172A]" dir={dir}>
      
      {/* Sidebar - Handles its own fixed positioning and responsiveness */}
      <SidebarAdmin />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ps-[300px]">
        
        {/* Navbar */}
        <header className="sticky top-0 z-40">
          <NavbarAdmin />
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className=" min-h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;