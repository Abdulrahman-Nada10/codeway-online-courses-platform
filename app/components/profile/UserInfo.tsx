'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

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
                <Mail className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600 truncate max-w-45 sm:max-w-none">{email}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600">{phone}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs sm:text-sm text-gray-600">{location}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#FF6400]" />
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

