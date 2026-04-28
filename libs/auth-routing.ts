import { UserRole } from "@/types/auth";

const AUTH_REDIRECT_PATH_KEY = "auth_redirect_path";
const USER_ROUTE_PREFIXES = [
  "/userDashboard/profile",
  ];
const INSTRUCTOR_ROUTE_PREFIXES = [
  "/ins-dashboard",
  "/ins-courses",
  "/ins-students",
  "/ins-earnings",
  "/ins-certificates",
  "/ins-profile",
  "/ins-settings",
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getDashboardRoute(role: UserRole | null | undefined): string {
  switch (role) {
    case "instructor":
      return "/ins-dashboard";
    case "admin":
      return "/admin";
    default:
      return "/userDashboard/profile";
  }
}

export function getRequiredRoleForPath(pathname: string): UserRole | null {
  if (USER_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return "user";
  }

  if (INSTRUCTOR_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return "instructor";
  }

  return null;
}

export function canRoleAccessPath(
  role: UserRole,
  pathname: string
): boolean {
  const requiredRole = getRequiredRoleForPath(pathname);
  return !requiredRole || requiredRole === role;
}

export function buildPathWithSearch(
  pathname: string,
  search?: string | null
): string {
  if (!search || search === "?") {
    return pathname;
  }

  return `${pathname}${search.startsWith("?") ? search : `?${search}`}`;
}

export function storeAuthRedirectPath(path: string): void {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.setItem(AUTH_REDIRECT_PATH_KEY, path);
}

export function clearStoredAuthRedirectPath(): void {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.removeItem(AUTH_REDIRECT_PATH_KEY);
}

export function consumeAuthRedirectPath(
  role: UserRole | null | undefined
): string {
  const fallbackRoute = getDashboardRoute(role);

  if (!isBrowser()) {
    return fallbackRoute;
  }

  const storedPath = sessionStorage.getItem(AUTH_REDIRECT_PATH_KEY);
  clearStoredAuthRedirectPath();

  if (!storedPath || !role) {
    return fallbackRoute;
  }

  return canRoleAccessPath(role, storedPath) ? storedPath : fallbackRoute;
}

