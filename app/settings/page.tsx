'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import PaymentsSection from './components/PaymentsSection';
import SettingsTabs, { SettingsTab } from './components/SettingsTabs';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('/profile.jpg');

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newCourses: true,
    studyReminders: false,
    offersAndDiscounts: true,
  });

  const [userData, setUserData] = useState({
    fullName: 'عمر محمد السيد',
    email: 'omar@example.com',
    phone: '+20 100 123 4567',
    address: 'القاهرة، مصر',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [bankData, setBankData] = useState({
    accountHolderName: '',
    bankName: '',
    iban: '',
    swiftCode: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم الملف يجب أن لا يتجاوز 2 ميجابايت');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('صيغة الملف يجب أن تكون jpg أو png أو gif');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    console.log('Saving data:', userData);
    alert('تم حفظ التغييرات بنجاح');
  };

  const handleProfileCancel = () => {
    setUserData({
      fullName: 'عمر محمد السيد',
      email: 'omar@example.com',
      phone: '+20 100 123 4567',
      address: 'القاهرة، مصر',
    });
    setPreviewUrl('/profile.jpg');
    setSelectedFile(null);
  };

  const handleNotificationToggle = (key: 'emailNotifications' | 'newCourses' | 'studyReminders' | 'offersAndDiscounts') => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
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
    setBankData(prev => ({ ...prev, [field]: value }));
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
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden">
      <Sidebar />
      <div className="lg:mr-75">
        <Navbar />
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

          <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm ">
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

