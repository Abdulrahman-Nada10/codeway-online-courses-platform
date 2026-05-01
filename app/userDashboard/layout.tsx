"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Navbar from "../components/NavbarUser";
import Sidebar from "../components/SidebarUser";
import { useLocaleDirection } from "../hooks/useLocaleDirection";
import { usePathname } from "next/navigation";
export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir } = useLocaleDirection();
  const pathname = usePathname();
  const isQuizPage = pathname.includes("/quizzes");
  const isQuizHomePage = pathname.includes("/quizzes/");
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="flex min-h-screen dark:bg-background" dir={dir}>
       {!isQuizHomePage && <Sidebar/>}

        <div className="flex-1">
          {!isQuizPage && <Navbar />}

          <main className="p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
