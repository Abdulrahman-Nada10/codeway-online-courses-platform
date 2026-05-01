'use client';

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CertificateCard from "../../components/CertificateCard";
import { useLocaleDirection } from "../../hooks/useLocaleDirection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setContext } from "../../store/searchSlice";
import { getUserCertificates } from "./data";
import { ShieldCheck } from "lucide-react";

export default function Certificates() {
  const { t, i18n } = useTranslation();
  const { dir } = useLocaleDirection();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const certificates = useMemo(
    () => getUserCertificates(t),
    [t, i18n.language]
  );

  useEffect(() => {
    dispatch(setContext("certificates"));
  }, [dispatch]);

  const filteredCertificates = useMemo(() => {
    if (!searchQuery.trim()) return certificates;
    const lower = searchQuery.toLowerCase();

    return certificates.filter(
      (certificate) =>
        certificate.title.toLowerCase().includes(lower) ||
        certificate.instructor.toLowerCase().includes(lower) ||
        certificate.courseName.toLowerCase().includes(lower)
    );
  }, [certificates, searchQuery]);

  return (
    <div
      className="mt-26 min-h-screen overflow-x-hidden bg-page-bg dark:bg-page-bg"
      dir={dir}
    >
      <div className="md:mr-0 rtl:lg:mr-70 rtl:xl:mr-70 ltr:lg:ml-70 ltr:xl:ml-70">
        <main className="p-2 sm:p-3 lg:p-6">
          <div className="mb-3 text-start sm:mb-6">
            <h1 className="font-cairo text-lg font-bold text-main-text dark:text-main-text sm:text-xl lg:text-2xl">
              {t("dashboard.certificates")}
            </h1>
            <p className="mt-0.5 font-cairo text-xs text-sub-text dark:text-sub-text sm:mt-1 sm:text-sm">
              {t("dashboard.certificatesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-273 flex-col items-center justify-center rounded-3xl border border-solid bg-background p-2.5 shadow-sm dark:border-border dark:bg-background sm:mt-12 sm:h-85.25 sm:p-6">
            <div className="flex h-76.5 w-112.25 flex-col items-center justify-center gap-6">
              <div className="flex h-17 w-17.5 shrink-0 items-center justify-center rounded-full bg-secondary sm:h-22.5 sm:w-22.5">
                <ShieldCheck className="h-8 w-8 text-background sm:h-10 sm:w-10" />
              </div>

              <div className="text-center">
                <h2 className="font-cairo text-base font-bold text-main-text sm:text-lg">
                  {t("dashboard.noCertificatesYet")}
                </h2>
                <p className="mt-1 font-cairo text-sm text-sub-text dark:text-sub-text sm:text-base">
                  {t("dashboard.certificatesCount", {
                    count: filteredCertificates.length,
                  })}
                </p>
                <p className="mt-0.5 font-cairo text-xs text-muted-foreground dark:text-muted-foreground sm:text-sm">
                  {t("dashboard.completeMoreCourses")}
                </p>
              </div>

              <Link href="/list-of-courses">
                <button className="rounded-lg bg-primary px-6 py-2.5 font-cairo text-sm font-semibold text-background transition-all hover:bg-primary/90 sm:py-3 sm:text-base">
                  {t("common.exploreCourses")}
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
