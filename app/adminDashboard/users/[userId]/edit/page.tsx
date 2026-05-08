"use client";

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { mockUsers } from '@/app/adminDashboard/users/mockData';
import EditUserHeader from './components/EditUserHeader';
import EditUserForm from './components/EditUserForm';

const EditUserDetailsPage = () => {
  const { i18n } = useTranslation();
  const { userId } = useParams();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  // Find user by ID or use the first one as mock for demo purposes
  const user = useMemo(() => {
    return mockUsers.find(u => u.id === userId) || mockUsers[0];
  }, [userId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-10 px-8" dir={dir}>
      {/* Header with Back Link and Title */}
      <EditUserHeader userId={user.id} />

      {/* Main Edit Form */}
      <EditUserForm user={user} />
    </div>
  );
};

export default EditUserDetailsPage;
