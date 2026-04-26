import {
  AUTH_MOCK_USERS_KEY,
  AUTH_RESET_TOKENS_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  AuthResponse,
  AuthUser,
  AuthUserUpdate,
  ForgotPasswordResult,
  Instructor,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
  UserRole,
} from "@/types/auth";

type MockAccount = {
  password: string;
  user: AuthUser;
};

type MockResetToken = {
  email: string;
  token: string;
  expiresAt: number;
};

type DecodedTokenPayload = {
  exp?: number;
  iat?: number;
  sub?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FORCE_MOCK_AUTH = process.env.NEXT_PUBLIC_AUTH_MOCK_MODE !== "false";
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  me: "/me",
};

const DEFAULT_AVATAR = "/profile.jpg";
const MOCK_LATENCY_MS = 300;

const DEFAULT_MOCK_ACCOUNTS: MockAccount[] = [
  {
    password: "Password123!",
    user: {
      id: "usr-001",
      name: "عمر محمد السيد",
      email: "omar@example.com",
      phoneNumber: "+20 100 123 4567",
      address: "القاهرة، مصر",
      joinTime: "يناير 2024",
      role: "user",
      avatar: DEFAULT_AVATAR,
    } satisfies User,
  },
  {
    password: "Password123!",
    user: {
      id: "ins-001",
      name: "م. محمد محمود",
      email: "mohamedahmed@gmail.com",
      phoneNumber: "01012345678",
      field: "Programming / Development",
      joinTime: "30-12-2025",
      role: "instructor",
      avatar: DEFAULT_AVATAR,
    } satisfies Instructor,
  },
];

export const isMockAuthEnabled =
  FORCE_MOCK_AUTH || API_BASE_URL.trim().length === 0;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseStoredJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function formatJoinTime(date = new Date()): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function generateId(prefix: string): string {
  const randomId =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${randomId}`;
}

function normalizeExpiration(exp?: number): number | null {
  if (!exp || Number.isNaN(exp)) {
    return null;
  }

  return exp > 1_000_000_000_000 ? exp : exp * 1000;
}

function decodeTokenPayload(token: string): DecodedTokenPayload | null {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");

    return JSON.parse(atob(normalizedPayload)) as DecodedTokenPayload;
  } catch {
    return null;
  }
}

function createMockToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: "mock", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    })
  );
  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
}

function decodeMockTokenUserId(token: string): string | null {
  return decodeTokenPayload(token)?.sub ?? null;
}

function isTokenExpired(token: string): boolean {
  const payload = decodeTokenPayload(token);
  const expirationMs = normalizeExpiration(payload?.exp);

  if (!expirationMs) {
    return false;
  }

  return expirationMs <= Date.now();
}

function isValidAuthUser(user: unknown): user is AuthUser {
  if (!user || typeof user !== "object") {
    return false;
  }

  const record = user as Record<string, unknown>;
  const role = record.role;

  if (role !== "user" && role !== "instructor") {
    return false;
  }

  const commonFields = ["id", "name", "email", "phoneNumber", "joinTime"];
  if (
    commonFields.some(
      (field) =>
        typeof record[field] !== "string" || String(record[field]).trim() === ""
    )
  ) {
    return false;
  }

  if (record.avatar !== undefined && typeof record.avatar !== "string") {
    return false;
  }

  if (role === "user") {
    return typeof record.address === "string";
  }

  return typeof record.field === "string";
}

function normalizeRole(role: unknown): UserRole {
  return String(role).toLowerCase() === "instructor" ? "instructor" : "user";
}

function normalizeAuthUser(rawUser: unknown): AuthUser {
  const user = (rawUser ?? {}) as Record<string, unknown>;
  const role = normalizeRole(user.role);

  const common = {
    id: String(user.id ?? generateId(role === "instructor" ? "ins" : "usr")),
    name: String(user.name ?? ""),
    email: String(user.email ?? ""),
    phoneNumber: String(user.phoneNumber ?? user.phone ?? ""),
    joinTime: String(user.joinTime ?? user.createdAt ?? formatJoinTime()),
    role,
    avatar: String(user.avatar ?? DEFAULT_AVATAR),
  };

  if (role === "instructor") {
    return {
      ...common,
      role,
      field: String(user.field ?? ""),
    };
  }

  return {
    ...common,
    role,
    address: String(user.address ?? ""),
  };
}

function extractErrorMessage(errorBody: unknown): string {
  if (typeof errorBody === "string" && errorBody.trim()) {
    return errorBody;
  }

  if (errorBody && typeof errorBody === "object") {
    const body = errorBody as Record<string, unknown>;

    if (typeof body.message === "string" && body.message.trim()) {
      return body.message;
    }

    if (Array.isArray(body.message) && body.message.length > 0) {
      return String(body.message[0]);
    }

    if (typeof body.error === "string" && body.error.trim()) {
      return body.error;
    }
  }

  return "حدث خطأ غير متوقع. حاول مرة أخرى.";
}

function buildUrl(endpoint: string): string {
  return endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = false
): Promise<T> {
  const headers = new Headers(options.headers);
  const hasBody = typeof options.body === "string" && options.body.length > 0;

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (includeAuth) {
    const token = getStoredToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearSession();
    throw new Error("انتهت صلاحية الجلسة. سجل الدخول مرة أخرى.");
  }

  if (!response.ok) {
    let body: unknown;

    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    throw new Error(extractErrorMessage(body));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function getStoredMockAccounts(): MockAccount[] {
  if (!isBrowser()) {
    return DEFAULT_MOCK_ACCOUNTS;
  }

  const stored = parseStoredJson<MockAccount[]>(
    localStorage.getItem(AUTH_MOCK_USERS_KEY)
  );

  if (stored && stored.length > 0) {
    return stored;
  }

  localStorage.setItem(
    AUTH_MOCK_USERS_KEY,
    JSON.stringify(DEFAULT_MOCK_ACCOUNTS)
  );

  return DEFAULT_MOCK_ACCOUNTS;
}

function setStoredMockAccounts(accounts: MockAccount[]): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_MOCK_USERS_KEY, JSON.stringify(accounts));
}

function getStoredResetTokens(): MockResetToken[] {
  if (!isBrowser()) {
    return [];
  }

  const stored = parseStoredJson<MockResetToken[]>(
    localStorage.getItem(AUTH_RESET_TOKENS_KEY)
  );

  return stored ?? [];
}

function setStoredResetTokens(tokens: MockResetToken[]): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_RESET_TOKENS_KEY, JSON.stringify(tokens));
}

function persistSession(token: string, user: AuthUser): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function persistUpdatedUser(user: AuthUser): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function createResetUrl(token: string): string | undefined {
  if (!isBrowser()) {
    return undefined;
  }

  return `${window.location.origin}/reset-password?token=${token}`;
}

function findAccountByEmail(
  accounts: MockAccount[],
  email: string
): MockAccount | null {
  const normalizedEmail = email.trim().toLowerCase();

  return (
    accounts.find(
      (account) => account.user.email.trim().toLowerCase() === normalizedEmail
    ) ?? null
  );
}

function findAccountById(
  accounts: MockAccount[],
  userId: string
): MockAccount | null {
  return accounts.find((account) => account.user.id === userId) ?? null;
}

function hasValidStoredSession(): {
  token: string;
  user: AuthUser;
} | null {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    if (token || user) {
      clearSession();
    }

    return null;
  }

  if (isTokenExpired(token)) {
    clearSession();
    return null;
  }

  return { token, user };
}

async function mockLogin(payload: LoginPayload): Promise<AuthResponse> {
  await wait(MOCK_LATENCY_MS);

  const accounts = getStoredMockAccounts();
  const account = findAccountByEmail(accounts, payload.email);

  if (!account || account.password !== payload.password) {
    throw new Error("بيانات تسجيل الدخول غير صحيحة.");
  }

  const token = createMockToken(account.user.id);
  persistSession(token, account.user);

  return { token, user: account.user };
}

async function mockRegister(payload: RegisterPayload): Promise<AuthResponse> {
  await wait(MOCK_LATENCY_MS);

  const accounts = getStoredMockAccounts();

  if (findAccountByEmail(accounts, payload.email)) {
    throw new Error("هذا البريد الإلكتروني مسجل بالفعل.");
  }

  const baseUser = {
    id: generateId(payload.role === "instructor" ? "ins" : "usr"),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phoneNumber: payload.phoneNumber.trim(),
    joinTime: formatJoinTime(),
    role: payload.role,
    avatar: DEFAULT_AVATAR,
  };

  const user =
    payload.role === "instructor"
      ? ({
          ...baseUser,
          role: "instructor",
          field: payload.field.trim(),
        } satisfies Instructor)
      : ({
          ...baseUser,
          role: "user",
          address: payload.address.trim(),
        } satisfies User);

  const updatedAccounts = [...accounts, { password: payload.password, user }];
  setStoredMockAccounts(updatedAccounts);

  const token = createMockToken(user.id);
  persistSession(token, user);

  return { token, user };
}

async function mockRestoreSession(
  token: string,
  user: AuthUser
): Promise<AuthResponse | null> {
  await wait(MOCK_LATENCY_MS);

  const userId = decodeMockTokenUserId(token);
  if (!userId || user.id !== userId) {
    clearSession();
    return null;
  }

  const account = findAccountById(getStoredMockAccounts(), userId);
  if (!account) {
    clearSession();
    return null;
  }

  persistSession(token, account.user);

  return {
    token,
    user: account.user,
  };
}

async function mockForgotPassword(
  email: string
): Promise<ForgotPasswordResult> {
  await wait(MOCK_LATENCY_MS);

  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getStoredMockAccounts();
  const account = findAccountByEmail(accounts, normalizedEmail);

  if (!account) {
    return { email: normalizedEmail };
  }

  const token = generateId("reset");
  const tokens = getStoredResetTokens().filter(
    (item) => item.email !== normalizedEmail
  );

  tokens.push({
    email: normalizedEmail,
    token,
    expiresAt: Date.now() + 1000 * 60 * 30,
  });

  setStoredResetTokens(tokens);

  return {
    email: normalizedEmail,
    resetToken: token,
    resetUrl: createResetUrl(token),
  };
}

async function mockResetPassword(payload: ResetPasswordPayload): Promise<void> {
  await wait(MOCK_LATENCY_MS);

  const resetTokens = getStoredResetTokens();
  const match = resetTokens.find((item) => item.token === payload.token);

  if (!match || match.expiresAt < Date.now()) {
    throw new Error("رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية.");
  }

  const accounts = getStoredMockAccounts();
  const accountIndex = accounts.findIndex(
    (item) => item.user.email.trim().toLowerCase() === match.email
  );

  if (accountIndex === -1) {
    throw new Error("تعذر تحديث كلمة المرور لهذا الحساب.");
  }

  const updatedAccounts = [...accounts];
  updatedAccounts[accountIndex] = {
    ...updatedAccounts[accountIndex],
    password: payload.password,
  };

  setStoredMockAccounts(updatedAccounts);
  setStoredResetTokens(
    resetTokens.filter((item) => item.token !== payload.token)
  );
}

async function mockUpdateProfile(updates: AuthUserUpdate): Promise<AuthUser> {
  await wait(MOCK_LATENCY_MS);

  const session = hasValidStoredSession();
  if (!session) {
    throw new Error("لا توجد جلسة مستخدم نشطة.");
  }

  const userId = decodeMockTokenUserId(session.token);
  if (!userId || session.user.id !== userId) {
    clearSession();
    throw new Error("تعذر التحقق من الجلسة الحالية.");
  }

  const accounts = getStoredMockAccounts();
  const accountIndex = accounts.findIndex((account) => account.user.id === userId);

  if (accountIndex === -1) {
    throw new Error("تعذر العثور على بيانات الحساب.");
  }

  const nextEmail = updates.email?.trim().toLowerCase();
  if (
    nextEmail &&
    accounts.some(
      (account) =>
        account.user.id !== userId &&
        account.user.email.trim().toLowerCase() === nextEmail
    )
  ) {
    throw new Error("هذا البريد الإلكتروني مستخدم بالفعل.");
  }

  const currentUser = accounts[accountIndex].user;
  const nextUser =
    currentUser.role === "instructor"
      ? ({
          ...currentUser,
          ...updates,
          email: nextEmail ?? currentUser.email,
          role: "instructor",
          field: updates.field ?? currentUser.field,
        } satisfies Instructor)
      : ({
          ...currentUser,
          ...updates,
          email: nextEmail ?? currentUser.email,
          role: "user",
          address: updates.address ?? currentUser.address,
        } satisfies User);

  const updatedAccounts = [...accounts];
  updatedAccounts[accountIndex] = {
    ...updatedAccounts[accountIndex],
    user: nextUser,
  };

  setStoredMockAccounts(updatedAccounts);
  persistUpdatedUser(nextUser);

  return nextUser;
}

export function getStoredToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token || !token.trim()) {
    return null;
  }

  return token;
}

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) {
    return null;
  }

  const parsedUser = parseStoredJson<unknown>(localStorage.getItem(AUTH_USER_KEY));

  if (!parsedUser) {
    return null;
  }

  if (!isValidAuthUser(parsedUser)) {
    clearSession();
    return null;
  }

  return parsedUser;
}

export function clearSession(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (isMockAuthEnabled) {
    return mockLogin(payload);
  }

  const response = await request<AuthResponse>(AUTH_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const normalizedUser = normalizeAuthUser(response.user);
  persistSession(response.token, normalizedUser);

  return {
    token: response.token,
    user: normalizedUser,
  };
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (isMockAuthEnabled) {
    return mockRegister(payload);
  }

  const response = await request<AuthResponse>(AUTH_ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const normalizedUser = normalizeAuthUser(response.user);
  persistSession(response.token, normalizedUser);

  return {
    token: response.token,
    user: normalizedUser,
  };
}

export async function restoreSession(): Promise<AuthResponse | null> {
  const session = hasValidStoredSession();

  if (!session) {
    return null;
  }

  if (isMockAuthEnabled) {
    return mockRestoreSession(session.token, session.user);
  }

  const response = await request<AuthUser | { user: AuthUser }>(
    AUTH_ENDPOINTS.me,
    {
      method: "GET",
    },
    true
  );

  const rawUser =
    "user" in (response as Record<string, unknown>)
      ? (response as { user: AuthUser }).user
      : (response as AuthUser);
  const normalizedUser = normalizeAuthUser(rawUser);

  persistSession(session.token, normalizedUser);

  return {
    token: session.token,
    user: normalizedUser,
  };
}

export async function forgotPassword(
  email: string
): Promise<ForgotPasswordResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isMockAuthEnabled) {
    return mockForgotPassword(normalizedEmail);
  }

  await request<void>(AUTH_ENDPOINTS.forgotPassword, {
    method: "POST",
    body: JSON.stringify({ email: normalizedEmail }),
  });

  return { email: normalizedEmail };
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<void> {
  if (isMockAuthEnabled) {
    return mockResetPassword(payload);
  }

  await request<void>(AUTH_ENDPOINTS.resetPassword, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProfile(
  updates: AuthUserUpdate
): Promise<AuthUser> {
  if (isMockAuthEnabled) {
    return mockUpdateProfile(updates);
  }

  const response = await request<AuthUser | { user: AuthUser }>(
    AUTH_ENDPOINTS.me,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    },
    true
  );

  const rawUser =
    "user" in (response as Record<string, unknown>)
      ? (response as { user: AuthUser }).user
      : (response as AuthUser);
  const normalizedUser = normalizeAuthUser(rawUser);

  persistUpdatedUser(normalizedUser);

  return normalizedUser;
}

export function logout(): void {
  clearSession();
}

