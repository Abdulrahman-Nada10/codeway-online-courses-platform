"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Navbar from "../components/NavbarUser";
import Sidebar from "../components/SidebarUser";
import { useLocaleDirection } from "../hooks/useLocaleDirection";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir } = useLocaleDirection();

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="flex min-h-screen dark:bg-slate-950" dir={dir}>
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
