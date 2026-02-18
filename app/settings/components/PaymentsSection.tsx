'use client';

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
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path d="M13.793 0.5L17.5 4.20703V16C17.5 16.4163 17.3579 16.7606 17.0596 17.0596C16.7616 17.358 16.4176 17.5004 16.001 17.5H2C1.58354 17.5 1.23963 17.3578 0.941406 17.0596C0.680392 16.7986 0.538542 16.5021 0.506836 16.1523L0.5 15.999V2C0.5 1.58381 0.642609 1.2397 0.941406 0.941406C1.20313 0.68025 1.49936 0.538592 1.84766 0.506836L2.00098 0.5H13.793ZM9 9.5C9.70224 9.5 10.283 9.74002 10.7715 10.2285C11.26 10.717 11.5 11.2978 11.5 12C11.5 12.7022 11.26 13.283 10.7715 13.7715C10.283 14.26 9.70224 14.5 9 14.5C8.29776 14.5 7.71702 14.26 7.22852 13.7715C6.74002 13.283 6.5 12.7022 6.5 12C6.5 11.2978 6.74002 10.717 7.22852 10.2285C7.71702 9.74002 8.29776 9.5 9 9.5ZM11.5 3.5V6.5H3.5V3.5H11.5ZM16.5 4.64258L13.3574 1.5H1.5V16.5H16.5V4.64258Z" fill="white"/>
          </svg>
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}

