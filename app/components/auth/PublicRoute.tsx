"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import AuthLoadingScreen from "@/app/components/auth/AuthLoadingScreen";
import { clearStoredAuthRedirectPath, getDashboardRoute } from "@/libs/auth-routing";

export default function PublicRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading || !isAuthenticated || !user) {
      return;
    }

    clearStoredAuthRedirectPath();
    router.replace(getDashboardRoute(user.role));
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}
