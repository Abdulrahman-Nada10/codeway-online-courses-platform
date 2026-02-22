'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Save } from 'lucide-react';

interface ProfileSectionProps {
  previewUrl: string;
  selectedFile: File | null;
  userData: {
    fullName: string;
    email: string;
    phone: string;
    specialty: string;
    bio: string;
  };
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileSection({
  previewUrl,
  userData,
  onFileChange,
  onInputChange,
  onSave,
  onCancel
}: ProfileSectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-right pb-4">
        <h3 className="font-cairo font-bold text-lg text-[#113555]">
          المعلومات الأساسية
        </h3>
      </div>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-row items-center gap-4 w-full justify-start">
          <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[#FF6400] p-1 bg-white">
            <Image
              src={previewUrl}
              alt="الصورة الشخصية"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors">
              <Camera className="w-4 h-4" />
              تغيير الصورة
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 font-cairo text-left">
              صيغة الملف: jpg, png, gif
              <br />
              حجم الملف: أقصى حجم 2MB
            </p>
          </div>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="fullName" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              الاسم الكامل
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              رقم التليفون
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="specialty" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              التخصص
            </label>
            <input
              id="specialty"
              type="text"
              name="specialty"
              value={userData.specialty}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="bio" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
            نبذة تعريفية
          </label>
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={onInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors w-full sm:w-auto"
        >
          الغاء
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-sm hover:bg-[#E55A00] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}
