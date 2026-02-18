'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProfileSectionProps {
  previewUrl: string;
  selectedFile: File | null;
  userData: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M15.001 11.0752C15.1562 11.0748 15.2646 11.122 15.3594 11.2168C15.4539 11.3114 15.5006 11.4187 15.5 11.5723V13.5752C15.5 13.9915 15.3579 14.3359 15.0596 14.6348C14.7616 14.9332 14.4176 15.0756 14.001 15.0752H2C1.58357 15.0752 1.23961 14.9329 0.941406 14.6348C0.680428 14.3738 0.538574 14.0773 0.506836 13.7275L0.5 13.5742V11.5752C0.5 11.4181 0.547418 11.3097 0.640625 11.2168C0.734785 11.123 0.844047 11.0756 1.00098 11.0752C1.15619 11.0748 1.26463 11.122 1.35938 11.2168C1.45393 11.3114 1.50065 11.4187 1.5 11.5723V14.0752H14.5V11.5752C14.5 11.4181 14.5474 11.3097 14.6406 11.2168C14.7348 11.123 14.844 11.0756 15.001 11.0752ZM8.00293 0.5C8.08092 0.499656 8.1464 0.511516 8.20312 0.532227C8.2442 0.547249 8.29299 0.575989 8.34863 0.630859L11.9463 4.22852C12.0553 4.33751 12.0914 4.43987 12.0879 4.55957C12.0837 4.70086 12.0367 4.81733 11.9365 4.92871C11.8262 5.03565 11.7121 5.08347 11.5723 5.08789C11.4406 5.09204 11.3351 5.05292 11.2285 4.94629L8.5 2.21777V10.5752C8.49996 10.7322 8.45215 10.8408 8.3584 10.9346C8.26469 11.0282 8.15667 11.0756 8.00098 11.0752C7.84403 11.0748 7.73479 11.0265 7.64062 10.9326C7.54763 10.8398 7.50004 10.7321 7.5 10.5752V2.21777L4.77148 4.94629C4.66565 5.05213 4.56023 5.09171 4.42773 5.08789C4.28793 5.08382 4.17222 5.03677 4.06055 4.92773C3.9622 4.81691 3.9167 4.69972 3.91211 4.55859C3.90829 4.43989 3.94365 4.33833 4.05273 4.22949L7.65332 0.628906C7.70819 0.57404 7.75489 0.547326 7.79199 0.53418C7.85188 0.512971 7.92133 0.500408 8.00293 0.5Z" fill="black"/>
              </svg>
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
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              العنوان
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={userData.address}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>
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
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path d="M13.793 0.5L17.5 4.20703V16C17.5 16.4163 17.3579 16.7606 17.0596 17.0596C16.7616 17.358 16.4176 17.5004 16.001 17.5H2C1.58354 17.5 1.23963 17.3578 0.941406 17.0596C0.680392 16.7986 0.538542 16.5021 0.506836 16.1523L0.5 15.999V2C0.5 1.58381 0.642609 1.2397 0.941406 0.941406C1.20313 0.68025 1.49936 0.538592 1.84766 0.506836L2.00098 0.5H13.793ZM9 9.5C9.70224 9.5 10.283 9.74002 10.7715 10.2285C11.26 10.717 11.5 11.2978 11.5 12C11.5 12.7022 11.26 13.283 10.7715 13.7715C10.283 14.26 9.70224 14.5 9 14.5C8.29776 14.5 7.71702 14.26 7.22852 13.7715C6.74002 13.283 6.5 12.7022 6.5 12C6.5 11.2978 6.74002 10.717 7.22852 10.2285C7.71702 9.74002 8.29776 9.5 9 9.5ZM11.5 3.5V6.5H3.5V3.5H11.5ZM16.5 4.64258L13.3574 1.5H1.5V16.5H16.5V4.64258Z" fill="white"/>
          </svg>
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}

