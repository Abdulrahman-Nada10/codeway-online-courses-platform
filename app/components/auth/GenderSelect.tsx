"use client"; // لازم عشان هنستخدم State

import React, { useState } from 'react';

export const GenderSelect = () => {
  // الحالة الافتراضية ذكر زي الصورة
  const [selected, setSelected] = useState<'male' | 'female'>('male');

  return (
    <div className="w-full space-y-3 pt-2">
      {/* العنوان الصغير */}
      <label className="text-sm font-bold text-secondary block text-right pr-1">النوع:</label>
      
      <div className="flex gap-6">
        {/* اختيار ذكر */}
        <label 
          className={`flex-1 flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all duration-300
            ${selected === 'male' 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-[#FFD8BF] bg-input-bg hover:bg-white hover:border-primary/30'}`}
        >
          <div className="flex items-center gap-3">
            {/* الدائرة الخاصة بالـ Radio */}
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
              ${selected === 'male' ? 'border-primary' : 'border-gray-300'}`}>
              {selected === 'male' && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <span className={`text-sm font-bold ${selected === 'male' ? 'text-primary' : 'text-gray-500'}`}>
              ذكر
            </span>
          </div>
          <input 
            type="radio" 
            name="gender" 
            className="hidden" 
            checked={selected === 'male'} 
            onChange={() => setSelected('male')} 
          />
        </label>

        {/* اختيار أنثى */}
        <label 
          className={`flex-1 flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all duration-300
            ${selected === 'female' 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-[#FFD8BF] bg-input-bg hover:bg-white hover:border-primary/30'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
              ${selected === 'female' ? 'border-primary' : 'border-gray-300'}`}>
              {selected === 'female' && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <span className={`text-sm font-bold ${selected === 'female' ? 'text-primary' : 'text-gray-500'}`}>
              أنثى
            </span>
          </div>
          <input 
            type="radio" 
            name="gender" 
            className="hidden" 
            checked={selected === 'female'} 
            onChange={() => setSelected('female')} 
          />
        </label>
      </div>
    </div>
  );
};