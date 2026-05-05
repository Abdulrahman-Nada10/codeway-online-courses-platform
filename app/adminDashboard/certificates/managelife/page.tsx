"use client"
import React from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Edit3, Trash2, Clock, CheckCircle, Users, ChevronDown, UserCheck, X } from 'lucide-react';

export default function LiveSessionsManagement() {
  return (
    <div className="p-4 md:p-8 bg-[#FDF4EE] min-h-screen text-right font-sans" dir="rtl">
      
  
      <div className="flex  items-start mb-8" >
       
        <div >
          <h1 className="text-2xl font-black text-gray-800">إدارة الحصص المباشرة</h1>
          <p className="text-gray-400 text-[11px] font-bold mt-1 text-left"  dir='ltr'>عرض وإدارة جميع المدربين في المنصة</p>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="الحصص الجارية الآن" 
          value="2" 
          icon={<div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>} 
        />
        <StatCard 
          label="الحصص المجدولة" 
          value="5" 
          icon={<Clock className="text-orange-500" size={20} strokeWidth={3} />} 
        />
        <StatCard 
          label="الحصص المنتهية" 
          value="90" 
          icon={<CheckCircle className="text-orange-400" size={20} strokeWidth={3} />} 
        />
        <StatCard 
          label="إجمالي المشاركين" 
          value="1050" 
          icon={<Users className="text-orange-500" size={20} strokeWidth={3} />} 
        />
      </div>

  
      <div className="bg-white  p-6 rounded-3xl  mb-8 relative">
        <h2 className="text-gray-800 font-black text-sm mb-6 text-right">طلبات انضمام المدربين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JoinRequestCard name="م. عبد الله علي" specialty="الذكاء الاصطناعي" />
          <JoinRequestCard name="د. محمود محمد" specialty="التسويق الإلكتروني" />
        </div>
      </div>

  
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-wrap gap-4 items-center mb-6 shadow-sm">
        <div className=" bg-[#FFF3EB] rounded-2xl relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="ابحث باسم الحصة أو المدرب..." 
            className="w-full bg-[#FDFCFB] border border-gray-100 rounded-xl py-2.5 pr-12 pl-4 text-xs outline-none focus:ring-1 focus:ring-orange-100"
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

    
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-6">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr style={{ backgroundColor: '#FFEFE6' }}>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right first:rounded-r-[2rem]">المدرب</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">اسم الحصة</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">التاريخ</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">الوقت</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">عدد الحضور</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">الأرباح</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-right">الحالة</th>
              <th className="p-5 text-[13px] font-black text-gray-800 text-center last:rounded-l-[2rem]">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {sessionsData.map((session, i) => (
              <tr key={i} className="hover:bg-[#FFF9F6] transition-colors group">
                <td className="p-5 border-b border-orange-100/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-orange-100 shadow-sm overflow-hidden flex-shrink-0">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="text-right">
                      <Link href='/adminDashboard/certificates/managelife' className="text-[12px] font-black text-gray-800 hover:text-[#FF6B00] transition-colors leading-tight">
                        عبد الرحمن محمود
                      </Link>
                      <p className="text-[9px] font-bold text-gray-400 mt-0.5">abdelrahmanmahmoud@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-[12px] border-b border-orange-500 font-black text-gray-600">{session.title}</td>
                <td className="p-5 text-[11px] border-b border-orange-500 font-bold text-gray-500">{session.date}</td>
                <td className="p-5 text-[11px] border-b border-orange-500 font-bold text-gray-500">{session.time}</td>
                <td className="p-5 text-[11px] border-b border-orange-500 font-bold text-gray-500">{session.attendance}</td>
                <td className="p-5 text-[11px] border-b border-orange-500 font-black text-gray-800">{session.earnings}</td>
                <td className="p-5 border-b border-orange-500">
                  <StatusBadge status={session.status} />
                </td>
                <td className="p-5 border-b border-orange-500 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="text-orange-500 hover:text-[#FF6B00] transition-colors"><Eye size={17} /></button>
                    <button className="text-orange-500 hover:text-[#FF6B00] transition-colors"><Edit3 size={17} /></button>
                    <button className="text-orange-500 hover:text-red-500 transition-colors"><Trash2 size={17} /></button>
                  </div>
                </td>
              </tr>
            ))}
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
  <div className="bg-white p-5 rounded-[1.8rem] border border-gray-50 flex items-center justify-between shadow-sm rounded-3xl">
    <div className="text-right">
      <p className="text-gray-400 text-[10px] font-black mb-1">{label}</p>
      <p className="text-lg font-black text-gray-800 leading-none">{value}</p>
    </div>
    <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-orange-50/50 min-w-[45px] flex justify-center">
      {icon}
    </div>
  </div>
);

const JoinRequestCard = ({ name, specialty }) => (
  <div className="bg-[#FFF3EB]  rounded-2xl p-3 flex items-center justify-between" dir='ltr'>
    <div className="flex items-center gap-3 order-1">
       <button className="p-2  rounded-xl text-orange-500 hover:text-green-500  transition-all"><CheckCircle size={16} /></button>
       <button className="p-2  rounded-xl text-orange-500 hover:text-blue-500  transition-all"><Users size={16} /></button>
       <button className="p-2  rounded-xl text-orange-500 hover:text-[#FF6B00]  transition-all"><Eye size={16} /></button>
    </div>
    <div className="flex items-center gap-3 order-2">
       <div className="text-right">
          <p className="text-[12px] font-black text-gray-800">{name}</p>
          <p className="text-[9px] font-bold text-gray-400">{specialty}</p>
       </div>
       <img src="https://i.pravatar.cc/150?u=b" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
 
  const s = status ? String(status).trim() : "";
  
  let bgColor = "#eeeeee"; 
  let textColor = "#333333";
  let label = s;

  if (s.includes("مجدول")) {
    bgColor = "#FF6B00";
    textColor = "#FFFFFF";
  } else if (s.includes("جار")) {
    bgColor = "#E11D48";
    textColor = "#FFFFFF";
  } else if (s.includes("منته")) {
    bgColor = "#1E293B";
    textColor = "#FFFFFF";
  } else {

    textColor = "#ffffff";
    label = s || "بيانات فارغة";
  }

  return (
    <span 
      style={{ backgroundColor: bgColor, color: textColor }}
      className="text-[10px] px-6 py-1.5 rounded-lg font-black block w-fit shadow-sm whitespace-nowrap mx-auto"
    >
      {label}
    </span>
  );
};

const FilterSelect = ({ label }) => (
  <div className="bg-[#FFF3EB] border border-gray-100 px-4 py-2.5 rounded-xl flex items-center gap-8 text-gray-500 text-[11px] font-black cursor-pointer hover:bg-gray-50 transition-colors">
    {label} <ChevronDown size={14} className="text-gray-400" />
  </div>
);

const PageBtn = ({ label, icon, active, orange }) => (
  <button className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all border outline-none
    ${active ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-orange-100' : 
      orange ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 
      'bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-[#FF6B00]'}`}>
    {label || icon}
  </button>
);

const sessionsData = [
  { title: "مقدمة في البرمجة", date: "13 مايو", time: "8:00 ص", attendance: "———", earnings: "———", status: "مجدولة" },
  { title: "تصميم واجهات المستخدم UI/UX", date: "12 مايو", time: "8:00 م", attendance: "120", earnings: "12,000 ج.م", status: "جارية" },
  { title: "أساسيات الشبكات", date: "11 مايو", time: "8:00 م", attendance: "540", earnings: "12,000 ج.م", status: "جارية" },
  { title: "كتابة المحتوى الإبداعي", date: "11 مايو", time: "8:00 م", attendance: "500", earnings: "12,000 ج.م", status: "منتهية" },
  { title: "تحليل البيانات باستخدام Python", date: "10 مايو", time: "8:00 م", attendance: "254", earnings: "12,000 ج.م", status: "منتهية" },
  { title: "التسويق الإلكتروني", date: "9 مايو", time: "8:00 م", attendance: "1000", earnings: "12,000 ج.م", status: "منتهية" },
  { title: "التسويق الإلكتروني", date: "9 مايو", time: "8:00 م", attendance: "1500", earnings: "12,000 ج.م", status: "منتهية" },
  { title: "التسويق الإلكتروني", date: "2 مايو", time: "8:00 م", attendance: "200", earnings: "12,000 ج.م", status: "منتهية" },
  { title: "التسويق الإلكتروني", date: "1 مايو", time: "8:00 م", attendance: "120", earnings: "12,000 ج.م", status: "منتهية" },
];