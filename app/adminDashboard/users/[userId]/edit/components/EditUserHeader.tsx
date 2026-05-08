"use client";

import React from 'react';
import { ArrowRight, MoveLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface EditUserHeaderProps {
  userId: string;
}

const EditUserHeader: React.FC<EditUserHeaderProps> = ({ userId }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/adminDashboard/users/${userId}`} 
        className="flex items-center gap-2 text-orange-500 font-medium text-sm w-fit"
      >
        <div className="bg-[#ffffff] hover:bg-white/50 dark:bg-[#1E293B] dark:hover:bg-[#1E293B]/50 p-2 rounded-xl transition-colors duration-300">

          {isRTL ? <ArrowRight size={18} /> : <MoveLeft size={18} />}
        </div>
        { t('admin.users.edit.backToDetails') }
      </Link>

     

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
          {t('admin.users.edit.title')}
        </h1>
        <p className="text-gray-500 text-sm">
          {t('admin.users.edit.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default EditUserHeader;
