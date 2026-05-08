import React from 'react';
import { BookOpen, Album , Award, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User } from '@/types';

interface UserStatsProps {
  user: User;
}

const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('admin.users.details.stats.enrolled'),
      value: user.coursesCount,
      icon: <BookOpen size={22} className="text-[#FF6B00]" />,
      bg: "bg-[#FFF5F0] dark:bg-[#1E293B]",
    },
    {
      label: t('admin.users.details.stats.completed'),
      value: user.completedCoursesCount || 0,
      icon: <Album  size={22} className="text-[#FF6B00]" />,
      bg: "bg-[#FFF5F0] dark:bg-[#1E293B]",
    },
    {
      label: t('admin.users.details.stats.certificates'),
      value: user.certificatesCount || 0,
      icon: <Award size={22} className="text-[#FF6B00]" />,
      bg: "bg-[#FFF5F0] dark:bg-[#1E293B]",
    },
    {
      label: t('admin.users.details.stats.learningHours'),
      value: user.learningHours || 0,
      icon: <Clock size={22} className="text-[#FF6B00]" />,
      bg: "bg-[#FFF5F0] dark:bg-[#1E293B]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-[#1E293B] rounded-3xl p-5 border border-orange-50 dark:border-gray-800 shadow-sm flex items-center justify-between"
        >
          <div className="flex flex-col gap-1 text-start">
            <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
          </div>
          <div className={`${stat.bg} p-3 rounded-2xl`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
