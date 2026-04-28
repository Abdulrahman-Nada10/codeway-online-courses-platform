// app/adminDashboard/layout.tsx

import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Sidebaradmin from "../components/sidebaradmin";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#F9F1E9] ">
      
      {/* Sidebar */}
      <aside className="w-64  text-white hidden md:block">
        <Sidebaradmin />
      </aside>

      {/* Main */}
      <div className="flex-1 flex bg-[#F9F1E9] flex-col">
        
        {/* Navbar */}
        <header className="bg-[#F9F1E9] ">
          <NavbarAdmin />
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow p-6 min-h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;