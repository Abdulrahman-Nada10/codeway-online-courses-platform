'use client';

import React from 'react';
import Image from 'next/image';

interface UserInfoProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
  phone,
  location,
  joinDate,
  avatar,
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-[#FF6400] shrink-0 mx-auto sm:mx-0">
          <Image
            src={avatar}
            alt="الصورة الشخصية"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="mb-3 sm:mb-4 text-center sm:text-right">
            <h2 className="font-cairo font-bold text-lg sm:text-xl lg:text-2xl text-[#113555]">
              {name}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-4 lg:gap-x-34 sm:gap-y-2 mt-8">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5 sm:w-4 sm:h-4 text-[#FF6400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600 truncate max-w-45 sm:max-w-none">{email}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600">{phone}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600">{location}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600">انضم في {joinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

