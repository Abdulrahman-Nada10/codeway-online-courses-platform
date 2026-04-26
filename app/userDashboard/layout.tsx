"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Navbar from "../components/NavbarUser";
import Sidebar from "../components/SidebarUser";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

