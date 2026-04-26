"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import Earnings from "./components/Earnings";

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={["instructor"]}>
      <>
        <Sidebar />
        <div className="md:mr-64 min-h-screen bg-linear-to-br from-[#FDFBF7] via-orange-50/30 to-[#FDFBF7] flex flex-col">
          <Navbar />
          <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
            <Earnings />
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}

