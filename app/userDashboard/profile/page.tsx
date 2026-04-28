'use client';

import { useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CertificateList from '../../components/profile/CertificateList';
import Stats from '../../components/profile/Stats';
import UserInfo from '../../components/profile/UserInfo';
import { useAuth } from '../../hooks/useAuth';
import { useLocaleDirection } from '../../hooks/useLocaleDirection';
import { useAppDispatch } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';
import { getUserCertificates } from '../certificates/data';

export default function Profile() {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
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

  const certificates = getUserCertificates(t).slice(0, 3).map((certificate) => ({
    id: certificate.id,
    title: certificate.title,
    dateLabel: certificate.issueDate,
  }));

  return (
    <div className="mt-26 min-h-screen overflow-x-hidden bg-[#FFF3EB] dark:bg-slate-950" dir={dir}>
      <div className="rtl:lg:mr-75 ltr:lg:ml-75">
        <main className="p-3 sm:p-4 lg:p-3">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-start">
              <h1 className="font-cairo text-xl font-bold text-[#113555] dark:text-slate-100 sm:text-2xl">
                {t('dashboard.profile')}
              </h1>
              <p className="mt-1 font-cairo text-sm text-gray-600 dark:text-slate-400">
                {t('dashboard.profileSubtitle')}
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = '/userDashboard/settings';
              }}
              className="flex items-center gap-2 rounded-xl bg-[#FF6400] px-3 py-2 font-cairo text-sm font-medium text-white transition-colors hover:bg-[#E55A00] sm:px-4"
            >
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">{t('common.editProfile')}</span>
              <span className="sm:hidden">{t('common.edit')}</span>
            </button>
          </div>

          <div className="space-y-6">
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
  );
}
