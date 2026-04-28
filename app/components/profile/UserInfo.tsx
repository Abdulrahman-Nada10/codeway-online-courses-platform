'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-[#FF6400] shrink-0 mx-auto sm:mx-0">
          <Image
            src={avatar}
            alt={t('common.profileImage')}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="mb-3 text-center sm:mb-4 sm:text-start">
            <h2 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl lg:text-2xl">
              {name}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 mt-8 justify-around">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="max-w-45 truncate font-cairo text-xs text-gray-600 dark:text-slate-400 sm:max-w-none sm:text-sm">{email}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs text-gray-600 dark:text-slate-400 sm:text-sm">{phone}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs text-gray-600 dark:text-slate-400 sm:text-sm">{location}</span>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#FF6400]" />
              </div>
              <span className="font-cairo text-xs text-gray-600 dark:text-slate-400 sm:text-sm">{t('profile.joinedIn', { date: joinDate })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

