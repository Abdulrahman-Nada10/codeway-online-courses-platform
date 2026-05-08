"use client";

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { mockUsers } from '@/app/adminDashboard/users/mockData';
import UserHeader from './components/UserHeader';
import UserProfileCard from './components/UserProfileCard';
import UserStats from './components/UserStats';
import UserCourseFilters from './components/UserCourseFilters';
import UserCourseCard from './components/UserCourseCard';

const UserDetailsPage = () => {
  const { t, i18n } = useTranslation();
  const { userId } = useParams();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  // Find user by ID or use the first one as mock
  const user = useMemo(() => {
    return mockUsers.find(u => u.id === userId) || mockUsers[0];
  }, [userId]);

  // State for course filters
  const [search, setSearch] = useState('');
  const [major, setMajor] = useState('all');
  const [status, setStatus] = useState('all');

  // Filtered courses
  const filteredCourses = useMemo(() => {
    if (!user.enrolledCourses) return [];
    return user.enrolledCourses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' || course.status === status;
      // Note: major filtering logic would go here if courses had a major field
      return matchesSearch && matchesStatus;
    });
  }, [user, search, status]);

  return (
    <div className="flex flex-col gap-5  pb-8 px-8" dir={dir}>
      <UserHeader />
      <UserProfileCard user={user} />

      {/* Stats Row */}
      <UserStats user={user} />

      {/* Courses Section */}
      <div className="flex flex-col gap-6 ">
      
        <UserCourseFilters
          search={search}
          onSearchChange={setSearch}
          major={major}
          onMajorChange={setMajor}
          status={status}
          onStatusChange={setStatus}
        />

             
     <div className=' flex flex-col gap-5 bg-[#ffffff] dark:bg-[#1E293B] rounded-2xl p-5 border border-orange-50 dark:border-gray-800 '>
                  <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white px-2">
                      {t('admin.users.details.courses.title')}
                  </h2>


                  <div className="flex flex-col gap-4">


                      {filteredCourses.map(course => (
                          <UserCourseCard key={course.id} course={course} />
                      ))}
                      {filteredCourses.length === 0 && (
                          <div className="text-center py-10 text-gray-400 bg-[#ffffff] dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200">
                              No courses found matching your criteria
                          </div>
                      )}
                  </div>
     </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;