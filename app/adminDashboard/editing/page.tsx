"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Save, ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function EditTrainerProfile() {
  return (
    <div className="min-h-screen bg-[#F9F1E9] p-8" dir="rtl">
      
      <div className="max-w-6xl mx-auto">
        
        {/* زر العودة */}
        <div className="flex justify-start mb-4">
               <Link href="/adminDashboard/instructors
                    "
     className="flex items-center gap-3 cursor-pointer"
                           >
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            
            <div className="bg-orange-100 p-1 rounded-full text-[#FF6B00]">
              <ArrowLeft size={14} className="rotate-180" />
            </div>
            <span className="text-xs font-bold">العودة للتفاصيل</span>
          </motion.button>
             </Link>
        </div>

        {/* العنوان */}
        <div className="text-right mb-8">
          <h1 className="text-2xl font-black text-gray-800">تعديل بيانات المدرب</h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            تعديل معلومات المدرب الأساسية
          </p>
        </div>

        {/* الفورم */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-16 border border-orange-50 shadow-sm"
        >
          <h3 className="text-right font-black text-gray-800 mb-10 text-sm">
            المعلومات الاساسية
          </h3>

          {/* GRID 👇 أهم تعديل هنا */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-32">

  <InputField label="الاسم الكامل" placeholder="محمد أحمد" />
  <InputField label="البريد الإلكتروني" placeholder="mohamedahmed@gmail.com" />

  <InputField label="رقم التليفون" placeholder="01012345678" />
  <InputField label="نسبة العمولة (%)" placeholder="30%" />

  <SelectField label="التخصص" value="التصميم" />
  <SelectField label="الحالة" value="نشط" />

  <div className="md:col-span-2 space-y-3">
    <label className="block text-right text-[11px] font-bold text-gray-700 mr-2">
      نبذة تعريفية
    </label>

    <textarea 
      rows={5}
      placeholder="ماجستير في تصميم واجهات المستخدم"
      className="w-full h-44 bg-[#FFF9F6] border border-[#F3E0D5] rounded-3xl p-6 text-right text-xs text-gray-500 outline-none focus:ring-2 focus:ring-orange-100 transition-all resize-none shadow-sm"
      dir="rtl"
    />
  </div>

</div>

          {/* الأزرار */}
          <div className="flex flex-row-reverse justify-end gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF6B00] text-white px-10 py-3.5 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-lg shadow-orange-100"
            >
              <Save size={16} /> حفظ التعديلات
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-[#F3E0D5] bg-white text-gray-400 px-10 py-3.5 rounded-2xl text-xs font-bold transition-colors"
            >
              إلغاء
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ===================== */
/* INPUT FIELD */
/* ===================== */
function InputField({ label, placeholder }: any) {
  return (
    <div className="space-y-3 text-right">
      <label className="block text-[11px] font-bold text-gray-700 mr-2">
        {label}
      </label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full bg-[#FFF9F6] border border-[#F3E0D5] rounded-2xl py-4 px-8 text-right text-xs text-gray-500 outline-none focus:bg-white focus:border-orange-300 transition-all"
      />
    </div>
  );
}

/* ===================== */
/* SELECT FIELD */
/* ===================== */
function SelectField({ label, value }: any) {
  return (
    <div className="space-y-3 text-right">
      <label className="block text-[11px] font-bold text-gray-700 mr-2">
        {label}
      </label>

      <div className="w-full bg-[#FFF9F6] border border-[#F3E0D5] rounded-2xl py-4 px-6 flex flex-row-reverse items-center justify-between cursor-pointer hover:border-orange-200 transition-all">
        
        <ChevronDown size={18} className="text-gray-300" />

        <span className="text-xs text-gray-500 text-right w-full">
          {value}
        </span>

      </div>
    </div>
  );
}