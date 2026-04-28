'use client';

import { useState } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="pb-4 text-start">
        <h3 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100">
          {t('dashboard.securityAndPassword')}
        </h3>
      </div>

      <div className="space-y-6">
        <DashboardInput
          id="current-password"
          type={showCurrent ? 'text' : 'password'}
          className='2xl:w-135'
          label={t('dashboard.currentPassword')}
          value={currentPassword}
          onChange={(e) => onCurrentPasswordChange(e.target.value)}
          error={touched.currentPassword ? errors.currentPassword : undefined}
          leftIcon={
            <button
              type="button"
              onClick={() => setShowCurrent((c) => !c)}
              className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
              aria-label={showCurrent ? t('auth.hidePassword') : t('auth.showPassword')}
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
              label={t('auth.newPassword')}
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              error={touched.newPassword ? errors.newPassword : undefined}
              helperText={t('auth.passwordHint')}
              leftIcon={
                <button
                  type="button"
                  onClick={() => setShowNew((c) => !c)}
                  className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
                  aria-label={showNew ? t('auth.hidePassword') : t('auth.showPassword')}
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
            label={t('auth.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowConfirm((c) => !c)}
                className="text-[#B6BCC5] hover:text-[#113555] transition-colors"
                aria-label={showConfirm ? t('auth.hideConfirmPassword') : t('auth.showConfirmPassword')}
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

