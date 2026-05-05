"use client";

import React from 'react';
import Link from "next/link";
import { Trash2, Edit, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export default function TrainersTable() {
  const trainers = [
    { id: 1, name: "عبد الرحمن محمود", email: "abdelrahmanmahmoud@gmail.com", spec: "التسويق الالكتروني", courses: 5, students: 860, earnings: "45,000 ج.م", rating: 4.8, status: "نشط" },
    { id: 2, name: "عبد الرحمن محمود", email: "abdelrahmanmahmoud@gmail.com", spec: "الذكاء الاصطناعي", courses: 5, students: "1,268", earnings: "55,000 ج.م", rating: 4.9, status: "نشط" },
    { id: 3, name: "عبد الرحمن محمود", email: "abdelrahmanmahmoud@gmail.com", spec: "البرمجة", courses: 5, students: 760, earnings: "53,000 ج.م", rating: 4.7, status: "نشط" },
    { id: 4, name: "عبد الرحمن محمود", email: "abdelrahmanmahmoud@gmail.com", spec: "الشبكات", courses: 5, students: "1,150", earnings: "57,000 ج.م", rating: 4.6, status: "نشط" },
    { id: 5, name: "عبد الرحمن محمود", email: "abdelrahmanmahmoud@gmail.com", spec: "إدارة الأعمال", courses: 5, students: "1,358", earnings: "47,000 ج.م", rating: 4.9, status: "نشط" },
  ];

  return (
    <div className="w-full bg-[#F9F1E9] p-4" dir="rtl">
      <div className="bg-white rounded-[2rem] border border-[#E9D5C7] shadow-sm overflow-hidden">
  <table className="w-full text-right border-separate border-spacing-y-0">
  {/* Header */}
  <thead className="bg-[#FFF9F6] sticky top-0 z-10">
    <tr className="text-gray-800 text-[13px] font-black">
      <th className="p-5 text-right first:rounded-r-[2rem]">المدرب</th>
      <th className="p-5 text-center">التخصص</th>
      <th className="p-5 text-center">الدورات</th>
      <th className="p-5 text-center">الطلاب</th>
      <th className="p-5 text-right">الأرباح</th>
      <th className="p-5 text-center">التقييم</th>
      <th className="p-5 text-right">الحالة</th>
      <th className="p-5 text-center last:rounded-l-[2rem]">التحكم</th>
    </tr>
  </thead>

  <tbody>
    {trainers.map((tr, index) => (
      <motion.tr
        key={tr.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ backgroundColor: "#FFF9F6" }} 
        className="group transition-all duration-200"
      >
        
        <td className="p-5 border-b border-orange-500">
          <Link href="/adminDashboard/details" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden  shadow-sm transition-transform group-hover:scale-105">
              <img src="https://i.pravatar.cc/150?u=trainer" alt="avatar" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-800 leading-tight group-hover:text-[#FF6B00] transition-colors">
                {tr.name}
              </p>
              <p className="text-[10px] text-gray-400 font-bold">{tr.email}</p>
            </div>
          </Link>
        </td>

        <td className="p-5 text-center text-[12px] text-gray-600 font-bold border-b border-orange-500">
          {tr.spec}
        </td>

        <td className="p-5 text-center text-xs font-black text-gray-800 border-b border-orange-500">
          {tr.courses}
        </td>

        <td className="p-5 text-center text-xs font-black text-gray-800 border-b border-orange-500">
          {tr.students}
        </td>

        <td className="p-5 text-xs font-black text-gray-800 border-b border-orange-500">
          {tr.earnings}
        </td>

        <td className="p-5 text-center text-xs font-black  border-b border-orange-500">
          {tr.rating}
        </td>

        <td className="p-5 border-b border-orange-500">
          <span className="bg-[#00AC4F] text-white text-[10px] px-6 py-1.5 rounded-lg font-black shadow-sm inline-block">
            {tr.status}
          </span>
        </td>

        <td className="p-5 border-b border-orange-500">
          <div className="flex justify-center gap-3">
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Trash2 size={18} className="text-orange-500 hover:text-red-500  cursor-pointer" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Edit size={18} className="text-orange-500 hover:text-red-500  cursor-pointer" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Eye size={18} className="text-orange-500 hover:text-red-500  cursor-pointer" />
            </motion.button>
          </div>
        </td>
      </motion.tr>
    ))}
  </tbody>
</table>

    
        <div className="p-5 flex flex-row-reverse items-center justify-between border-t border-[#E9D5C7] bg-white">
          <div className="flex items-center gap-1">
            <button className="p-2 border border-[#E9D5C7] rounded-xl text-[#FF6B00] hover:bg-orange-50 transition-colors">
              <ChevronRight size={18} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-md">1</button>
            <button className="w-9 h-9 rounded-xl text-gray-400  border border-[#FF6B00] text-xs font-bold hover:bg-orange-50 transition-all ">2</button>
            <button className="w-9 h-9 rounded-xl text-gray-400 border border-[#FF6B00]  text-xs font-bold hover:bg-orange-50 transition-all ">3</button>
            <button className="w-9 h-9 rounded-xl text-gray-400  border border-[#FF6B00] text-xs font-bold hover:bg-orange-50 transition-all ">4</button>
            <span className="px-2 text-[#FF6B00] text-xs">...</span>
            <button className="w-9 h-9 rounded-xl text-gray-400 text-xs font-bold hover:bg-orange-50 transition-all border border-[#FF6B00]">12</button>
            <button className="p-2 border border-[#E9D5C7] rounded-xl text-[#FF6B00] hover:bg-orange-50 transition-colors">
              <ChevronLeft size={18} />
            </button>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">عرض البيانات من 1 إلى 9 من أصل 10 آلاف مستخدم</p>
        </div>
      </div>
    </div>
  );
}