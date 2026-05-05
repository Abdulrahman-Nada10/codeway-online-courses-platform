"use client"
import React from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Download, Plus, Award, FileText, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
export default function CertificatesManagement() {
  return (
    <div className="p-4 md:p-8 bg-[#FDF4EE] min-h-screen text-right font-sans" dir="rtl">
      
   
      <div className="flex justify-between items-start mb-8" dir='ltr'>
        <button className="bg-[#FF6B00] text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-200/50 outline-none hover:bg-orange-600 transition-all">
          <Plus size={18} />
          إصدار شهادة
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-800">إدارة الشهادات</h1>
          <p className="text-gray-400 text-[11px] font-bold mt-1 text-left">إدارة ومتابعة شهادات الطلاب</p>
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="إجمالي الشهادات" value="1200" icon={<Award className="text-orange-400" size={20} />} />
        <StatCard label="الشهادات الصادرة" value="25" icon={<CheckCircle className="text-orange-400" size={20} />} />
        <StatCard label="قيد الإصدار" value="2" icon={<Clock className="text-orange-400" size={20} />} />
        <StatCard label="قوالب الشهادات" value="3" icon={<FileText className="text-orange-400" size={20} />} />
      </div>

     
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-wrap gap-4 items-center mb-6 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="بحث بعنوان الدورة أو اسم الطالب..." 
            className="w-full bg-[#FFF3EB] border border-gray-100 rounded-xl py-2.5 pr-12 pl-4 text-xs outline-none focus:ring-1 focus:ring-orange-100"
          />
        </div>
        <div className="flex gap-2">
           <FilterSelect label="التخصصات" />
           <FilterSelect label="جميع الحالات" />
           <button className="flex items-center gap-2 bg-[#FDFCFB] border border-gray-100 px-4 py-2.5 rounded-xl text-gray-500 text-[11px] font-black hover:bg-gray-50 transition-colors">
             <Filter size={16} /> تحديد بيانات
           </button>
        </div>
      </div>

      {/* 4. جدول الشهادات */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-6">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr style={{ backgroundColor: '#FFEFE6' }}>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right first:rounded-r-[2rem]">الطالب</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">المدرب</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">الدورة</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">تاريخ الإصدار</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">الحالة</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9)].map((_, i) => {
              const isCompleted = i !== 2 && i !== 5 && i !== 7 && i !== 8;
              return (
                <tr key={i} className="hover:bg-[#FFF9F6] transition-colors group">
                  <td className="p-5 text-[12px] border-b border-orange-500 font-black text-gray-800"> <Link href='/adminDashboard/certificates/managelife'>
                    محمد محمود </Link> </td>
                  <td className="p-5 text-[12px] border-b border-orange-500 font-bold text-gray-600">م. محمد محمود</td>
                  <td className="p-5 text-[12px] border-b border-orange-500 font-bold text-gray-600">تصميم واجهات المستخدم Ui&Ux</td>
                  <td className="p-5 text-[11px] border-b border-orange-500 font-bold text-gray-600">30-12-2025</td>
                  <td className="p-5 border-b border-orange-500">
                    {isCompleted ? (
                      <span className="bg-[#00AC4F] text-white text-[10px] px-6 py-1.5 rounded-full font-black block w-fit">مكتمل</span>
                    ) : (
                      <span className="bg-amber-500 text-white text-[10px] px-5 py-1.5 rounded-full font-black block w-fit">قيد المراجعة</span>
                    )}
                  </td>
                  <td className="p-5 border-b border-orange-500 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-orange-500 hover:text-[#FF6B00] transition-colors"><Eye size={18} /></button>
                      <button className="text-orange-500 hover:text-[#FF6B00] transition-colors"><Download size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

     
      <div className="flex justify-between items-center px-4">
        <p className="text-[11px] text-gray-400 font-black italic">عرض البيانات من 1 إلى 9 من أصل 10 آلاف مستخدم</p>
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
  <div className="bg-white p-5  border rounded-3xl border-gray-50 flex items-center justify-between shadow-sm">
    <div className="text-right">
      <p className="text-gray-400 text-[10px] font-black mb-1">{label}</p>
      <p className="text-lg font-black text-gray-800 leading-none">{value}</p>
    </div>
    <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-orange-50/50">{icon}</div>
  </div>
);

const FilterSelect = ({ label }) => (
  <div className="bg-[#FFF3EB] border border-gray-100 px-4 py-2.5 rounded-xl flex items-center gap-8 text-gray-500 text-[11px] font-black cursor-pointer hover:bg-gray-50 transition-colors">
    {label} <ChevronDown size={14} className="text-gray-400" />
  </div>
);

const ChevronDown = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const PageBtn = ({ label, icon, active, orange }) => (
  <button className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all border outline-none
    ${active ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-orange-100' : 
      orange ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 
      'bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-[#FF6B00]'}`}>
    {label || icon}
  </button>
);