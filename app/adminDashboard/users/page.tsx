"use client";

import React, { useState, useMemo } from 'react';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import UsersFilters from './components/UsersFilters';
import UsersTable from './components/UsersTable';
import Pagination from './components/Pagination';
import { mockUsers } from './mockData';
import Button from '@/app/components/ui/Button';

const UsersPage = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  // State for filters
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filtered data
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.includes(search) || user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role === 'all' || user.role === role;
      const matchesStatus = status === 'all' || user.status === status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  // Paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-8 pt-5 pb-8 px-8 " dir={dir}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
            {t('admin.users.title')}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {t('admin.users.subtitle')}
          </p>
        </div>
        
        <Button
        variant="save"
         >
          <UserPlus size={20} />
          {t('admin.users.addUser')}
        </Button>
      </div>

      {/* Filters Section */}
      <UsersFilters
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Table Section */}
      <UsersTable users={paginatedUsers} />

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <p className="text-gray-400 text-sm">
          {t('admin.users.pagination.info', {
            start: (currentPage - 1) * itemsPerPage + 1,
            end: Math.min(currentPage * itemsPerPage, filteredUsers.length),
            total: filteredUsers.length
          })}
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;