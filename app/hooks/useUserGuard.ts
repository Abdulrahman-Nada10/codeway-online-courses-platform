"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";


export function useUserGuard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.role === "instructor") {
      router.replace("/ins-dashboard");
      return;
    }
  }, [loading, isAuthenticated, user, router]);

  const isAllowed = !loading && isAuthenticated && user?.role === "user";

  return { loading: loading || !isAllowed };
}

