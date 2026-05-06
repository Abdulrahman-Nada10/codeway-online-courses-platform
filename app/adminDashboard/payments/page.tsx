"use client"
import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Download, DollarSign, CheckCircle, RefreshCcw, CreditCard } from 'lucide-react';
import Orders from './orders'; 
import Dues from './Dues';

export default function PaymentManagementFinal() {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen text-right" dir="rtl">
      
      {/* 1. الهيدر العلوي */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-gray-800">إدارة المدفوعات</h1>
          <p className="text-gray-400 text-xs font-bold">عرض وإدارة جميع المدفوعات والفواتير</p>
        </div>
        <button className="bg-[#FF6B00] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all outline-none focus:outline-none">
          <Download size={18} />
          تصدير التقرير
        </button>
      </div>

  \
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="إجمالي الإيرادات" value="185,590 ج.م" icon={<DollarSign className="text-orange-400" />} />
        <StatCard label="المدفوعات الناجحة" value="123" icon={<CheckCircle className="text-orange-400" />} />
        <StatCard label="طلبات الاسترداد" value="2" icon={<RefreshCcw className="text-orange-400" />} />
        <StatCard label="المبالغ المعلقة" value="1,850" icon={<CreditCard className="text-orange-400" />} />
      </div>

  
      <div className="bg-white text-[#000] p-1.5 rounded-[1.5rem] flex items-center justify-between gap-1 mb-6 w-full shadow-sm">
        {['المدفوعات', 'طلبات الاسترداد', 'مستحقات المدربين'].map((tab, index) => {
          const tabId = index === 0 ? 'payments' : index === 1 ? 'refunds' : 'instructors';
          const isActive = activeTab === tabId;
          return (
            <button 
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`flex-1 py-3 rounded-2xl text-[15px] transition-all duration-300 outline-none focus:outline-none select-none ${
                isActive 
                ? 'bg-[#FFF3EB] font-black shadow-sm' 
                : 'font-bold hover:text-[#FF6B00]/70'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

   
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-wrap gap-4 items-center mb-6 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="بحث برقم العملية أو اسم المستخدم..." 
            className="w-full bg-[#FFF3EB] border border-orange-50 rounded-xl py-2.5 pr-12 pl-4 text-xs outline-none focus:ring-1 focus:ring-orange-100"
          />
        </div>
        <div className="flex gap-2">
           <div className="bg-[#FFF3EB] border border-orange-50 px-4 py-3 rounded-xl flex items-center gap-4 text-gray-500 text-[11px] font-black cursor-pointer hover:bg-gray-50 transition-colors">
             التخصصات <ChevronLeft size={14} className="-rotate-90" />
           </div>
           <div className="bg-[#FFF3EB] border border-orange-50 px-4 py-3 rounded-xl flex items-center gap-4 text-gray-500 text-[11px] font-black cursor-pointer hover:bg-gray-50 transition-colors">
             جميع الحالات <ChevronLeft size={14} className="-rotate-90" />
           </div>
           <button className="flex items-center gap-2 bg-[#FDFCFB] border border-orange-50 px-4 py-3 rounded-xl text-gray-500 text-[11px] font-black hover:bg-gray-50 transition-colors outline-none focus:outline-none">
             <Filter size={16} /> تحديد بيانات
           </button>
        </div>
      </div>

     
      <div className="animate-in fade-in duration-700">
        {activeTab === 'payments' && (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-6">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr style={{ backgroundColor: '#FFEFE6' }}>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right first:rounded-r-[2rem]">رقم العملية</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">المستخدم</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">الدورة</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">المبلغ</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">طريقة الدفع</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">التاريخ</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-right">الحالة</th>
                  <th className="p-5 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(9)].map((_, i) => (
                  <tr key={i} className="hover:bg-[#FFF9F6] transition-colors group">
                    <td className="p-5 text-[12px] border-b border-orange-500 font-bold text-gray-400 uppercase">PAY-00{i+1}</td>
                    <td className="p-5 text-[12px] border-b border-orange-500 font-black text-gray-800">محمد محمود</td>
                    <td className="p-5 text-[12px] border-b border-orange-500 font-bold text-gray-600 text-xs">تصميم واجهات المستخدم</td>
                    <td className="p-5 text-[12px] border-b border-orange-500 font-black text-gray-800">550 ج.م</td>
                    <td className="p-5 text-[12px] border-b border-orange-500 font-bold text-gray-500 text-xs">بطاقة ائتمان</td>
                    <td className="p-5 text-[11px] border-b border-orange-500 font-bold text-gray-400">31-12-2025</td>
                    <td className="p-5 border-b border-orange-500">
                      <span className="bg-[#00AC4F] text-white text-[10px] px-6 py-1.5 rounded-full font-black block w-fit">مكتمل</span>
                    </td>
                    <td className="p-5 border-b border-orange-500 text-center">
                      <button className="text-orange-300 hover:text-[#FF6B00] transition-colors outline-none focus:outline-none">
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'refunds' && <Orders />}
        {activeTab === 'instructors' && <Dues />}
      </div>

      
      <div className="flex justify-between items-center px-4 mt-6">
        <p className="text-[11px] text-gray-400 font-black">عرض البيانات من 1 إلى 9 من أصل 10 آلاف مستخدم</p>
        <div className="flex items-center gap-2">
          <PageBtn icon={<ChevronRight size={18} />} />
          <PageBtn label="1" active />
          <PageBtn label="2" />
          <PageBtn label="3" />
          <PageBtn label="4" />
          <span className="text-gray-300 font-bold px-1">..</span>
          <PageBtn label="12" />
          <PageBtn icon={<ChevronLeft size={18} />} orange />
        </div>
      </div>
    </div>
  );
}


const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
    <div className="flex flex-col text-right">
      <span className="text-gray-400 text-[10px] font-black mb-1">{label}</span>
      <span className="text-lg font-black text-gray-800">{value}</span>
    </div>
    <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-orange-50">{icon}</div>
  </div>
);

const PageBtn = ({ label, icon, active, orange }) => (
  <button className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all border outline-none focus:outline-none
    ${active ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-sm' : 
      orange ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 
      'bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-[#FF6B00]'}`}>
    {label || icon}
  </button>
);