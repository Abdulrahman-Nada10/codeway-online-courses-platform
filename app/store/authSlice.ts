import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, UserRole } from '@/types/auth';

export interface AuthReduxState {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  lastRole: UserRole | null;
}

const initialState: AuthReduxState = {
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  lastRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      const prevRole = state.user?.role ?? null;
      const nextRole = action.payload?.role ?? null;

      if (prevRole && nextRole && prevRole !== nextRole) {
        state.lastRole = prevRole;
      }

      state.user = action.payload;
      state.role = nextRole;
      state.isAuthenticated = Boolean(action.payload);
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      const prevRole = state.user?.role ?? null;
      const nextRole = action.payload.user.role;

      if (prevRole && nextRole && prevRole !== nextRole) {
        state.lastRole = prevRole;
      }

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = nextRole;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.lastRole = null;
      state.loading = false;
    },
    restoreAuth: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      const prevRole = state.user?.role ?? null;
      const nextRole = action.payload.user.role;

      if (prevRole && nextRole && prevRole !== nextRole) {
        state.lastRole = prevRole;
      }

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = nextRole;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { setUser, setToken, setLoading, setAuth, clearAuth, restoreAuth } =
  authSlice.actions;

export default authSlice.reducer;

/* ─── Selectors ─────────────────────────────────────────────── */

export const selectAuthUser = (state: { auth: AuthReduxState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthReduxState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthReduxState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthReduxState }) => state.auth.loading;
export const selectUserRole = (state: { auth: AuthReduxState }) => state.auth.role;
export const selectLastRole = (state: { auth: AuthReduxState }) => state.auth.lastRole;
