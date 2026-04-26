"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthContextValue,
  AuthResponse,
  AuthUser,
  AuthUserUpdate,
  ForgotPasswordResult,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  UserRole,
} from "@/types/auth";
import {
  forgotPassword as forgotPasswordRequest,
  login as loginRequest,
  logout as clearAuthSession,
  register as registerRequest,
  restoreSession as restoreSessionRequest,
  updateProfile as updateProfileRequest,
  resetPassword as resetPasswordRequest,
} from "@/services/auth";
import { clearStoredAuthRedirectPath } from "@/libs/auth-routing";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

function getRole(user: AuthUser | null): UserRole | null {
  return user?.role ?? null;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const applyAuthResponse = useCallback((response: AuthResponse | null) => {
    if (!response) {
      setUser(null);
      setToken(null);
      return;
    }

    setUser(response.user);
    setToken(response.token);
  }, []);

  const restoreSession = useCallback(async (): Promise<AuthResponse | null> => {
    setLoading(true);

    try {
      const response = await restoreSessionRequest();
      applyAuthResponse(response);
      return response;
    } catch {
      clearAuthSession();
      applyAuthResponse(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [applyAuthResponse]);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthResponse> => {
      setLoading(true);

      try {
        const response = await loginRequest(payload);
        applyAuthResponse(response);
        return response;
      } finally {
        setLoading(false);
      }
    },
    [applyAuthResponse]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      setLoading(true);

      try {
        const response = await registerRequest(payload);
        applyAuthResponse(response);
        return response;
      } finally {
        setLoading(false);
      }
    },
    [applyAuthResponse]
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
      setUser(nextUser);
      return nextUser;
    },
    []
  );

  const logout = useCallback(() => {
    clearAuthSession();
    clearStoredAuthRedirectPath();
    setUser(null);
    setToken(null);
    setLoading(false);
  }, []);

  const isAuthenticated = Boolean(user && token);
  const role = getRole(user);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      token,
      isAuthenticated,
      loading,
      login,
      register,
      forgotPassword,
      resetPassword,
      restoreSession,
      updateProfile,
      logout,
    }),
    [
      forgotPassword,
      isAuthenticated,
      loading,
      login,
      logout,
      register,
      resetPassword,
      restoreSession,
      role,
      token,
      updateProfile,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
