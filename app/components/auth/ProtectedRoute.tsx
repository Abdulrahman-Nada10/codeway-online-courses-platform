"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import AuthLoadingScreen from "@/app/components/auth/AuthLoadingScreen";
import {
  buildPathWithSearch,
  getDashboardRoute,
  storeAuthRedirectPath,
} from "@/libs/auth-routing";
import { UserRole } from "@/types/auth";

type ProtectedRouteProps = PropsWithChildren<{
  allowedRoles?: UserRole[];
}>;

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, token, isAuthenticated, loading } = useAuth();

  const targetPath = useMemo(() => {
    const search = searchParams.toString();
    return buildPathWithSearch(pathname, search ? `?${search}` : "");
  }, [pathname, searchParams]);

  const isRoleAllowed =
    !allowedRoles || (user ? allowedRoles.includes(user.role) : false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated || !user || !token) {
      storeAuthRedirectPath(targetPath);
      router.replace("/login");
      return;
    }

    if (!isRoleAllowed) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [
    isAuthenticated,
    isRoleAllowed,
    loading,
    router,
    targetPath,
    token,
    user,
  ]);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated || !user || !token || !isRoleAllowed) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}

