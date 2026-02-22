'use client';

import { useState } from 'react';
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import SettingsTabs, { SettingsTab } from './components/SettingsTabs';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import PaymentsSection from './components/PaymentsSection';

export default function InstructorSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Profile state
  const [previewUrl, setPreviewUrl] = useState('/profile.jpg');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState({
    fullName: 'م. محمد أحمد',
    email: 'mohamedahmed@gmail.com',
    phone: '0101234568',
    specialty: 'البرمجة وتطوير البرمجيات',
    bio: 'مدرب متخصص في مجال البرمجة وتطوير البرمجيات. خبرة أكثر من 10 سنوات في التدريس والتطوير.'
  });

  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    studentMessages: true,
    courseUpdates: false,
    newEnrollments: true
  });

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Payments state
  const [bankData, setBankData] = useState({
    accountHolderName: 'محمد محمود',
    bankName: 'البنك الاهلي المصري',
    iban: '0000 0000 0000 0000',
    swiftCode: '000'
  });

  // Profile handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    console.log('Saving profile:', userData);
    // Add your save logic here
  };

  const handleProfileCancel = () => {
    console.log('Canceling profile changes');
    // Reset to original values
  };

  // Notifications handlers
  const handleNotificationToggle = (key: 'emailNotifications' | 'studentMessages' | 'courseUpdates' | 'newEnrollments') => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotificationsSave = () => {
    console.log('Saving notifications:', notificationSettings);
    // Add your save logic here
  };

  const handleNotificationsCancel = () => {
    console.log('Canceling notifications changes');
    // Reset to original values
  };

  // Security handlers
  const handleSecuritySave = () => {
    console.log('Changing password');
    // Add your password change logic here
  };

  const handleSecurityCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Payments handlers
  const handleBankDataChange = (field: string, value: string) => {
    setBankData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentsSave = () => {
    console.log('Saving bank data:', bankData);
    // Add your save logic here
  };

  const handlePaymentsCancel = () => {
    console.log('Canceling payments changes');
    // Reset to original values
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            previewUrl={previewUrl}
            selectedFile={selectedFile}
            userData={userData}
            onFileChange={handleFileChange}
            onInputChange={handleInputChange}
            onSave={handleProfileSave}
            onCancel={handleProfileCancel}
          />
        );
      case 'notifications':
        return (
          <NotificationsSection
            notificationSettings={notificationSettings}
            onToggle={handleNotificationToggle}
            onSave={handleNotificationsSave}
            onCancel={handleNotificationsCancel}
          />
        );
      case 'security':
        return (
          <SecuritySection
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSave={handleSecuritySave}
            onCancel={handleSecurityCancel}
          />
        );
      case 'payments':
        return (
          <PaymentsSection
            bankData={bankData}
            onBankDataChange={handleBankDataChange}
            onSave={handlePaymentsSave}
            onCancel={handlePaymentsCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-[#FCF9F4] flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-cairo font-bold text-[#113555] mb-2">الإعدادات</h1>
            <p className="text-sm font-cairo text-gray-500">إدارة حسابك وتفضيلاتك</p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
