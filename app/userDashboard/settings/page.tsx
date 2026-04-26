'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import PaymentsSection from './components/PaymentsSection';
import SettingsTabs, { SettingsTab } from './components/SettingsTabs';
import { User } from '@/types/auth';

type UserFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function getDefaultUserData(user: User | null): UserFormState {
  return {
    fullName: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phoneNumber ?? '',
    address: user?.address ?? '',
  };
}

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const authUser = user?.role === 'user' ? user : null;
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(authUser?.avatar ?? '/profile.jpg');
  const [userData, setUserData] = useState<UserFormState>(() => getDefaultUserData(authUser));

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newCourses: true,
    studyReminders: false,
    offersAndDiscounts: true,
  });

  useEffect(() => {
    setUserData(getDefaultUserData(authUser));
    setPreviewUrl(authUser?.avatar ?? '/profile.jpg');
    setSelectedFile(null);
  }, [authUser]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [bankData, setBankData] = useState({
    accountHolderName: '',
    bankName: '',
    iban: '',
    swiftCode: '',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الملف يجب ألا يتجاوز 2 ميجابايت');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('صيغة الملف يجب أن تكون jpg أو png أو gif');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(file);
      setPreviewUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile({
        name: userData.fullName.trim(),
        email: userData.email.trim(),
        phoneNumber: userData.phone.trim(),
        address: userData.address.trim(),
        avatar: previewUrl,
      });

      alert('تم حفظ التغييرات بنجاح');
    } catch (saveError) {
      alert(
        saveError instanceof Error
          ? saveError.message
          : 'تعذر حفظ التغييرات.'
      );
    }
  };

  const handleProfileCancel = () => {
    setUserData(getDefaultUserData(authUser));
    setPreviewUrl(authUser?.avatar ?? '/profile.jpg');
    setSelectedFile(null);
  };

  const handleNotificationToggle = (
    key: 'emailNotifications' | 'newCourses' | 'studyReminders' | 'offersAndDiscounts'
  ) => {
    setNotificationSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleNotificationSave = () => {
    console.log('Saving notification settings:', notificationSettings);
    alert('تم حفظ التغييرات بنجاح');
  };

  const handleNotificationCancel = () => {
    setNotificationSettings({
      emailNotifications: true,
      newCourses: true,
      studyReminders: false,
      offersAndDiscounts: true,
    });
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }

    if (newPassword.length < 6) {
      alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    console.log('Saving password:', { currentPassword, newPassword });
    alert('تم تغيير كلمة المرور بنجاح');
  };

  const handlePasswordCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleBankDataChange = (field: string, value: string) => {
    setBankData((current) => ({ ...current, [field]: value }));
  };

  const handlePaymentsSave = () => {
    console.log('Saving bank data:', bankData);
    alert('تم حفظ البيانات البنكية بنجاح');
  };

  const handlePaymentsCancel = () => {
    setBankData({
      accountHolderName: '',
      bankName: '',
      iban: '',
      swiftCode: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden mt-26">
      <div className="lg:mr-75">
        <main className="p-2 sm:p-3 lg:p-4 xl:p-6">
          <div className="text-right mb-3 sm:mb-4 lg:mb-6">
            <h1 className="font-cairo font-bold text-lg sm:text-xl lg:text-2xl text-[#113555]">
              الإعدادات
            </h1>
            <p className="font-cairo text-xs sm:text-sm text-gray-600 mt-1">
              إدارة حسابك وتفضيلاتك
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm  mb-4 sm:mb-6">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm mb-50">
            <div className="mt-2 sm:mt-4">
              {activeTab === 'profile' && (
                <ProfileSection
                  previewUrl={previewUrl}
                  selectedFile={selectedFile}
                  userData={userData}
                  onFileChange={handleFileChange}
                  onInputChange={handleInputChange}
                  onSave={handleProfileSave}
                  onCancel={handleProfileCancel}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationsSection
                  notificationSettings={notificationSettings}
                  onToggle={handleNotificationToggle}
                  onSave={handleNotificationSave}
                  onCancel={handleNotificationCancel}
                />
              )}

              {activeTab === 'security' && (
                <SecuritySection
                  currentPassword={currentPassword}
                  newPassword={newPassword}
                  confirmPassword={confirmPassword}
                  onCurrentPasswordChange={setCurrentPassword}
                  onNewPasswordChange={setNewPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                  onSave={handlePasswordSave}
                  onCancel={handlePasswordCancel}
                />
              )}

              {activeTab === 'payments' && (
                <PaymentsSection
                  bankData={bankData}
                  onBankDataChange={handleBankDataChange}
                  onSave={handlePaymentsSave}
                  onCancel={handlePaymentsCancel}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
