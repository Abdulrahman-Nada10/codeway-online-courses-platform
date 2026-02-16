'use client';

import React from 'react';

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
      {/* Header */}
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

      {/* Certificates List */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="border border-[#113555] rounded-lg p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3"
          >
            {/* Title and Icon on the right */}
            <div className="text-right flex-1 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M8.99943 17V21L11.9994 19L14.9994 21V17M13.9564 4.27498L13.6334 3.83098C13.4458 3.57354 13.2 3.36409 12.916 3.21968C12.6321 3.07527 12.318 3 11.9994 3C11.6809 3 11.3668 3.07527 11.0828 3.21968C10.7989 3.36409 10.5531 3.57354 10.3654 3.83098L10.0424 4.27498L9.49943 4.18998C9.18477 4.14036 8.86283 4.16586 8.55991 4.2644C8.25699 4.36294 7.98166 4.53172 7.75641 4.75697C7.53117 4.98221 7.36238 5.25754 7.26384 5.56046C7.16531 5.86339 7.13981 6.18532 7.18943 6.49998L7.27443 7.04298L6.83043 7.36598C6.57261 7.55336 6.3628 7.79909 6.21813 8.08308C6.07346 8.36707 5.99805 8.68126 5.99805 8.99998C5.99805 9.3187 6.07346 9.63289 6.21813 9.91688C6.3628 10.2009 6.57261 10.4466 6.83043 10.634L7.27443 10.957L7.18943 11.499C7.13963 11.8137 7.16499 12.1358 7.26345 12.4388C7.36191 12.7419 7.53067 13.0173 7.75594 13.2427C7.98121 13.4681 8.2566 13.637 8.55962 13.7355C8.86263 13.8341 9.18467 13.8596 9.49943 13.81L10.0424 13.725L10.3654 14.169C10.5531 14.4264 10.7989 14.6359 11.0828 14.7803C11.3668 14.9247 11.6809 15 11.9994 15C12.318 15 12.6321 14.9247 12.916 14.7803C13.2 14.6359 13.4458 14.4264 13.6334 14.169L13.9564 13.725L14.4984 13.81C14.8132 13.8598 15.1352 13.8344 15.4383 13.736C15.7413 13.6375 16.0168 13.4687 16.2422 13.2435C16.4675 13.0182 16.6364 12.7428 16.735 12.4398C16.8336 12.1368 16.8591 11.8147 16.8094 11.5L16.7244 10.957L17.1684 10.634C17.4259 10.4463 17.6353 10.2005 17.7797 9.91656C17.9241 9.63261 17.9994 9.31855 17.9994 8.99998C17.9994 8.68141 17.9241 8.36735 17.7797 8.0834C17.6353 7.79944 17.4259 7.55363 17.1684 7.36598L16.7244 7.04298L16.8094 6.50098C16.8592 6.18625 16.8339 5.8642 16.7354 5.56114C16.6369 5.25808 16.4682 4.98262 16.2429 4.75725C16.0176 4.53188 15.7422 4.363 15.4392 4.26441C15.1362 4.16582 14.8142 4.14032 14.4994 4.18998L13.9564 4.27498Z" stroke="#FF6400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="font-cairo font-semibold text-sm sm:text-base lg:text-lg text-[#113555] truncate">
                {cert.title}
              </h4>
            </div>
            
            {/* Date on the left */}
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

