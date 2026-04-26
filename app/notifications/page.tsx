"use client";
import React from 'react';
import { motion } from 'framer-motion';
// استيراد الأيقونات الاحترافية لتطابق السكرين
import { 
  Star, Video, User, Search, ChevronRight, 
  ChevronLeft, ChevronDown, AlertTriangle, 
  BookOpen, Radio, Calendar 
} from 'lucide-react';

// استيراد مكوناتك الخاصة
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotificationCard = ({ title, subTitle, time, iconType, isRead = false, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: -5, backgroundColor: "#fdfdfd" }}
      className={`flex items-center justify-between p-4 mb-4 bg-white rounded-2xl border transition-all relative
        ${!isRead ? 'border-blue-100 shadow-sm' : 'border-gray-100 opacity-80'}`}
    >
   <div className="flex flex-col text-right flex-1 pr-2">
        <h3 className={`text-[15px] font-bold mb-1 ${iconType === 'live' ? 'text-red-500' : 'text-[#333]'}`}>
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 font-medium">{subTitle}</p>
        {time && <p className="text-[10px] text-gray-300 mt-1">{time}</p>}
      </div>

     
      <div className="flex-shrink-0 ml-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
          ${iconType === 'star' ? 'bg-[#EEF6FF] text-[#4A90E2]' : 
            iconType === 'live' ? 'bg-[#FFF0F0] text-[#FF4D4D]' : 'bg-[#F5F0EE] text-[#A6897E]'}`}>
          
          {iconType === 'star' && <Star size={20} fill="currentColor" />}
          {iconType === 'live' && <Video size={20} fill="currentColor" />}
          {iconType === 'reply' && <User size={22} fill="currentColor" />}
        </div>
      </div>
    </motion.div>
  );
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-orange-100" dir="rtl">
      
      
      <Navbar  />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
       
          <aside className="col-span-12 lg:col-span-3">
           

            <div className="space-y-50">
         
              <section>
                 <h1 className="text-[42px] font-black text-[#2D2D2D] mb-8 mt-20 leading-tight">الإشعارات</h1>
            
            <div className="flex gap-2 mb-10 bg-orange-50/50 p-1 rounded-2xl w-fit">
              <button className="px-6 py-2 bg-[#FFDAB9] text-[#854500] rounded-xl font-bold text-sm shadow-sm">الكل</button>
              <button className="px-6 py-2 text-gray-400 font-bold text-sm hover:text-gray-600 transition-all">مقروءة</button>
              <button className="px-6 py-2 text-gray-400 font-bold text-sm hover:text-gray-600 transition-all">غير مقروءة</button>
            </div>
                <h4 className="text-gray-900 font-bold mb-5 mr-1 text-[15px]">النوع</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-[20px] bg-[#D7EFFF] border border-[#BDE1FF] text-[#0070BB] cursor-pointer hover:shadow-md transition-all">
                     <div className="bg-[#0084FF] text-white p-1 rounded-md"><BookOpen size={14} /></div>
                     <span className="font-bold text-sm">دروس جديدة</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[20px] bg-[#FEF8D3] border border-[#F4E8A5] text-[#8B7E20] cursor-pointer hover:shadow-md transition-all">
                     <div className="bg-[#FFD700] text-white p-1 rounded-md"><Calendar size={14} /></div>
                     <span className="font-bold text-sm">ردود المعلمين</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[20px] bg-[#FFDADA] border border-[#FFBFBF] text-[#D13B3B] cursor-pointer hover:shadow-md transition-all">
                     <div className="bg-[#FF4D4D] text-white p-1 rounded-md"><Radio size={14} /></div>
                     <span className="font-bold text-sm">بث مباشر</span>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-gray-900 font-bold mb-5 mr-1 text-[15px]">الزمن</h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 rounded-[22px] bg-[#FF6D00] text-white shadow-xl shadow-orange-100 hover:bg-[#e66200] transition-all">
                    <span className="text-xl">🕒</span>
                    <span className="font-bold text-[15px]">آخر 24 ساعة</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-[22px] bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
                    <span className="text-xl">📅</span>
                    <span className="font-bold text-[15px]">هذا الأسبوع</span>
                  </button>
                </div>
              </section>
            </div>
          </aside>
\
          <div className="col-span-12 lg:col-span-7 lg:mt-24">
            <div className="relative mb-8 group">
              <input 
                type="text" 
                placeholder="البحث..." 
                className="w-full p-4 pr-14 rounded-[22px] border-none bg-white shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-[#FFDAB9] outline-none text-lg transition-all"
              />
              <Search className="absolute right-5 top-4 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={24} />
            </div>

            <div className="space-y-4">
              <NotificationCard index={0} title='تم إضافة درس جديد في "مقدمة الذكاء الاصطناعي"' subTitle="برمجة بايثون" time="منذ دقيقتين" iconType="star" />
              <NotificationCard index={1} title='تم إضافة درس جديد في "مقدمة الذكاء الاصطناعي"' subTitle="برمجة بايثون" time="منذ دقيقتين" iconType="star" isRead={true} />
              <NotificationCard index={2} title='تذكير : تبدأ جلسة البث " المباشر " تصميم واجهة المستخدم بعد 15 دقيقة' subTitle="تصميم تجربة المستخدم" iconType="live" />
              <NotificationCard index={3} title="رد المدرب أحمد على استفسارك : سؤال حول المصفوفات" subTitle="جافا سكريبت متقدم" iconType="reply" isRead={true} />
            </div>

       
            <div className="flex justify-center items-center mt-12 gap-4">
              <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white"><ChevronRight size={20} /></button>
              <span className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-600">1</span>
              <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white"><ChevronLeft size={20} /></button>
              <span className="text-[#333] font-bold mr-6 cursor-pointer hover:text-orange-600 transition-colors underline underline-offset-8 decoration-gray-200">عرض جميع الإشعارات السابقة</span>
            </div>
          </div>

      
          <div className="col-span-12 lg:col-span-2 lg:mt-24 space-y-8">
            <button className="w-full bg-[#FF6D00] text-white p-5 rounded-[22px] font-black text-xl shadow-2xl shadow-orange-100 flex justify-between items-center px-8 hover:brightness-110 active:scale-95 transition-all">
              <ChevronDown size={20} />
              <span>اختيار</span>
            </button>
            
            <div className="flex flex-col gap-6 text-right pr-2">
              <button className="text-[#FF6D00] font-bold text-[15px] border-r-4 border-orange-500 pr-4 hover:translate-x-[-3px] transition-transform">تمييز كمقروءة</button>
              <button className="text-gray-300 font-bold text-[15px] cursor-default pr-5">تمييز كعدم مقروءة</button>
              <button className="text-red-400 font-bold text-[15px] hover:text-red-600 transition-colors pr-5">حذف</button>
            </div>
          </div>

        </div>
      </main>

  
      <Footer />
    </div>
  );
}