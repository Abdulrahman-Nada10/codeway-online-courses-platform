"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Edit, Mail, Phone, Calendar, 
  LayoutGrid, BookOpen, Users, Star, DollarSign, Search, ChevronDown, Filter, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
export default function TrainerDetails() {
  return (
    <div className="p-8 bg-[#F9F1E9] min-h-screen font-sans" >
      
      {/* 1. الهيدر العلوي: زر العودة */}
     <Link href="/adminDashboard/instructors
                    "
     className="flex items-center gap-3 cursor-pointer"
                           > 
      <div className="flex justify-start mb-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
           <div className="bg-orange-100 p-1 rounded-full text-[#FF6B00]">
            <ArrowLeft size={14} className="rotate-180" />
          </div>
          <span className="text-xs font-bold">العودة للمدربين</span>
         
        </button>
      </div>
      </Link> 

      {/* 2. العنوان وزر التعديل (قصاد بعض) */}
      <div className="flex justify-between items-center mb-8">
      
        <div className="text-right">
          <h1 className="text-2xl font-black text-gray-800">تفاصيل المدرب</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">عرض معلومات المدرب ودوراته</p>
        </div>
           <Link href="/adminDashboard/editing
                    "className="flex items-center gap-3 cursor-pointer"
                           >
          <button className="bg-[#FF6B00] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-lg shadow-orange-100 hover:bg-[#e65a00] transition-all">
          <Edit size={16} /> تعديل البيانات
        </button>
        </Link>
      </div>

      {/* 3. كارت بيانات المدرب */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-orange-50 shadow-sm mb-8">
        <div className="flex items-start gap-6">
          {/* الصورة الشخصية */}
          <div className="relative">  
            <div className="w-28 h-28 rounded-full border-4 border-orange-50 overflow-hidden shadow-sm">
              <img src="https://i.pravatar.cc/150?u=trainer1" alt="trainer" className="w-full h-full object-cover" />
            </div>
          
          </div>

          {/* المعلومات */}
          <div className="flex-1 text-right">
            <h2 className="text-xl font-black text-gray-800 mb-1">م. محمد محمود</h2>
            <p className="text-gray-400 text-xs font-bold mb-3">التصميم</p>
            <p className="text-[12px] text-gray-400 max-w-2xl leading-relaxed mb-6 font-medium">
              ماجستير في تصميم واجهات المستخدم، عملت في شركات عالمية مثل Apple و Google و Adobe لسنوات طويلة.
            </p>

      

            <div className="flex gap-8 items-center border-t border-orange-50 pt-6">
              <InfoItem icon={<Mail size={14}/>} label="mohamed@gmail.com" />
              <InfoItem icon={<Phone size={14}/>} label="01012345678" />
              <InfoItem icon={<LayoutGrid size={14}/>} label="التصميم" />
              <InfoItem icon={<Calendar size={14}/>} label="انضم في 30-12-2025" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10 " dir='ltr'>
        <StatItem className="flex flex-row-reverse" title="الدورات" value="5" icon={<BookOpen size={20}/>} />
        <StatItem title="الطلاب" value="500" icon={<Users size={20}/>} />
        <StatItem title="التقييم" value="4.8" icon={<Star size={20}/>} />
        <StatItem title="الأرباح" value="18,400" icon={<DollarSign size={20}/>} />
      </div>

      {/* 5. شريط البحث */}
      <div className="flex items-center gap-4 mb-8 p-6 bg-white rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="بحث بإسم الدورة أو التخصص..." 
            className="w-full bg-[#FFF9F6] border border-[#F3E0D5] rounded-xl py-3.5 pr-12 text-xs outline-none focus:ring-1 focus:ring-orange-200"
          />
        </div>
        <FilterDropdown label="التخصص" />
        <FilterDropdown label="جميع الحالات" />
        <button className="flex items-center gap-2 bg-white border border-[#F3E0D5] px-6 py-3.5 rounded-xl text-xs font-bold text-gray-500">
          <Filter size={16} /> <span>تحديد بيانات</span>
        </button>
      </div>

      {/* 6. قائمة الدورات */}
  

      <div className="space-y-4 bg-white p-4">
        <div className="text-right mb-6 ">
                 <h3 className="font-black text-gray-800 text-base">دورات المدرب</h3>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -3 }}
            className="bg-orange-50 p-6 rounded-[2rem] border border-orange-50 shadow-sm flex items-center justify-between" dir='ltr'
          >
            <button className="border-2 border-orange-500 text-gray-700 px-8 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-200 transition-colors">عرض الدورة</button>
            
            <div className="flex items-center gap-12">
              
            <div className="text-right">
  <div className="flex flex-col items-end gap-2">
    
    {/* السطر الأول: الحالة + العنوان */}
    <div className="flex items-center gap-3">
      {i === 4 ? (
        <span className="bg-[#FFA500] text-white text-[10px] px-4 py-1 rounded-lg font-bold">
          قيد المراجعة
        </span>
      ) : (
        <span className="bg-[#00AC4F] text-white text-[10px] px-4 py-1 rounded-lg font-bold">
          نشط
        </span>
      )}

      <h4 className="text-sm font-black text-gray-800">
        تصميم واجهات المستخدم UI & Ux
      </h4>
    </div>

    {/* السطر التاني: التفاصيل */}
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="flex items-center gap-1.5">
        <Users size={14} /> 450 طالب
      </span>

      <span className="flex items-center gap-1.5">
        <DollarSign size={14} /> 15,500 ج.م
      </span>

      <span className="flex items-center gap-1.5">
        <Star size={14} /> 4.8
      </span>
    </div>

  </div>
</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// المكونات الفرعية لضمان نظافة الكود
function InfoItem({ icon, label }: any) {
  return (
    <div className="flex items-center gap-2 text-gray-500 font-bold">
      <span className="text-[#FF6B00] bg-orange-50 p-2 rounded-xl border border-orange-100/50">{icon}</span>
      <span className="text-[12px]">{label}</span>
    </div>
  );
}

function StatItem({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-orange-50 flex items-center justify-between shadow-sm">
      <div className="bg-orange-50 text-orange-400 p-3 rounded-2xl">{icon}</div>
      <div className="text-left">
        <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{title}</p>
        <p className="text-xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function FilterDropdown({ label }: any) {
  return (
    <div className="min-w-[160px] bg-[#FFF9F6] border border-[#F3E0D5] rounded-xl px-5 py-3.5 flex items-center justify-between text-xs font-bold text-gray-500 cursor-pointer">
      <ChevronDown size={18} className="text-gray-300" />
      <span>{label}</span>
    </div>
  );
}