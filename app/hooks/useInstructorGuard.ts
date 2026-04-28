"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useInstructorGuard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.role === "user") {
      router.replace("/");
      return;
    }
  }, [loading, isAuthenticated, user, router]);

  const isAllowed = !loading && isAuthenticated && user?.role === "instructor";

  return { loading: loading || !isAllowed };
}

