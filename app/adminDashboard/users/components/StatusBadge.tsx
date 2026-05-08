import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserStatus } from '@/types';

interface StatusBadgeProps {
  status: UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const styles = {
    active: "bg-[#00AC47] text-white",
    inactive: "bg-[#ffffff] border border-[#535353] text-[#535353] dark:bg-slate-700 dark:text-white",
    pending: "bg-[#D00000] text-white",
    under_review: "bg-[#FFB100] text-white",
  };

  return (
    <span className={`px-2 py-1 rounded-full  font-medium inline-block min-w-[100px] text-center ${styles[status]}`}>
      {t(`admin.users.table.statuses.${status}`)}
    </span>
  );
};

export default StatusBadge;
