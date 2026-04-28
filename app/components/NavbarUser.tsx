"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import SearchBar from "@/app/components/SearchBar";
import { useAuth } from "@/app/hooks/useAuth";
import { useLocaleDirection } from "@/app/hooks/useLocaleDirection";
import { useAppDispatch } from "@/app/store/hooks";
import { setContext } from "@/app/store/searchSlice";

function getContextFromPathname(pathname: string) {
  if (pathname.startsWith("/userDashboard/my-courses")) return "courses";
  if (pathname.startsWith("/userDashboard/liveSession")) return "liveSession";
  if (pathname.startsWith("/userDashboard/favorites")) return "favorites";
  if (pathname.startsWith("/userDashboard/certificates")) return "certificates";
  if (pathname.startsWith("/userDashboard/profile")) return "profile";
  return null;
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { dir, isRTL } = useLocaleDirection();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const context = getContextFromPathname(pathname);
    dispatch(setContext(context));
  }, [pathname, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const displayName = user?.name ?? t("nav.student");
  const roleLabel =
    user?.role === "instructor" ? t("nav.instructor") : t("nav.student");
  const avatarSrc = user?.avatar ?? "/profile.jpg";

  return (
    <header
      className="fixed top-0 z-50 w-full bg-transparent p-3 font-cairo sm:w-11/12 sm:p-5 md:w-10/12 lg:w-[calc(100%-280px)] xl:w-[calc(100%-256px)] 2xl:w-[calc(100%-300px)] rtl:left-0 ltr:right-0"
      dir={dir}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-orange-50/50 bg-white px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:rounded-xl sm:px-8">
        <div className="max-w-xs flex-1 sm:max-w-sm md:max-w-md lg:max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.changeLanguage")}
            title={t("nav.changeLanguage")}
            className="hidden items-center gap-1.5 rounded-xl p-2 text-[#113555] transition hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex"
          >
            <Languages className="h-5 w-5" />
            <span className="text-[11px] font-bold uppercase">
              {isRTL ? "AR" : "EN"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            title={t("theme.toggle")}
            className="hidden rounded-xl p-2 text-[#113555] transition hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              aria-label={t("nav.notifications")}
              title={t("nav.notifications")}
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative rounded-xl p-2 transition hover:bg-orange-50 dark:hover:bg-slate-800"
            >
              <Bell className="h-5 w-5 text-[#113555] dark:text-slate-200" />
              <span className="absolute top-1 h-2 w-2 rounded-full bg-[#FF6400] rtl:left-1 ltr:right-1" />
            </button>

            {showNotifications && (
              <div className="absolute z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 rtl:left-0 ltr:right-0 sm:w-72">
                <div className="border-b border-gray-100 p-3 dark:border-slate-800">
                  <h3 className="font-cairo text-sm font-bold text-[#113555] dark:text-slate-100">
                    {t("nav.notifications")}
                  </h3>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  <div className="cursor-pointer border-b border-gray-50 p-3 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800">
                    <p className="text-sm text-[#113555] dark:text-slate-100">
                      {t("dashboard.newCourseNotification")}
                    </p>
                    <span className="text-xs text-gray-400">
                      {t("dashboard.hourAgo")}
                    </span>
                  </div>

                  <div className="cursor-pointer border-b border-gray-50 p-3 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800">
                    <p className="text-sm text-[#113555] dark:text-slate-100">
                      {t("dashboard.questionReplied")}
                    </p>
                    <span className="text-xs text-gray-400">
                      {t("dashboard.dayAgo")}
                    </span>
                  </div>

                  <div className="cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-slate-800">
                    <p className="text-sm text-[#113555] dark:text-slate-100">
                      {t("dashboard.discountNotification")}
                    </p>
                    <span className="text-xs text-gray-400">
                      {t("dashboard.twoDaysAgo")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#FF6400] sm:h-9 sm:w-9 lg:h-10 lg:w-10">
              <Image
                src={avatarSrc}
                alt={t("nav.userProfile")}
                fill
                className="object-cover"
              />
            </div>

            <div className="hidden flex-col items-start text-start sm:flex">
              <span className="font-cairo text-sm font-bold leading-tight text-[#113555] dark:text-slate-100">
                {displayName}
              </span>
              <span className="font-cairo text-xs text-[#FF6400]">
                {roleLabel}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
