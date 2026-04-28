"use client";

import { ReactNode, useEffect } from "react";
import {
  restoreSession as restoreSessionRequest,
} from "@/services/auth";
import { useAppDispatch } from "@/app/store/hooks";
import { restoreAuth, clearAuth } from "@/app/store/authSlice";
import { useRoleRedirect } from "@/app/hooks/useRoleRedirect";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      try {
        const response = await restoreSessionRequest();
        if (response) {
          dispatch(restoreAuth({ user: response.user, token: response.token }));
        } else {
          dispatch(clearAuth());
        }
      } catch {
        dispatch(clearAuth());
      }
    }
    void init();
  }, [dispatch]);

  useRoleRedirect();

  return <>{children}</>;
}
