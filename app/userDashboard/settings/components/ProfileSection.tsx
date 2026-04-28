'use client';

import Image from 'next/image';
import { Camera, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardInput from '@/app/components/ui/DashboardInput';

interface ProfileSectionProps {
  previewUrl: string;
  selectedFile: File | null;
  userData: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  errors?: Partial<Record<keyof ProfileSectionProps['userData'], string>>;
  touched?: Partial<Record<keyof ProfileSectionProps['userData'], boolean>>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileSection({
  previewUrl,
  userData,
  errors = {},
  touched = {},
  onFileChange,
  onInputChange,
  onSave,
  onCancel
}: ProfileSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="pb-4 text-start">
        <h3 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100">
          {t('dashboard.basicInfo')}
        </h3>
      </div>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-row items-center gap-4 w-full justify-start">
          <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[#FF6400] p-1 bg-white">
            <Image
              src={previewUrl}
              alt={t('common.profileImage')}
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors">
              <Camera className="w-4 h-4" />
              {t('dashboard.changeImage')}
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
            <p className="text-start font-cairo text-xs text-gray-500 dark:text-slate-400">
              {t('dashboard.imageFormat')}
              <br />
              {t('dashboard.imageSize')}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <DashboardInput
            id="fullName"
            name="fullName"
            type="text"
            label={t('auth.fullName')}
            value={userData.fullName}
            onChange={onInputChange}
            error={touched.fullName ? errors.fullName : undefined}
          />

          <DashboardInput
            id="email"
            name="email"
            type="email"
            label={t('auth.email')}
            value={userData.email}
            onChange={onInputChange}
            error={touched.email ? errors.email : undefined}
          />

          <DashboardInput
            id="phone"
            name="phone"
            type="tel"
            label={t('dashboard.phone')}
            value={userData.phone}
            onChange={onInputChange}
            error={touched.phone ? errors.phone : undefined}
          />

          <DashboardInput
            id="address"
            name="address"
            type="text"
            label={t('dashboard.address')}
            value={userData.address}
            onChange={onInputChange}
            error={touched.address ? errors.address : undefined}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors w-full sm:w-auto"
        >
          {t('common.cancel')}
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-sm hover:bg-[#E55A00] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {t('common.saveChanges')}
        </button>
      </div>
    </div>
  );
}

