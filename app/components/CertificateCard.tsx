'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { InstructorIcon, CalendarIcon, DiplomaIcon, EyeIcon, DownloadIcon, ShareIcon } from './icons';

interface Certificate {
  id: number;
  title: string;
  instructor: string;
  day: number;
  month: string;
  year: number;
  certificateNumber: string;
  courseName?: string;
  studentName?: string;
  issueDate?: string;
  status?: string;
  totalHours?: number;
  units?: number;
}

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();

  return (
    <div className="w-full max-w-86 overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-900" dir={dir}>
      <div className="relative w-full h-40">
        <Image
          src="/card.jpg"
          alt={certificate.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="line-clamp-2 font-cairo text-base font-bold text-[#113555] dark:text-slate-100">
          {certificate.title}
        </h3>
        <div className="flex items-center gap-2">
          <InstructorIcon className="w-4 h-3.5" />
          <span className="font-cairo text-sm text-gray-600 dark:text-slate-400">
            {certificate.instructor}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="font-cairo text-sm font-normal text-black dark:text-slate-200">
           <span className='font-cairo text-sm text-gray-600 dark:text-slate-400'>{t('dashboard.issueDate')}: </span> 
           {certificate.day} {certificate.month} {certificate.year}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DiplomaIcon className="w-4 h-4" />
          <span className="font-cairo text-sm font-normal text-black dark:text-slate-200">
          <span className='font-cairo text-sm text-gray-600 dark:text-slate-400'>{t('dashboard.certificateNumber')}: </span> 
            {certificate.certificateNumber}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Link 
            href={`/userDashboard/certificates/${certificate.id}`}
            className="flex-1 py-2.5 rounded-lg font-cairo font-semibold text-sm bg-[#FF6400] text-white hover:bg-[#E55A00] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            {t('common.view')}
          </Link>
          <button className="w-10 h-10 rounded-lg border border-[#888888] flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label={t('common.download')}>
            <DownloadIcon className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-lg border border-[#888888] flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label={t('common.share')}>
            <ShareIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

