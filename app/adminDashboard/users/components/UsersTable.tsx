import React from 'react';
import { Eye, Edit3, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import StatusBadge from './StatusBadge';

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/adminDashboard/users/${id}`);
  };

  return (
    <div className="w-full overflow-x-auto rounded-4xl border border-orange-50 dark:border-gray-800 bg-[#ffffff] dark:bg-slate-800 shadow-sm">
      <table className="w-full text-start border-collapse">
        <thead>
          <tr className="bg-[#FFE5D4] dark:bg-slate-700 text-[#535353] dark:text-gray-200">
            <th className="px-6 py-4 font-bold text-sm">{t('admin.users.table.columns.name')}</th>
            <th className="px-6 py-4 font-bold text-sm">{t('admin.users.table.columns.email')}</th>
            <th className="px-6 py-4 font-bold text-sm">{t('admin.users.table.columns.role')}</th>
            <th className="px-6 py-4 font-bold text-sm">{t('admin.users.table.columns.courses')}</th>
            <th className="px-6 py-4 font-bold text-sm">{t('admin.users.table.columns.joinDate')}</th>
            <th className="px-6 py-4 font-bold text-sm text-center">{t('admin.users.table.columns.status')}</th>
            <th className="px-6 py-4 font-bold text-sm text-center">{t('admin.users.table.columns.control')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
          {users.map((user) => (
            <tr 
              key={user.id} 
              onClick={() => handleRowClick(user.id)}
              className="hover:bg-orange-50/50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm font-bold text-[#33363F] dark:text-gray-200">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {t(`admin.users.table.roles.${user.role}`)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.coursesCount}</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joinDate}</td>
              <td className="px-6 py-4 text-center">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-4 text-orange-500">
                  <button onClick={(e) => { e.stopPropagation(); }} className="hover:scale-110 transition-transform">
                    <Eye size={18} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="hover:scale-110 transition-transform">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="hover:scale-110 transition-transform">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
