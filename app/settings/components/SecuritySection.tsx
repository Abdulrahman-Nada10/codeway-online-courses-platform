'use client';

import { Check } from 'lucide-react';

interface SecuritySectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function SecuritySection({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
  onCancel
}: SecuritySectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-right pb-4">
        <h3 className="font-cairo font-bold text-lg text-[#113555]">
          الأمان و كلمة المرور
        </h3>
      </div>

      <div className="space-y-6 xl:space-x-142 sm:space-x-89">
        <div>
          <label htmlFor="current-password" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
            كلمة المرور الحالية
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="new-password" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              كلمة المرور الجديدة
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              تاكيد كلمة المرور
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
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
          <Check className="w-5 h-5" />
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}

