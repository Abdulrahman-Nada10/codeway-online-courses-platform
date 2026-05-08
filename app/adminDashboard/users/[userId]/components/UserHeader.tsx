import React from 'react';
import { ArrowRight, MoveLeft, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';

const UserHeader = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const router = useRouter();
  const {userId}=useParams();


  return (
    <div className="flex flex-col gap-6">
      <Link 
        href="/adminDashboard/users" 
        className="flex items-center gap-2 text-orange-500 font-medium text-sm w-fit"
      >
        <div className="bg-[#ffffff] hover:bg-white/50 dark:bg-[#1E293B] dark:hover:bg-[#1E293B]/50 p-2 rounded-xl transition-colors duration-300">

          {isRTL ? <ArrowRight size={18} /> : <MoveLeft size={18} />}
        </div>
        {t('admin.users.details.back')}
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
            {t('admin.users.details.title')}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {t('admin.users.details.subtitle')}
          </p>
        </div>
        
        <Button 
        variant="save"
        onClick={()=>router.push(`/adminDashboard/users/${userId}/edit`)}
        >
          <SquarePen size={20} />
          {t('admin.users.details.editData')}
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
