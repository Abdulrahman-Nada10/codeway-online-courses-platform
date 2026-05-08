import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardInput from '@/app/components/ui/DashboardInput';
import CustomDropdown from '@/app/components/ui/CustomDropdown';

interface UserCourseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  major: string;
  onMajorChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const UserCourseFilters: React.FC<UserCourseFiltersProps> = ({
  search,
  onSearchChange,
  major,
  onMajorChange,
  status,
  onStatusChange,
}) => {
  const { t } = useTranslation();

  const majorOptions = [
    { value: 'all', label: t('admin.users.details.courses.major') },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
  ];

  const statusOptions = [
    { value: 'all', label: t('admin.users.details.courses.allStatuses') },
    { value: 'ongoing', label: t('admin.users.details.courses.status.ongoing') },
    { value: 'completed', label: t('admin.users.details.courses.status.completed') },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#ffffff] dark:bg-[#1E293B] p-4 rounded-3xl border border-orange-50 dark:border-gray-800 shadow-sm">
      <div className="flex-1 w-full">
        <DashboardInput
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('admin.users.details.courses.searchPlaceholder')}
          rightIcon={<Search size={18} />}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <CustomDropdown
          options={majorOptions}
          value={major}
          onChange={onMajorChange}
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

export default UserCourseFilters;
