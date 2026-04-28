"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { selectAuthUser, selectLastRole } from "@/app/store/authSlice";
import { getDashboardRoute } from "@/libs/auth-routing";


export function useRoleRedirect() {
  const router = useRouter();
  const user = useAppSelector(selectAuthUser);
  const lastRole = useAppSelector(selectLastRole);

  useEffect(() => {
    if (!user) return;

    if (lastRole && lastRole !== user.role) {
      const route = getDashboardRoute(user.role);
      router.replace(route);
    }
  }, [user, lastRole, router]);
}
