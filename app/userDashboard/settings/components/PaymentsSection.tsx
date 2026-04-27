'use client';

import { Check } from 'lucide-react';
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
  return (
    <div className="space-y-8">
      <div className="text-right pb-4">
        <h3 className="font-cairo font-bold text-lg text-[#113555]">
          اعدادات حسابك البنكي
        </h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DashboardInput
            id="accountHolderName"
            type="text"
            label="اسم صاحب الحساب"
            value={bankData.accountHolderName}
            onChange={(e) => onBankDataChange('accountHolderName', e.target.value)}
            error={touched.accountHolderName ? errors.accountHolderName : undefined}
          />

          <DashboardInput
            id="bankName"
            type="text"
            label="اسم البنك"
            value={bankData.bankName}
            onChange={(e) => onBankDataChange('bankName', e.target.value)}
            error={touched.bankName ? errors.bankName : undefined}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DashboardInput
            id="iban"
            type="text"
            label="رقم IBAN"
            value={bankData.iban}
            onChange={(e) => onBankDataChange('iban', e.target.value)}
            error={touched.iban ? errors.iban : undefined}
          />

          <DashboardInput
            id="swiftCode"
            type="text"
            label="رمز SWIFT"
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

