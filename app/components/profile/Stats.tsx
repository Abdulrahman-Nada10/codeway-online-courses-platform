'use client';

import React from 'react';

interface StatsProps {
  registeredCourses: number;
  completedCourses: number;
  certificates: number;
  workingHours: number;
}

const Stats: React.FC<StatsProps> = ({
  registeredCourses,
  completedCourses,
  certificates,
  workingHours,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {/* Registered Courses */}
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الدورات المسجلة</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{registeredCourses}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
            <path stroke="#FF6400" d="M14.1187 3.6443L8.11875 1.6443C8.04167 1.61857 7.95833 1.61857 7.88125 1.6443L1.88125 3.6443C1.80664 3.66921 1.74174 3.71695 1.69576 3.78077C1.64977 3.84459 1.62502 3.92126 1.625 3.99992V8.99992C1.625 9.09938 1.66451 9.19476 1.73483 9.26509C1.80516 9.33542 1.90054 9.37492 2 9.37492C2.09946 9.37492 2.19484 9.33542 2.26517 9.26509C2.33549 9.19476 2.375 9.09938 2.375 8.99992V4.51992L4.7925 5.32617C4.48764 5.77671 4.28106 6.28639 4.18619 6.82204C4.09133 7.35769 4.11031 7.90731 4.2419 8.43514C4.37349 8.96297 4.61474 9.45718 4.94995 9.88561C5.28516 10.314 5.70682 10.6671 6.1875 10.9218C4.98438 11.3299 3.9375 12.1462 3.1875 13.2968C3.14439 13.3794 3.13355 13.475 3.1571 13.5652C3.18065 13.6553 3.23689 13.7334 3.31489 13.7843C3.39288 13.8353 3.48704 13.8554 3.57902 13.8407C3.67101 13.826 3.75423 13.7776 3.8125 13.7049C4.77938 12.2243 6.305 11.3749 8 11.3749C9.695 11.3749 11.2206 12.2243 12.1875 13.7049C12.2454 13.7791 12.3291 13.8289 12.422 13.8442C12.5149 13.8596 12.6101 13.8394 12.6888 13.7878C12.7676 13.7362 12.824 13.6568 12.8469 13.5655C12.8698 13.4742 12.8575 13.3776 12.8125 13.2949C12.0625 12.1462 11.0169 11.3299 9.8125 10.9199C10.2929 10.6649 10.7143 10.3117 11.0492 9.88313C11.3841 9.45457 11.625 8.96031 11.7563 8.43251C11.8876 7.9047 11.9063 7.35517 11.8112 6.81965C11.7161 6.28414 11.5094 5.77464 11.2044 5.3243L14.1187 4.35555C14.1933 4.3306 14.2582 4.28284 14.3041 4.21902C14.3501 4.1552 14.3748 4.07856 14.3748 3.99992C14.3748 3.92129 14.3501 3.84464 14.3041 3.78083C14.2582 3.71701 14.1933 3.66925 14.1187 3.6443ZM11.125 7.49992C11.1252 7.99788 11.0064 8.48868 10.7786 8.93143C10.5507 9.37418 10.2203 9.75607 9.81491 10.0453C9.40954 10.3345 8.94093 10.5226 8.44812 10.594C7.95531 10.6654 7.45257 10.618 6.98179 10.4558C6.51101 10.2935 6.08581 10.0211 5.74163 9.66126C5.39745 9.3014 5.14425 8.8645 5.00313 8.38696C4.862 7.90942 4.83704 7.40507 4.93032 6.91593C5.02359 6.42678 5.23241 5.96701 5.53937 5.57492L7.88125 6.35555C7.95833 6.38128 8.04167 6.38128 8.11875 6.35555L10.4606 5.57492C10.8918 6.12389 11.1258 6.8019 11.125 7.49992ZM8 5.60492L3.1875 3.99992L8 2.39492L12.8125 3.99992L8 5.60492Z" fill="#113555"/>
          </svg>
        </div>
      </div>

      {/* Completed Courses */}
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الدورات المكتملة</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{completedCourses}</p>
        </div>
        <div className="w-18 h-18 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="#FF6400" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Certificates */}
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">الشهادات</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{certificates}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <svg width="10" height="14" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-3.5 sm:w-3.5 sm:h-5">
            <path  d="M4.00138 15V19L7.00138 17L10.0014 19V15M5.00138 7.49998L6.50138 8.99998L9.00138 5.49998M8.95838 2.27498L8.63538 1.83098C8.44773 1.57354 8.20192 1.36409 7.91796 1.21968C7.634 1.07527 7.31995 1 7.00138 1C6.68281 1 6.36875 1.07527 6.0848 1.21968C5.80084 1.36409 5.55502 1.57354 5.36738 1.83098L5.04438 2.27498L4.50138 2.18998C4.18672 2.14036 3.86479 2.16586 3.56186 2.2644C3.25894 2.36294 2.98361 2.53172 2.75837 2.75697C2.53312 2.98221 2.36434 3.25754 2.2658 3.56046C2.16726 3.86339 2.14176 4.18532 2.19138 4.49998L2.27638 5.04298L1.83238 5.36598C1.57457 5.55336 1.36475 5.79909 1.22008 6.08308C1.07542 6.36707 1 6.68126 1 6.99998C1 7.3187 1.07542 7.63289 1.22008 7.91688C1.36475 8.20087 1.57457 8.4466 1.83238 8.63398L2.27638 8.95698L2.19138 9.49898C2.14158 9.81371 2.16695 10.1358 2.26541 10.4388C2.36387 10.7419 2.53262 11.0173 2.75789 11.2427C2.98316 11.4681 3.25856 11.637 3.56157 11.7355C3.86458 11.8341 4.18662 11.8596 4.50138 11.81L5.04438 11.725L5.36738 12.169C5.55502 12.4264 5.80084 12.6359 6.0848 12.7803C6.36875 12.9247 6.68281 13 7.00138 13C7.31995 13 7.634 12.9247 7.91796 12.7803C8.20192 12.6359 8.44773 12.4264 8.63538 12.169L8.95838 11.725L9.50038 11.81C9.81511 11.8598 10.1372 11.8344 10.4402 11.736C10.7433 11.6375 11.0187 11.4687 11.2441 11.2435C11.4695 11.0182 11.6384 10.7428 11.7369 10.4398C11.8355 10.1368 11.861 9.81474 11.8114 9.49998L11.7264 8.95698L12.1704 8.63398C12.4278 8.44633 12.6373 8.20052 12.7817 7.91656C12.9261 7.63261 13.0014 7.31855 13.0014 6.99998C13.0014 6.68141 12.9261 6.36735 12.7817 6.0834C12.6373 5.79944 12.4278 5.55363 12.1704 5.36598L11.7264 5.04298L11.8114 4.50098C11.8612 4.18625 11.8358 3.8642 11.7374 3.56114C11.6389 3.25808 11.4701 2.98262 11.2449 2.75725C11.0196 2.53188 10.7442 2.363 10.4412 2.26441C10.1382 2.16582 9.81613 2.14032 9.50138 2.18998L8.95838 2.27498Z" stroke="#FF6400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Working Hours */}
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-gray-100 min-w-0">
        <div className="text-right flex-1 min-w-0">
          <p className="font-cairo text-[10px] sm:text-xs text-gray-500 truncate">ساعات التعلم</p>
          <p className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{workingHours}</p>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF3EB]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="#FF6400" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Stats;

