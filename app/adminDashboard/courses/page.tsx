"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ChevronDown, Filter, BookOpen, 
  CheckCircle, Clock, Users, Eye, Edit, 
  Trash2, ChevronRight, ChevronLeft, User
} from 'lucide-react';

import Link from 'next/link';
export default function CoursesManagement() {
  return (
    <div className="p-8 bg-bg-[#F9F1E9]   min-h-screen font-sans" >
      
     
      <div className="mb-8 text-right">
        <h1 className="text-2xl font-black text-gray-800 mb-1">إدارة الدورات</h1>
        <p className="text-gray-400 text-[11px] font-bold">عرض وإدارة جميع الدورات في المنصة</p>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8  " dir='ltr'>
        <StatCard title="إجمالي الدورات" value="150" icon={<BookOpen size={18}/>} />
        <StatCard title="الدورات النشطة" value="90" icon={<Users size={18}/>} color="text-orange-400" />
        <StatCard title="قيد المراجعة" value="2" icon={<Users size={18}/>} color="text-orange-400" />
        <StatCard title="إجمالي الطلاب" value="1,850" icon={<Users size={18}/>} color="text-orange-400" />
      </div>

  
      <div className="mb-8 bg-white rounded-[2rem] p-6 shadow-sm border border-orange-50">
        <h3 className="font-bold text-gray-700 mb-5 text-[13px] text-right">طلبات إضافة الدورات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 " dir='ltr'>
          <RequestCard title="الذكاء الاصطناعي للمبتدئين" instructor="م. أحمد محمد" price="3500 ج.م" />
          <RequestCard title="أساسيات تصميم واجهة المستخدم UI & Ux" instructor="م. عبد الرحمن مصطفى" price="2450 ج.م" />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 bg-white p-8 rounded-3xl">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" placeholder="بحث بعنوان الدورة أو اسم المدرب..." 
            className="w-full bg-[#FFF3EB] border border-[#F3E0D5] rounded-xl py-3 pr-12 text-xs outline-none shadow-sm text-right"
          />
        </div>

        <FilterBtn label="التخصصات"  />
        <FilterBtn label="جميع الحالات" />
        
        <button className="flex items-center gap-2 bg-[#FFF3EB] border border-[#F3E0D5] px-5 py-3 rounded-xl text-xs font-bold text-gray-500">
          <Filter size={16} /> <span>تحديد بيانات</span>
        </button>
      </div>

  
<div className="bg-white rounded-[2rem] border border-orange-50 shadow-sm mt-4 overflow-hidden">
  <table className="w-full text-right border-separate" style={{ borderSpacing: 0 }}>
    <thead>
      <tr>
        <th 
          style={{ backgroundColor: '#FFE3D0' }} 
          className="p-5 text-[13px] font-black text-gray-800 first:rounded-r-[2rem]"
        >
          الدورة
        </th>
        <th style={{ backgroundColor: '#FFE3D0' }} className="p-5 text-[13px] font-black text-gray-800">المدرب</th>
        <th style={{ backgroundColor: '#FFE3D0'}} className="p-5 text-[13px] font-black text-gray-800">التصنيف</th>
        <th style={{ backgroundColor: '#FFE3D0' }} className="p-5 text-[13px] font-black text-gray-800">الطلاب</th>
        <th style={{ backgroundColor: '#FFE3D0' }} className="p-5 text-[13px] font-black text-gray-800">السعر</th>
        <th style={{ backgroundColor: '#FFE3D0' }} className="p-5 text-[13px] font-black text-gray-800">التقييم</th>
        <th style={{ backgroundColor: '#FFE3D0' }} className="p-5 text-[13px] font-black text-gray-800">الحالة</th>
        <th 
          style={{ backgroundColor:'#FFE3D0' }} 
          className="p-5 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]"
        >
          التحكم
        </th>
      </tr>
    </thead>
    <tbody>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <tr key={i} className="hover:bg-[#FFF9F6] transition-colors">
       
          <td className="p-5 text-xs font-bold text-gray-700 border-b border-orange-500"  
           ><Link href='/adminDashboard/courses/Course_preview'>
               تصميم واجهات المستخدم UI&UX   </Link></td>
          <td className="p-5 text-xs font-medium text-gray-500 border-b border-orange-500">م. محمد محمود</td>
          <td className="p-5 text-xs font-medium text-gray-500 border-b border-orange-500">التصميم</td>
          <td className="p-5 text-xs font-medium text-gray-500 border-b border-orange-500">860</td>
          <td className="p-5 text-xs font-medium text-gray-500 border-b border-orange-500">550 ج. م</td>
          <td className="p-5 text-xs font-medium text-gray-500 border-b border-orange-500">4.8</td>
          <td className="p-5 border-b border-orange-500">
            <span className="bg-[#00AC4F] text-white text-[10px] px-5 py-1.5 rounded-full font-bold shadow-sm">نشط</span>
          </td>
          <td className="p-5 border-b border-orange-500">
          <div className="flex justify-center gap-3">

  <button className="hover:scale-110 transition-transform">
    <Eye size={18} color="#FFB081" className="hover:stroke-[#FF6B00] transition-colors" />
  </button>
  
  <button className="hover:scale-110 transition-transform">
    <Edit size={18} color="#FFB081" className="hover:stroke-[#FF6B00] transition-colors" />
  </button>
  
  <button className="hover:scale-110 transition-transform">
    <Trash2 size={18} color="#FFB081" className="hover:stroke-[#FF6B00] transition-colors" />
  </button>
</div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  
      <div className="flex items-center justify-between mt-6">
         <p className="text-[11px] text-gray-400 font-bold">عرض البيانات من 1 إلى 9 من أصل 15 ألف مستخدم</p>
         <div className="flex items-center gap-1">
            <PaginationBtn icon={<ChevronRight size={16}/>} />
            <PaginationBtn label="1" active />
            <PaginationBtn label="2" />
            <PaginationBtn label="3" />
            <PaginationBtn label="4" />
            <span className="px-2 text-gray-400 text-xs">...</span>
            <PaginationBtn label="12" />
            <PaginationBtn icon={<ChevronLeft size={16}/>} orange />
         </div>
      </div>

    </div>
  );
}


const StatCard = ({ title, value, icon, color = "text-orange-400" }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-orange-50 flex items-center justify-between shadow-sm">
    <div className={`bg-orange-50 p-3 rounded-xl ${color} border border-orange-100/50`}>{icon}</div>
    <div className="text-left">
      <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">{title}</p>
      <p className="text-xl font-black text-gray-800">{value}</p>
    </div>
  </div>
);

const RequestCard = ({ title, instructor, price }: any) => (
  <div className="bg-[#FFF9F6] p-4 rounded-2xl border border-orange-50 flex items-center justify-between shadow-sm">
    <div className="flex gap-2">
       <button className="p-1.5 text-orange-400 hover:bg-white rounded-lg transition-colors"><Eye size={14}/></button>
       <button className="p-1.5 text-orange-400 hover:bg-white rounded-lg transition-colors"><User size={14}/></button>
       <button className="p-1.5 text-orange-400 hover:bg-white rounded-lg transition-colors"><CheckCircle size={14}/></button>
    </div>
    <div className="text-right">
      <p className="text-xs font-black text-gray-800 mb-1">{title}</p>
      <div className="flex items-center gap-2 justify-end text-[10px] text-gray-400 font-bold">
         <span>{price}</span>
         <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
         <span>{instructor}</span>
      </div>
    </div>
  </div>
);

const FilterBtn = ({ label }: any) => (
  <div className="min-w-[140px] bg-[#FFF3EB] border border-[#F3E0D5] rounded-xl px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-500 cursor-pointer shadow-sm">
    <ChevronDown size={16} className="text-gray-300" />
    <span>{label}</span>
  </div>
);

const PaginationBtn = ({ label, icon, active, orange }: any) => (
  <button className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all
    ${active ? 'bg-[#FF6B00] text-white' : orange ? 'bg-[#FF6B00] text-white' : 'bg-white border border-gray-100 text-gray-400 hover:bg-orange-50'}
  `}>
    {label || icon}
  </button>
);