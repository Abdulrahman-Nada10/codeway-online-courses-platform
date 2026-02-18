'use client';

import React from 'react';
import { Award } from '../icons';

interface Certificate {
  id: number;
  title: string;
  day: number;
  month: string;
  year: number;
}

interface CertificateListProps {
  certificates: Certificate[];
}
const CertificateList: React.FC<CertificateListProps> = ({ certificates }) => {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-gray-200 space-y-4 sm:space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="font-cairo font-bold text-base sm:text-lg text-[#113555]">
            اخر الشهادات 
          </h3>
        </div>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-xs sm:text-sm hover:bg-[#E55A00] transition-colors self-end sm:self-auto">
          عرض الكل
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="border border-[#113555] rounded-lg p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3"
          >
            <div className="text-right flex-1 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6400]" strokeWidth={2} />
              </div>
              <h4 className="font-cairo font-semibold text-sm sm:text-base lg:text-lg text-[#113555] truncate">
                {cert.title}
              </h4>
            </div>
            
            <p className="font-cairo font-normal text-xs sm:text-sm lg:text-[20px] text-[#113555] leading-none self-end sm:self-center whitespace-nowrap">
              {cert.day} {cert.month} {cert.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;

