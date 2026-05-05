"use client";

import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, Filter, Users, UserCheck, 
  UserPlus, Clock, Eye, Edit,  
} from 'lucide-react';
import Specialtie from './Specialtie'

export default function TrainersManagement() {

  const [activeSection, setActiveSection] = useState<string | null>('spec');

  const handleToggle = (name: string) => {
    setActiveSection(activeSection === name ? null : name);
  };

  return (
    <div className="p-8 bg-[#F9F1E9] min-h-screen font-sans" dir="rtl">
      
  
      <div className="mb-8 text-right">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">إدارة المدربين</h1>
        <p className="text-gray-400 text-sm mb-6 font-medium">عرض وإدارة جميع المدربين في المنصة</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" dir="ltr">
           <StatCard title="طلبات الانضمام" value="2" icon={<UserPlus size={18}/>} />
           <StatCard title="طلبات الاهتمام" value="2" icon={<Clock size={18}/>} />
           <StatCard title="المدربون النشطون" value="90" icon={<UserCheck size={18}/>} />
           <StatCard title="إجمالي المدربين" value="105" icon={<Users size={18}/>} />
        </div>
      </div>

    
      <div className="mb-8 bg-white rounded-[2rem] p-6 shadow-sm border border-orange-50">
        <h3 className="font-bold text-gray-700 mb-5 text-sm text-right">طلبات انضمام المدربين</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map(i => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.01 }}
              className="bg-[#FFF9F6] p-4 rounded-2xl border border-orange-50 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-orange-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">م. عبد الله علي</p>
                  <p className="text-[11px] text-gray-400">الذكاء الاصطناعي</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="p-2 bg-[#FFF9F6] text-orange-500 border border-orange-50 rounded-xl hover:bg-orange-500 hover:text-white transition-all"><Eye size={16}/></button>
                <button className="p-2 bg-[#FFF9F6] text-orange-500 border border-orange-50 rounded-xl hover:bg-orange-500 hover:text-white transition-all"><UserPlus size={16}/></button>
                <button className="p-2 bg-[#FFF9F6] text-orange-500 border border-orange-50 rounded-xl hover:bg-orange-500 hover:text-white transition-all"><Edit size={16}/></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

  
      <div className="flex items-center gap-4 mb-6 bg-white p-7 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="بحث بالإسم أو التخصص أو البريد الإلكتروني..." 
            className="w-full bg-[#FFF9F6] border border-[#F3E0D5] rounded-xl py-3 pr-12 text-sm outline-none shadow-sm focus:ring-2 focus:ring-orange-100 text-right"
          />
        </div>

        <FilterBtn label="التخصصات" active={activeSection === 'spec'} onClick={() => handleToggle('spec')} />
        <FilterBtn label="جميع الحالات" active={activeSection === 'status'} />
        
        <button 
         
          className={`flex items-center gap-2 border px-5 py-3 rounded-xl text-[13px] font-bold transition-all shadow-sm ${activeSection === 'selection' ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 'bg-white border-[#F3E0D5] text-gray-600 hover:bg-white'}`}
          >
          <Filter size={16} /> <span>تحديد بيانات</span>
        </button>
      </div>

     
      <AnimatePresence mode="wait">
        {activeSection === 'spec' && <Specialtie />}

      </AnimatePresence>

    </div>
  );
}


const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-orange-50 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-[#FFF5F0] p-3 rounded-xl text-[#FF6B00] border border-orange-50">{icon}</div>
    <div className="text-right">
      <p className="text-[11px] text-gray-400 font-bold mb-1">{title}</p>
      <p className="text-2xl font-black text-gray-800 tracking-tight">{value}</p>
    </div>
  </div>
);
const FilterBtn = ({ label, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`min-w-[150px] border rounded-xl px-5 py-3 flex items-center justify-between text-[13px] font-bold transition-all shadow-sm ${active ? 'bg-orange-50 border-orange-300 text-orange-600 ring-2 ring-orange-50' : 'bg-[#FFF9F6] border-[#F3E0D5] text-gray-600 hover:bg-white'}`}
  >
    <motion.div animate={{ rotate: active ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} /></motion.div>
    <span>{label}</span>
  </button>
);

const ActionBtn = ({ icon, color }: any) => (
  <button className={`p-2 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all ${color}`}>
    {icon}
  </button>
);