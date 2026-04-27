'use client';

import { useState } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import DashboardInput from '@/app/components/ui/DashboardInput';
import {
  PasswordRulesChecklist,
  PasswordStrengthBar,
} from '@/app/components/auth/AuthUi';

interface SecuritySectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  errors?: Partial<Record<'currentPassword' | 'newPassword' | 'confirmPassword', string>>;
  touched?: Partial<Record<'currentPassword' | 'newPassword' | 'confirmPassword', boolean>>;
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
  errors = {},
  touched = {},
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
  onCancel
}: SecuritySectionProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-right pb-4">
        <h3 className="font-cairo font-bold text-lg text-[#113555]">
          الأمان و كلمة المرور
        </h3>
      </div>

      <div className="space-y-6">
        <DashboardInput
          id="current-password"
          type={showCurrent ? 'text' : 'password'}
          className='2xl:w-135'
          label="كلمة المرور الحالية"
          value={currentPassword}
          onChange={(e) => onCurrentPasswordChange(e.target.value)}
          error={touched.currentPassword ? errors.currentPassword : undefined}
          leftIcon={
            <button
              type="button"
              onClick={() => setShowCurrent((c) => !c)}
              className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
              aria-label={showCurrent ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            >
              {showCurrent ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <DashboardInput
              id="new-password"
              type={showNew ? 'text' : 'password'}
              label="كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              error={touched.newPassword ? errors.newPassword : undefined}
              helperText="8 أحرف على الأقل، حرف كبير، صغير، رقم، ورمز"
              leftIcon={
                <button
                  type="button"
                  onClick={() => setShowNew((c) => !c)}
                  className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
                  aria-label={showNew ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showNew ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
            {newPassword ? (
              <>
                <PasswordStrengthBar password={newPassword} />
                <PasswordRulesChecklist password={newPassword} />
              </>
            ) : null}
          </div>

          <DashboardInput
            id="confirm-password"
            type={showConfirm ? 'text' : 'password'}
            label="تاكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowConfirm((c) => !c)}
                className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
                aria-label={showConfirm ? 'إخفاء تأكيد كلمة المرور' : 'إظهار تأكيد كلمة المرور'}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
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
          <Check className="w-5 h-5" />
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}

