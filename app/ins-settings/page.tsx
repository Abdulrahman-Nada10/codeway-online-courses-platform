'use client';

import { useEffect, useState } from 'react';
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import SettingsTabs, { SettingsTab } from './components/SettingsTabs';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import PaymentsSection from './components/PaymentsSection';
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { Instructor } from '@/types/auth';

type InstructorFormState = {
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  bio: string;
};

function getDefaultInstructorData(user: Instructor | null): InstructorFormState {
  return {
    fullName: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phoneNumber ?? '',
    specialty: user?.field ?? '',
    bio: 'مدرب متخصص في مجال البرمجة وتطوير البرمجيات. خبرة أكثر من 10 سنوات في التدريس والتطوير.',
  };
}

export default function InstructorSettingsPage() {
  const { user, updateProfile } = useAuth();
  const authUser = user?.role === 'instructor' ? user : null;

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [previewUrl, setPreviewUrl] = useState(authUser?.avatar ?? '/profile.jpg');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<InstructorFormState>(() =>
    getDefaultInstructorData(authUser)
  );

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    studentMessages: true,
    courseUpdates: false,
    newEnrollments: true
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [bankData, setBankData] = useState({
    accountHolderName: authUser?.name ?? '',
    bankName: 'البنك الاهلي المصري',
    iban: '0000 0000 0000 0000',
    swiftCode: '000'
  });

  useEffect(() => {
    setUserData(getDefaultInstructorData(authUser));
    setPreviewUrl(authUser?.avatar ?? '/profile.jpg');
    setSelectedFile(null);
    setBankData((current) => ({
      ...current,
      accountHolderName: authUser?.name ?? current.accountHolderName,
    }));
  }, [authUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(file);
      setPreviewUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUserData((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile({
        name: userData.fullName.trim(),
        email: userData.email.trim(),
        phoneNumber: userData.phone.trim(),
        field: userData.specialty.trim(),
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
    setUserData(getDefaultInstructorData(authUser));
    setPreviewUrl(authUser?.avatar ?? '/profile.jpg');
    setSelectedFile(null);
  };

  const handleNotificationToggle = (key: 'emailNotifications' | 'studentMessages' | 'courseUpdates' | 'newEnrollments') => {
    setNotificationSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleNotificationsSave = () => {
    console.log('Saving notifications:', notificationSettings);
  };

  const handleNotificationsCancel = () => {
    console.log('Canceling notifications changes');
  };

  const handleSecuritySave = () => {
    console.log('Changing password');
  };

  const handleSecurityCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleBankDataChange = (field: string, value: string) => {
    setBankData((current) => ({ ...current, [field]: value }));
  };

  const handlePaymentsSave = () => {
    console.log('Saving bank data:', bankData);
  };

  const handlePaymentsCancel = () => {
    console.log('Canceling payments changes');
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
    <ProtectedRoute allowedRoles={["instructor"]}>
      <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-[#FCF9F4] flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-cairo font-bold text-[#113555] mb-2">الإعدادات</h1>
            <p className="text-sm font-cairo text-gray-500">إدارة حسابك وتفضيلاتك</p>
          </div>

          <div className="mb-6">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
      </>
    </ProtectedRoute>
  );
}
