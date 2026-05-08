import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardInput from '@/app/components/ui/DashboardInput';
import CustomDropdown from '@/app/components/ui/CustomDropdown';

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const UsersFilters: React.FC<UsersFiltersProps> = ({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
}) => {
  const { t } = useTranslation();

  const roleOptions = [
    { value: 'all', label: t('admin.users.filters.roles') },
    { value: 'student', label: t('admin.users.table.roles.student') },
    { value: 'instructor', label: t('admin.users.table.roles.instructor') },
  ];

  const statusOptions = [
    { value: 'all', label: t('admin.users.filters.statuses') },
    { value: 'active', label: t('admin.users.table.statuses.active') },
    { value: 'inactive', label: t('admin.users.table.statuses.inactive') },
    { value: 'pending', label: t('admin.users.table.statuses.pending') },
    { value: 'under_review', label: t('admin.users.table.statuses.under_review') },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-orange-50 dark:border-gray-800 shadow-sm">
      <div className="flex-1 w-full">
        <DashboardInput
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('admin.users.searchPlaceholder')}
          rightIcon={<Search size={18} />}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <CustomDropdown
          options={roleOptions}
          value={role}
          onChange={onRoleChange}
        />
        <CustomDropdown
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
        />
        
        <button className="flex items-center gap-2 bg-[#fff3eb] hover:bg-[#e6d1c4] text-[#535353] font-semibold text-sm px-4 py-2.5 rounded-full shadow-sm transition-all whitespace-nowrap">
          <Filter size={16} />
          {t('admin.users.filters.selectData')}
        </button>
      </div>
    </div>
  );
};

export default UsersFilters;
