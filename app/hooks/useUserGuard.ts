"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * useUserGuard
 * ============
 * Protects routes that are exclusive to regular users (role = "user").
 *
 * Behavior:
 *   - If unauthenticated → redirect to /login
 *   - If authenticated as instructor → redirect to /ins-dashboard
 *   - If authenticated as user → allow access
 *
 * Returns { loading } so the caller can render a loading state
 * before the protected content to avoid UI flicker.
 */
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

