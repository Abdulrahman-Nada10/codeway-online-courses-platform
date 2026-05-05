import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, User, CheckCircle2 } from 'lucide-react';

export default function RefundManagement() {
  const [activeTab, setActiveTab] = useState('refunds'); 

  return (
    <div className="p-4 md:p-8 bg-[#F8F9FB]  text-right" dir="rtl">
      


  


      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        {activeTab === 'refunds' ? (
          <table className="w-full border-separate border-spacing-0">
            <thead className='bg-[#FFE3D0]'>
              <tr style={{ backgroundColor: '#FFEFE6' }}>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right first:rounded-r-[2rem]">رقم الطلب</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">المستخدم</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">الدورة</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">المبلغ</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">السبب</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">التاريخ</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-right">الحالة</th>
                <th className="p-4 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
           {[...Array(9)].map((_, i) => (
  <tr
    key={i}
    className="group transition-colors border-b border-orange-500 hover:bg-orange-50/30"
  >
    
    <td className="p-4 text-[11px] font-bold text-gray-500 uppercase">
      PAY-001
    </td>

    <td className="p-4 text-[12px] font-black text-gray-800">
      محمد محمود
    </td>

    <td className="p-4 text-[12px] font-bold text-gray-600">
      تصميم واجهات المستخدم
    </td>

    <td className="p-4 text-[12px] font-black text-gray-800">
      550 ج.م
    </td>

    <td className="p-4 text-[11px] font-bold text-gray-400">
      المحتوى لا يناسب مستواي
    </td>

    <td className="p-4 text-[11px] font-bold text-gray-500">
      31-12-2025
    </td>

    <td className="p-4">
      <span className="bg-amber-500 text-white text-[10px] px-3 py-1.5 rounded-lg font-black shadow-sm">
        قيد المراجعة
      </span>
    </td>

    <td className="p-4 border-orange-500">
      <div className="flex items-center justify-center gap-3">
        <button className="text-gray-300 hover:text-gray-500 transition-colors">
          <Eye size={18} />
        </button>
        <button className="text-red-400 hover:text-red-500 transition-colors">
          <User size={18} />
        </button>
        <button className="text-green-500 hover:text-green-600 transition-colors">
          <CheckCircle2 size={18} />
        </button>
      </div>
    </td>

  </tr>
))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 text-center text-gray-400 font-bold">يظهر هنا محتوى {activeTab === 'payments' ? 'المدفوعات' : 'المستحقات'}</div>
        )}
      </div>

  
    
    </div>
  );
}

const PageBtn = ({ label, icon, active, orange }) => (
  <button className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all border outline-none focus:outline-none
    ${active ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 
      orange ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 
      'bg-white text-gray-400 border-gray-100 hover:border-orange-200'}`}>
    {label || icon}
  </button>
);