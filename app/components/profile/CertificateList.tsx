'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award } from '../icons';

interface Certificate {
  id: number;
  title: string;
  dateLabel: string;
}

interface CertificateListProps {
  certificates: Certificate[];
}

const CertificateList: React.FC<CertificateListProps> = ({ certificates }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:space-y-6 sm:p-4 lg:p-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="font-cairo text-base font-bold text-[#113555] dark:text-slate-100 sm:text-lg">
            {t('profile.latestCertificates')}
          </h3>
        </div>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-xs sm:text-sm hover:bg-[#E55A00] transition-colors self-end sm:self-auto">
          {t('common.viewAll')}
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="border border-[#113555] rounded-lg p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3"
          >
            <div className="flex w-full flex-1 items-center gap-2 text-start sm:w-auto sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6400]" strokeWidth={2} />
              </div>
              <h4 className="truncate font-cairo text-sm font-semibold text-[#113555] dark:text-slate-100 sm:text-base lg:text-lg">
                {cert.title}
              </h4>
            </div>

            <p className="self-end whitespace-nowrap font-cairo text-xs leading-none text-[#113555] dark:text-slate-200 sm:self-center sm:text-sm lg:text-[20px]">
              {cert.dateLabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;

