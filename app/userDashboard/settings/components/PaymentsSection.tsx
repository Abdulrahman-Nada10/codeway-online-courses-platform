'use client';

import { Check } from 'lucide-react';

interface PaymentsSectionProps {
  bankData: {
    accountHolderName: string;
    bankName: string;
    iban: string;
    swiftCode: string;
  };
  onBankDataChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PaymentsSection({
  bankData,
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
          <div>
            <label htmlFor="accountHolderName" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              اسم صاحب الحساب
            </label>
            <input
              id="accountHolderName"
              type="text"
              value={bankData.accountHolderName}
              onChange={(e) => onBankDataChange('accountHolderName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>

          <div>
            <label htmlFor="bankName" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              اسم البنك
            </label>
            <input
              id="bankName"
              type="text"
              value={bankData.bankName}
              onChange={(e) => onBankDataChange('bankName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="iban" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              رقم IBAN
            </label>
            <input
              id="iban"
              type="text"
              value={bankData.iban}
              onChange={(e) => onBankDataChange('iban', e.target.value)}
              className="w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border border-transparent focus:border-[#FF6400] focus:outline-none transition-colors input-shadow"
            />
          </div>

          <div>
            <label htmlFor="swiftCode" className="block font-cairo font-medium text-sm text-[#113555] mb-2">
              رمز SWIFT
            </label>
            <input
              id="swiftCode"
              type="text"
              value={bankData.swiftCode}
              onChange={(e) => onBankDataChange('swiftCode', e.target.value)}
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

