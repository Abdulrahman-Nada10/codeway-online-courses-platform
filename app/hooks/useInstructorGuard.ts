"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * useInstructorGuard
 * ==================
 * Protects routes that are exclusive to instructors (role = "instructor").
 *
 * Behavior:
 *   - If unauthenticated → redirect to /login
 *   - If authenticated as user → redirect to /userDashboard
 *   - If authenticated as instructor → allow access
 *
 * Returns { loading } so the caller can render a loading state
 * before the protected content to avoid UI flicker.
 */
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

