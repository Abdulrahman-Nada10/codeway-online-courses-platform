"use client";

import { useCallback } from "react";
import {
  AuthResponse,
  AuthUser,
  AuthUserUpdate,
  ForgotPasswordResult,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";
import {
  forgotPassword as forgotPasswordRequest,
  login as loginRequest,
  logout as clearAuthSession,
  register as registerRequest,
  updateProfile as updateProfileRequest,
  resetPassword as resetPasswordRequest,
} from "@/services/auth";
import { clearStoredAuthRedirectPath } from "@/libs/auth-routing";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setAuth,
  clearAuth,
  setUser,
} from "@/app/store/authSlice";
import {
  selectAuthUser,
  selectAuthToken,
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/app/store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const token = useAppSelector(selectAuthToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthResponse> => {
      const response = await loginRequest(payload);
      dispatch(setAuth({ user: response.user, token: response.token }));
      return response;
    },
    [dispatch]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      const response = await registerRequest(payload);
      dispatch(setAuth({ user: response.user, token: response.token }));
      return response;
    },
    [dispatch]
  );

  const forgotPassword = useCallback(
    async (email: string): Promise<ForgotPasswordResult> => {
      return forgotPasswordRequest(email);
    },
    []
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload): Promise<void> => {
      await resetPasswordRequest(payload);
    },
    []
  );

  const updateProfile = useCallback(
    async (updates: AuthUserUpdate): Promise<AuthUser> => {
      const nextUser = await updateProfileRequest(updates);
      dispatch(setUser(nextUser));
      return nextUser;
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    clearAuthSession();
    clearStoredAuthRedirectPath();
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    user,
    role: user?.role ?? null,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    forgotPassword,
    resetPassword,
    updateProfile,
    logout,
  };
}
