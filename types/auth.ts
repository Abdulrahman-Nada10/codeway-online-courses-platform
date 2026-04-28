export type UserRole = "user" | "instructor" | "admin";

export interface BaseAuthUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  joinTime: string;
  avatar?: string;
}

export interface User extends BaseAuthUser {
  address: string;
  role: "user";
}

export interface Instructor extends BaseAuthUser {
  field: string;
  role: "instructor";
}

export interface Admin extends BaseAuthUser {
  role: "admin";
}

export type AuthUser = User | Instructor | Admin;

export interface LoginPayload {
  email: string;
  password: string;
}

interface BaseRegisterPayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UserRegisterPayload extends BaseRegisterPayload {
  address: string;
  role: "user";
}

export interface InstructorRegisterPayload extends BaseRegisterPayload {
  field: string;
  role: "instructor";
}

export type RegisterPayload = UserRegisterPayload | InstructorRegisterPayload;

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface ForgotPasswordResult {
  email: string;
  resetToken?: string;
  resetUrl?: string;
}

export type AuthUserUpdate = Partial<{
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  field: string;
  avatar: string;
}>;

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  lastRole: UserRole | null;
}

export interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResult>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  restoreSession: () => Promise<AuthResponse | null>;
  updateProfile: (updates: AuthUserUpdate) => Promise<AuthUser>;
  logout: () => void;
}

export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_KEY = "auth_user";
export const AUTH_MOCK_USERS_KEY = "auth_mock_users";
export const AUTH_MOCK_VERSION_KEY = "auth_mock_version";
export const AUTH_RESET_TOKENS_KEY = "auth_reset_tokens";

