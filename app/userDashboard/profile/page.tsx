'use client';

import { useEffect } from 'react';
import UserInfo from '../../components/profile/UserInfo';
import Stats from '../../components/profile/Stats';
import CertificateList from '../../components/profile/CertificateList';
import { Pencil } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';

export default function Profile() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setContext('profile'));
  }, [dispatch]);

  const userData = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phoneNumber ?? '',
    location: user?.role === 'user' ? user.address : '',
    joinDate: user?.joinTime ?? '',
    avatar: user?.avatar ?? '/profile.jpg',
    registeredCourses: 12,
    completedCourses: 8,
    certificates: 5,
    workingHours: 150,
  };

  const certificates = [
    { id: 1, title: 'Advanced Web Development', day: 15, month: 'ديسمبر', year: 2023 },
    { id: 2, title: 'React Mastery', day: 20, month: 'نوفمبر', year: 2023 },
    { id: 3, title: 'UI/UX Design', day: 5, month: 'أكتوبر', year: 2023 },
  ];

  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden mt-26">
      <div className="lg:mr-75">
        <main className="p-3 sm:p-4 lg:p-3">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="text-right">
              <h1 className="font-cairo font-bold text-xl sm:text-2xl text-[#113555]">
                الملف الشخصي
              </h1>
              <p className="font-cairo text-sm text-gray-600 mt-1">
                عرض و إدارة معلوماتك الشخصية
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = '/userDashboard/settings';
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-sm hover:bg-[#E55A00] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span className="hidden sm:inline">تعديل الملف</span>
              <span className="sm:hidden">تعديل</span>
            </button>
          </div>

          <div className="space-y-6 sm:space-y-6">
            <UserInfo
              name={userData.name}
              email={userData.email}
              phone={userData.phone}
              location={userData.location}
              joinDate={userData.joinDate}
              avatar={userData.avatar}
            />

            <Stats
              registeredCourses={userData.registeredCourses}
              completedCourses={userData.completedCourses}
              certificates={userData.certificates}
              workingHours={userData.workingHours}
            />

            <CertificateList certificates={certificates} />
          </div>
        </main>
      </div>
     </div>
     )
    }
      
