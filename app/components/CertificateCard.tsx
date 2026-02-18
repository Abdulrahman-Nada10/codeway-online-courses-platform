'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InstructorIcon, CalendarIcon, DiplomaIcon, EyeIcon, DownloadIcon, ShareIcon } from './Icons';

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
  return (
    <div className="w-full max-w-86 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-40">
        <Image
          src="/card.jpg"
          alt={certificate.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-cairo font-bold text-base text-[#113555] line-clamp-2">
          {certificate.title}
        </h3>
        <div className="flex items-center gap-2">
          <InstructorIcon className="w-4 h-3.5" />
          <span className="font-cairo text-sm text-gray-600">
            {certificate.instructor}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="font-cairo text-sm text-gray-600">
            {certificate.day} {certificate.month} {certificate.year}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DiplomaIcon className="w-4 h-4" />
          <span className="font-cairo text-sm text-gray-600">
            {certificate.certificateNumber}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Link 
            href={`/certificates/${certificate.id}`}
            className="flex-1 py-2.5 rounded-lg font-cairo font-semibold text-sm bg-[#FF6400] text-white hover:bg-[#E55A00] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            عرض
          </Link>
          <button className="w-10 h-10 rounded-lg border border-[#888888] flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="تحميل">
            <DownloadIcon className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-lg border border-[#888888] flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="مشاركة">
            <ShareIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
