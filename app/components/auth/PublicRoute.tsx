"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import AuthLoadingScreen from "@/app/components/auth/AuthLoadingScreen";
import { clearStoredAuthRedirectPath } from "@/libs/auth-routing";

export default function PublicRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    }

    clearStoredAuthRedirectPath();
    router.replace("/");
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}
