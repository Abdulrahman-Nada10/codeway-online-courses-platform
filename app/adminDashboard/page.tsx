
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, DollarSign, TrendingUp, 
  Bell, CheckCircle, Award, Book, ChevronDown 
} from 'lucide-react';

// تعريف أنواع البيانات
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isPositive?: boolean;
}

const DashboardMain: React.FC = () => {
  return (
    <main className="flex-1 p-6 bg-[#FFF5F0] min-h-screen font-sans" dir="rtl">
      
   
      <div className="mb-8 bg-[#FFF5F0] text-right ">
        <h1 className="text-2xl bg-[#FFF5F0] font-bold text-[#1A1A1A]">لوحة التحكم الرئيسية</h1>
        <p className="text-gray-500 text-sm">مرحباً بك في لوحة تحكم مدير النظام</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="إجمالي المستخدمين" 
          value="12,548" 
          change="%12+ هذا الشهر" 
          icon={<Users size={20} className="text-[#FF6B00]" />} 
        />
        <StatCard 
          title="الدورات النشطة" 
          value="167" 
          change="+7 دورات جديدة" 
          icon={<BookOpen size={20} className="text-[#FF6B00]" />} 
        />
        <StatCard 
          title="الإيرادات الشهرية" 
          value="47,568 ج.م" 
          change="%8- من الشهر السابق" 
          isPositive={false}
          icon={<DollarSign size={20} className="text-[#FF6B00]" />} 
        />
        <StatCard 
          title="معدل الإكمال" 
          value="88%" 
          change="%5+ تحسن" 
          icon={<TrendingUp size={20} className="text-[#FF6B00]" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
   
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-orange-50"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-[#FF6B00]" size={20} />
              <h3 className="font-bold text-gray-800">إحصائيات النشاط</h3>
            </div>
            <div className="flex items-center gap-2 bg-[#FDF2F0] px-3 py-1 rounded-lg text-sm cursor-pointer border border-orange-100">
              <span>هذا الأسبوع</span>
              <ChevronDown size={14} />
            </div>
          </div>
          
          {/* مساحة الرسم البياني */}
          <div className="w-full h-64 flex items-center justify-center border-t border-dashed border-gray-100">
             <div className="text-gray-300">مساحة المخطط البياني</div>
          </div>
        </motion.div>

        {/* صندوق الإشعارات */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-orange-50">
          <div className="flex   items-center gap-2 mb-6">
            <div className="bg-[#FFF5F0] p-2 rounded-full">
               <Bell className="text-[#FF6B00]" size={18} />
            </div>
            <h3 className="font-bold text-gray-800">الإشعارات الأخيرة</h3>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ x: -5 }}
                className="flex items-center  p-3 rounded-2xl bg-[#FFF9F6] border border-orange-50 hover:border-orange-200 transition-all cursor-pointer"
              >
                <div className="bg-white p-2 rounded-lg ml-5 shadow-sm">
                  <BookOpen className="text-[#FF6B00]" size={16} />
                </div>
                <div className="flex flex-col items-start text-right">
                  <span className="text-sm font-medium text-gray-700">طلب موافقة على دورة جديد</span>
                  <span className="text-[10px] text-gray-400">منذ 5 دقائق</span>
                </div>
                
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-[#FF6B00] text-white rounded-xl font-bold hover:bg-[#e66000] transition-colors shadow-lg shadow-orange-100">
            عرض جميع الإشعارات
          </button>
        </div>
      </div>

 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SmallStat icon={<Users size={18} />} label="طلاب جدد اليوم" value="55" />
        <SmallStat icon={<BookOpen size={18} />} label="دورات مكتملة" value="205" />
        <SmallStat icon={<Award size={18} />} label="شهادات صادرة" value="90" />
        <SmallStat icon={<Book size={18} />} label="دورات مغلقة" value="6" />
      </div>

    </main>
  );
};


const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, isPositive = true }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-orange-50 flex items-center justify-between"
  >
    <div className="text-right">
      <p className="text-gray-400 text-xs mb-1 font-medium">{title}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className={`text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </div>
    <div className="bg-[#FFF5F0] p-3 rounded-2xl">
      {icon}
    </div>
  </motion.div>
);

// مكون البطاقة الصغيرة السفلية
const SmallStat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white/80 p-4 rounded-2xl border border-white shadow-sm flex items-center justify-between">
    <div className="text-right">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
    <div className="text-[#FF6B00] opacity-60">
      {icon}
    </div>
  </div>
);

export default DashboardMain;