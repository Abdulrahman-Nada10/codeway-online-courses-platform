'use client';

import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardInput from '@/app/components/ui/DashboardInput';

interface PaymentsSectionProps {
  bankData: {
    accountHolderName: string;
    bankName: string;
    iban: string;
    swiftCode: string;
  };
  errors?: Partial<Record<'accountHolderName' | 'bankName' | 'iban' | 'swiftCode', string>>;
  touched?: Partial<Record<'accountHolderName' | 'bankName' | 'iban' | 'swiftCode', boolean>>;
  onBankDataChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PaymentsSection({
  bankData,
  errors = {},
  touched = {},
  onBankDataChange,
  onSave,
  onCancel
}: PaymentsSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="pb-4 text-start">
        <h3 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100">
          {t('dashboard.paymentSettings')}
        </h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DashboardInput
            id="accountHolderName"
            type="text"
            label={t('dashboard.accountHolderName')}
            value={bankData.accountHolderName}
            onChange={(e) => onBankDataChange('accountHolderName', e.target.value)}
            error={touched.accountHolderName ? errors.accountHolderName : undefined}
          />

          <DashboardInput
            id="bankName"
            type="text"
            label={t('dashboard.bankName')}
            value={bankData.bankName}
            onChange={(e) => onBankDataChange('bankName', e.target.value)}
            error={touched.bankName ? errors.bankName : undefined}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DashboardInput
            id="iban"
            type="text"
            label={t('dashboard.iban')}
            value={bankData.iban}
            onChange={(e) => onBankDataChange('iban', e.target.value)}
            error={touched.iban ? errors.iban : undefined}
          />

          <DashboardInput
            id="swiftCode"
            type="text"
            label={t('dashboard.swiftCode')}
            value={bankData.swiftCode}
            onChange={(e) => onBankDataChange('swiftCode', e.target.value)}
            error={touched.swiftCode ? errors.swiftCode : undefined}
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

