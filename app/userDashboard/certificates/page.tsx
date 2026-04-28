'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import CertificateCard from '../../components/CertificateCard';
import { useLocaleDirection } from '../../hooks/useLocaleDirection';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';
import { getUserCertificates } from './data';

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
    dispatch(setContext('certificates'));
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
      className="mt-26 min-h-screen overflow-x-hidden bg-[#FFF3EB] dark:bg-slate-950"
      dir={dir}
    >
      <div className="md:mr-0 rtl:lg:mr-70 rtl:xl:mr-70 ltr:lg:ml-70 ltr:xl:ml-70">
        <main className="p-2 sm:p-3 lg:p-6">
          <div className="mb-3 text-start sm:mb-6">
            <h1 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl lg:text-2xl">
              {t('dashboard.certificates')}
            </h1>
            <p className="mt-0.5 font-cairo text-xs text-gray-600 dark:text-slate-400 sm:mt-1 sm:text-sm">
              {t('dashboard.certificatesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-273 flex-col items-center justify-center rounded-3xl border border-solid bg-white p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:mt-12 sm:h-85.25 sm:p-6">
            <div className="flex h-76.5 w-112.25 flex-col items-center justify-center gap-6">
              <div className="flex h-17 w-17.5 shrink-0 items-center justify-center rounded-full bg-[#113555] sm:h-22.5 sm:w-22.5">
                <svg
                  width="30"
                  height="44"
                  viewBox="0 0 30 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.87816 33.0833V42.25L14.7532 37.6666L21.6282 42.25V33.0833M10.1698 15.8958L13.6073 19.3333L19.3365 11.3125M19.238 3.92183L18.4977 2.90433C18.0677 2.31437 17.5044 1.83436 16.8537 1.50343C16.2029 1.1725 15.4832 1 14.7532 1C14.0231 1 13.3034 1.1725 12.6527 1.50343C12.0019 1.83436 11.4386 2.31437 11.0086 2.90433L10.2684 3.92183L9.02399 3.72704C8.3029 3.61332 7.56513 3.67176 6.87093 3.89758C6.17673 4.1234 5.54578 4.51019 5.02959 5.02638C4.5134 5.54257 4.1266 6.17353 3.90078 6.86773C3.67497 7.56193 3.61653 8.29969 3.73024 9.02079L3.92504 10.2652L2.90753 11.0054C2.31671 11.4348 1.83589 11.9979 1.50436 12.6487C1.17283 13.2995 1 14.0196 1 14.75C1 15.4803 1.17283 16.2004 1.50436 16.8512C1.83589 17.502 2.31671 18.0651 2.90753 18.4945L3.92504 19.2347L3.73024 20.4768C3.61612 21.1981 3.67425 21.9361 3.89989 22.6306C4.12553 23.3251 4.51226 23.9564 5.02851 24.4729C5.54475 24.9893 6.17586 25.3764 6.87027 25.6023C7.56467 25.8282 8.30268 25.8867 9.02399 25.7729L10.2684 25.5781L11.0086 26.5956C11.4386 27.1855 12.0019 27.6655 12.6527 27.9965C13.3034 28.3274 14.0231 28.4999 14.7532 28.4999C15.4832 28.4999 16.2029 28.3274 16.8537 27.9965C17.5044 27.6655 18.0677 27.1855 18.4977 26.5956L19.238 25.5781L20.48 25.7729C21.2013 25.887 21.9393 25.8289 22.6338 25.6032C23.3283 25.3776 23.9596 24.9909 24.4761 24.4746C24.9926 23.9584 25.3796 23.3273 25.6055 22.6329C25.8314 21.9384 25.8899 21.2004 25.7761 20.4791L25.5813 19.2347L26.5988 18.4945C27.1887 18.0645 27.6688 17.5012 27.9997 16.8505C28.3306 16.1997 28.5031 15.48 28.5031 14.75C28.5031 14.0199 28.3306 13.3002 27.9997 12.6495C27.6688 11.9987 27.1887 11.4354 26.5988 11.0054L25.5813 10.2652L25.7761 9.02308C25.8902 8.30181 25.8321 7.56378 25.6064 6.86928C25.3808 6.17477 24.9941 5.5435 24.4778 5.02703C23.9616 4.51056 23.3305 4.12355 22.6361 3.89762C21.9416 3.67168 21.2036 3.61323 20.4823 3.72704L19.238 3.92183Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="text-center">
                <h2 className="font-cairo text-base font-bold text-[#113555] dark:text-slate-100 sm:text-lg">
                  {t('dashboard.noCertificatesYet')}
                </h2>
                <p className="mt-1 font-cairo text-sm text-gray-600 dark:text-slate-400 sm:text-base">
                  {t('dashboard.certificatesCount', {
                    count: filteredCertificates.length,
                  })}
                </p>
                <p className="mt-0.5 font-cairo text-xs text-gray-500 dark:text-slate-500 sm:text-sm">
                  {t('dashboard.completeMoreCourses')}
                </p>
              </div>

              <Link href="/list-of-courses">
                <button className="rounded-lg bg-[#FF6400] px-6 py-2.5 font-cairo text-sm font-semibold text-white transition-colors hover:bg-[#E55A00] sm:py-3 sm:text-base">
                  {t('common.exploreCourses')}
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
