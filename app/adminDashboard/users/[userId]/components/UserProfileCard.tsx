import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User } from '@/types';
import StatusBadge from '@/app/adminDashboard/users/components/StatusBadge';

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#ffffff] dark:bg-[#1E293B] rounded-xl p-6 shadow-sm border border-orange-50 dark:border-gray-800  relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <img 
            src={user.avatar || "/placeholder-avatar.png"} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-50"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{user.name}</h2>
            <StatusBadge status={user.status} />
          </div>
          <p className="text-gray-500 text-sm">{t(`admin.users.details.roles.${user.role}`)}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Mail size={18} className="text-orange-500" />
              <span className="text-sm truncate max-w-[200px]">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone size={18} className="text-orange-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="text-orange-500" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Calendar size={18} className="text-orange-500" />
              <span className="text-sm whitespace-nowrap">
                {t('admin.users.details.contact.joined')} {user.joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
