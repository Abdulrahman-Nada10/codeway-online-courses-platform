"use client";

import { motion } from 'framer-motion'; 
import { ArrowRight, Play, Users, Star, Clock, FileText } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function CoursePreview() {
  return (
    <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen" dir="rtl">
      
      {/* 1. زر العودة */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-6 flex flex-col gap-1"
      >
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs font-bold w-fit group">
          العودة للدورات 
          <span className="bg-orange-500 text-white rounded-full p-0.5 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <ArrowRight size={14} />
          </span>
        </button>
        <h1 className="text-xl font-black text-gray-800">معاينة الدورة</h1>
        <p className="text-gray-400 text-[10px]">عرض لتفاصيل الدورة ومحتواها</p>
      </motion.div>

      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 mb-6"
      >
        <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#00AC4F] text-white text-[10px] px-3 py-0.5 rounded-full font-bold">نشط</span>
            <h2 className="text-lg font-black text-gray-800">أساسيات البرمجة بلغة Python</h2>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
             <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                <img src="https://img.freepik.com/premium-photo/portrait-young-man_1119669-1.jpg" alt="Instructor" className="w-full h-full object-cover" />
             </div>
             <span className="text-[11px] font-bold text-gray-500">م. عبد الرحمن محمود</span>
          </div>

          <p className="text-gray-400 text-[11px] leading-relaxed mb-5 max-w-md">
            دورة شاملة لتعلم أساسيات البرمجة باستخدام لغة Python. تغطي الدورة جميع المفاهيم الأساسية...
          </p>

          <div className="flex gap-2 flex-wrap">
            {['البرمجة', 'مبتدئ', 'العربية', '500 ج. م'].map((tag, idx) => (
              <motion.span 
                whileHover={{ y: -2 }}
                key={idx} 
                className="bg-[#FFF9F6] text-orange-400 text-[10px] px-4 py-1.5 rounded-full font-bold border border-orange-50 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="w-full md:w-[320px] aspect-video bg-[#FFF5F0] rounded-[1.5rem] flex items-center justify-center relative border border-orange-50 order-1 md:order-2 self-center overflow-hidden"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white p-3 rounded-full shadow-md text-orange-500 z-10"
          >
            <Play size={30} fill="currentColor" />
          </motion.button>
        </motion.div>
      </motion.div>


      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={<Users size={18} className="text-orange-400"/>} label="الطلاب المسجلين" value="550" delay={0.1} />
        <StatCard icon={<Star size={18} className="text-orange-400"/>} label="التقييم" value="4.8" delay={0.2} />
        <StatCard icon={<Clock size={18} className="text-orange-400"/>} label="مدة الدورة" value="30 ساعة" delay={0.3} />
        <StatCard icon={<FileText size={18} className="text-orange-400"/>} label="عدد الدروس" value="8" delay={0.4} />
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-black text-gray-800 mb-5">محتوى الدورة</h3>
        <div className="space-y-3">
          <LessonItem id="1" title="مقدمة في البرمجة" time="15:30" type="فيديو" />
          <LessonItem id="2" title="المتغيرات وأنواع البيانات" time="20:10" type="فيديو" />
          <LessonItem id="3" title="الشروط والمقارنات" time="12:45" type="فيديو" />
          <LessonItem id="4" title="اختبار عند الجزء السابق" subtitle="10 أسئلة" type="اختبار" />
          <LessonItem id="5" title="الدوال (Functions)" time="18:20" type="فيديو" />
          <LessonItem id="8" title="تمرين عملي" subtitle="مشروع" type="مشروع" />
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { delay: 0 } }}
      className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm cursor-default"
    >
      <div className="flex flex-col">
        <span className="text-gray-400 text-[10px] font-bold mb-0.5">{label}</span>
        <span className="text-sm font-black text-gray-700">{value}</span>
      </div>
      <div className="bg-[#FFF9F6] p-2 rounded-xl border border-orange-50">{icon}</div>
    </motion.div>
  );
}

function LessonItem({ id, title, time, subtitle, type }) {
  const getBtnStyles = (type: string = "") => {
    const t = type.trim();
    if (t === "فيديو") return { backgroundColor: "#00E0FF", color: "white" };
    if (t === "اختبار") return { backgroundColor: "#1E293B", color: "white" };
    if (t === "مشروع" || t === "تمرين") return { backgroundColor: "#FF6B00", color: "white" };
    return { backgroundColor: "gray", color: "white" };
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ x: -5, backgroundColor: "#FFF5F0" }}
      className="flex items-center justify-between p-3 md:p-4 bg-[#FFF9F6] rounded-[1.8rem] border border-orange-50/50 hover:border-orange-100 transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-4 md:gap-6 flex-1">
        <div className="flex items-center justify-center shrink-0">
          <motion.div 
            whileHover={{ rotate: 360 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 font-black text-xs md:text-sm bg-white shadow-sm"
          >
            {id}
          </motion.div>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-[13px] md:text-[15px] font-black text-gray-800 leading-tight group-hover:text-orange-600 transition-colors">
            {title}
          </span>
          <span className="text-[10px] md:text-[11px] text-gray-400 font-bold mt-1">
            {time || subtitle}
          </span>
        </div>
      </div>

      <motion.div 
        whileHover={{ scale: 1.1 }}
        style={getBtnStyles(type)}
        className="text-[10px] md:text-[11px] px-6 py-2 rounded-xl font-black shadow-md min-w-[85px] md:min-w-[95px] text-center"
      >
        {type}
      </motion.div>
    </motion.div>
  );
}