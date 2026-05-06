import React from 'react';
import { CreditCard } from 'lucide-react';

export default function Dues() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-6">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr style={{ backgroundColor: '#FFEFE6' }}>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right first:rounded-r-[2rem]">رقم الدفعة</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right">المدرب</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right">عدد الدورات</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right">المبلغ</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right">الفترة</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-right">الحالة</th>
            <th className="p-5 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, i) => {

            const isApproved = i >= 6; 
            
            return (
              <tr key={i} className="hover:bg-[#FFF9F6] transition-colors group">
             
               <td className="p-5 text-[11px] font-bold text-gray-500 border-b border-orange-500 uppercase">PAY-001</td>
               <td className="p-5 text-[12px] font-black text-gray-800 border-b border-orange-500">محمد محمود</td>
               <td className="p-5 text-[12px] font-bold text-gray-600 border-b border-orange-500 text-center">5</td>
               <td className="p-5 text-[12px] font-black text-gray-800 border-b border-orange-500">3,500 ج.م</td>
               <td className="p-5 text-[11px] font-bold text-gray-400 border-b border-orange-500">ديسمبر 2025</td>
               <td className="p-5 border-b border-orange-500">
                  {isApproved ? (
                    <span className="bg-[#00AC4F] text-white text-[10px] px-6 py-2 rounded-lg font-black block w-fit">معتمد</span>
                  ) : (
                    <span className="bg-[#FF6B00] text-white text-[10px] px-4 py-2 rounded-lg font-black block w-fit shadow-sm shadow-orange-100">قيد المراجعة</span>
                  )}
                </td>
              <td className="p-5 border-b border-orange-500 text-center">
                  {!isApproved && (
                    <button className="bg-[#FF6B00] text-white text-[11px] px-5 py-2 rounded-lg font-black flex items-center gap-2 mx-auto hover:bg-orange-600 transition-all outline-none focus:outline-none shadow-md shadow-orange-100">
                      دفع
                      <CreditCard size={14} />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}