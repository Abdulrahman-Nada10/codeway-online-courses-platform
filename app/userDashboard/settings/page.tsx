'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { useAppDispatch } from '@/app/store/hooks';
import { setContext } from '@/app/store/searchSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  email,
  getPasswordStrength,
  match,
  required,
  validatePasswordStrength,
} from '@/app/libs/validation';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import PaymentsSection from './components/PaymentsSection';
import SettingsTabs from './components/SettingsTabs';
import type { SettingsTab } from './components/SettingsTabs';
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

type ProfileErrors = Partial<Record<keyof UserFormState, string>>;
type ProfileTouched = Partial<Record<keyof UserFormState, boolean>>;

type SecurityErrors = Partial<Record<'currentPassword' | 'newPassword' | 'confirmPassword', string>>;
type SecurityTouched = Partial<Record<'currentPassword' | 'newPassword' | 'confirmPassword', boolean>>;

type PaymentsErrors = Partial<Record<'accountHolderName' | 'bankName' | 'iban' | 'swiftCode', string>>;
type PaymentsTouched = Partial<Record<'accountHolderName' | 'bankName' | 'iban' | 'swiftCode', boolean>>;

export default function Settings() {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const { user, updateProfile } = useAuth();
  const dispatch = useAppDispatch();
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
    dispatch(setContext(null));
  }, [dispatch]);

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

  /* ─── Errors & Touched ─── */
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [profileTouched, setProfileTouched] = useState<ProfileTouched>({});

  const [securityErrors, setSecurityErrors] = useState<SecurityErrors>({});
  const [securityTouched, setSecurityTouched] = useState<SecurityTouched>({});

  const [paymentsErrors, setPaymentsErrors] = useState<PaymentsErrors>({});
  const [paymentsTouched, setPaymentsTouched] = useState<PaymentsTouched>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error(t('validation.fileSizeError'));
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('validation.fileFormatError'));
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
    if (profileErrors[name as keyof UserFormState]) {
      setProfileErrors((current) => {
        const next = { ...current };
        delete next[name as keyof UserFormState];
        return next;
      });
    }
  };

  const validateProfile = (): ProfileErrors => {
    const errors: ProfileErrors = {};
    const nameError = required(userData.fullName, t('validation.fullNameRequired'));
    if (nameError) errors.fullName = nameError;

    const emailError = email(userData.email);
    if (emailError) errors.email = emailError;

    const phoneError = required(userData.phone, t('validation.phoneRequired'));
    if (phoneError) errors.phone = phoneError;

    const addressError = required(userData.address, t('validation.addressRequired'));
    if (addressError) errors.address = addressError;

    return errors;
  };

  const handleProfileSave = async () => {
    const errors = validateProfile();
    setProfileErrors(errors);
    setProfileTouched({ fullName: true, email: true, phone: true, address: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await updateProfile({
        name: userData.fullName.trim(),
        email: userData.email.trim(),
        phoneNumber: userData.phone.trim(),
        address: userData.address.trim(),
        avatar: previewUrl,
      });

      toast.success(t('dashboard.profileSaved'));
    } catch (saveError) {
      toast.error(
        saveError instanceof Error
          ? saveError.message
          : t('dashboard.profileSaveError')
      );
    }
  };

  const handleProfileCancel = () => {
    setUserData(getDefaultUserData(authUser));
    setPreviewUrl(authUser?.avatar ?? '/profile.jpg');
    setSelectedFile(null);
    setProfileErrors({});
    setProfileTouched({});
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
    toast.success(t('dashboard.profileSaved'));
  };

  const handleNotificationCancel = () => {
    setNotificationSettings({
      emailNotifications: true,
      newCourses: true,
      studyReminders: false,
      offersAndDiscounts: true,
    });
  };

  const validateSecurity = (): SecurityErrors => {
    const errors: SecurityErrors = {};

    const currentError = required(currentPassword, t('validation.currentPasswordRequired'));
    if (currentError) errors.currentPassword = currentError;

    const newError = validatePasswordStrength(newPassword);
    if (newError) errors.newPassword = newError;

    const confirmError = match(newPassword, confirmPassword, t('validation.passwordMismatch'));
    if (confirmError && confirmPassword) errors.confirmPassword = confirmError;

    return errors;
  };

  const handlePasswordSave = () => {
    const errors = validateSecurity();
    setSecurityErrors(errors);
    setSecurityTouched({ currentPassword: true, newPassword: true, confirmPassword: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (getPasswordStrength(newPassword) === 'weak') {
      setSecurityErrors((current) => ({
        ...current,
        newPassword: t('auth.enterStrongerPassword'),
      }));
      return;
    }

    toast.success(t('dashboard.passwordChanged'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSecurityErrors({});
    setSecurityTouched({});
  };

  const handlePasswordCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSecurityErrors({});
    setSecurityTouched({});
  };

  const validatePayments = (): PaymentsErrors => {
    const errors: PaymentsErrors = {};

    const holderError = required(bankData.accountHolderName, t('validation.accountHolderRequired'));
    if (holderError) errors.accountHolderName = holderError;

    const bankError = required(bankData.bankName, t('validation.bankNameRequired'));
    if (bankError) errors.bankName = bankError;

    const ibanError = required(bankData.iban, t('validation.ibanRequired'));
    if (ibanError) errors.iban = ibanError;

    const swiftError = required(bankData.swiftCode, t('validation.swiftRequired'));
    if (swiftError) errors.swiftCode = swiftError;

    return errors;
  };

  const handleBankDataChange = (field: string, value: string) => {
    setBankData((current) => ({ ...current, [field]: value }));
    if (paymentsErrors[field as keyof PaymentsErrors]) {
      setPaymentsErrors((current) => {
        const next = { ...current };
        delete next[field as keyof PaymentsErrors];
        return next;
      });
    }
  };

  const handlePaymentsSave = () => {
    const errors = validatePayments();
    setPaymentsErrors(errors);
    setPaymentsTouched({
      accountHolderName: true,
      bankName: true,
      iban: true,
      swiftCode: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    toast.success(t('dashboard.paymentSaved'));
  };

  const handlePaymentsCancel = () => {
    setBankData({
      accountHolderName: '',
      bankName: '',
      iban: '',
      swiftCode: '',
    });
    setPaymentsErrors({});
    setPaymentsTouched({});
  };

  return (
    <div className="mt-26 min-h-screen overflow-x-hidden bg-[#FFF3EB] dark:bg-slate-950" dir={dir}>
      <div className="rtl:lg:mr-75 ltr:lg:ml-75">
        <main className="p-2 sm:p-3 lg:p-4 xl:p-6">
          <div className="mb-3 text-start sm:mb-4 lg:mb-6">
            <h1 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100 sm:text-xl lg:text-2xl">
              {t('dashboard.settings')}
            </h1>
            <p className="mt-1 font-cairo text-xs text-gray-600 dark:text-slate-400 sm:text-sm">
              {t('dashboard.settingsSubtitle')}
            </p>
          </div>

          <div className="mb-4 rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900 sm:mb-6 sm:p-4 lg:p-6">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="mb-50 rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900 sm:p-4 lg:p-6">
            <div className="mt-2 sm:mt-4">
              {activeTab === 'profile' && (
                <ProfileSection
                  previewUrl={previewUrl}
                  selectedFile={selectedFile}
                  userData={userData}
                  errors={profileErrors}
                  touched={profileTouched}
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
                  errors={securityErrors}
                  touched={securityTouched}
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
                  errors={paymentsErrors}
                  touched={paymentsTouched}
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

