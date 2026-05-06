"use client"
import React from 'react';
import { Download, ChevronDown, Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



const dataPie = [
  { name: 'البرمجة', value: 35, color: '#F37335' },
  { name: 'التصميم', value: 25, color: '#FFC107' },
  { name: 'التسويق', value: 15, color: '#8BC34A' },
  { name: 'الذكاء الاصطناعي', value: 10, color: '#795548' },
  { name: 'إدارة الأعمال', value: 10, color: '#827717' },
  { name: 'أخرى', value: 5, color: '#2E7D32' },
];

export default function StatisticsDashboard() {
  return (
    <div className="p-6 bg-[#FDF4EE] min-h-screen text-right" dir="ltr">


      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-3">
          <button className="bg-[#FF6B00] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg shadow-orange-200/50 outline-none focus:outline-none">
            <Download size={16} />
        
        
          </button>
          <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-xl flex items-center gap-8 text-gray-500 text-xs font-black cursor-pointer shadow-sm">
            آخر 6 أشهر <ChevronDown size={18} className="text-gray-400" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-800">الإحصائيات والتقارير</h1>
          <p className="text-gray-400 text-[11px] font-bold mt-1">تقارير تفصيلية عن أداء المنصة</p>
        </div>
      </div>

   
   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" dir='rtl'>
        <StatCard label="المستخدمين الجدد" value="1,548" subText="150% من الشهر السابق" icon={<Users className="text-orange-400" size={20} />} trend="up" />
        <StatCard label="الدورات المباعة" value="586" subText="12% من الشهر السابق" icon={<BookOpen className="text-orange-400" size={20} />} trend="up" />
        <StatCard label="إجمالي الإيرادات" value="470,568 ج.م" subText="8% من الشهر السابق" icon={<DollarSign className="text-orange-400" size={20} />} trend="down" />
        <StatCard label="معدل النمو" value="20%" subText="5% تحسن" icon={<TrendingUp className="text-orange-400" size={20} />} trend="up" />
      </div>

 
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    
    
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h2 className="text-right font-black text-gray-800 text-sm mb-6">توزيع الدورات حسب التصنيف</h2>
          <div className="relative h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dataPie} 
                  innerRadius={0} // 
                  
                  outerRadius={85} 
                  dataKey="value" 
                  startAngle={90} 
                  endAngle={450}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend Matching Image */}
          <div className="space-y-2 mt-6">
            {dataPie.map((item) => (
              <div key={item.name} className="flex items-center justify-end gap-3">
                <span className="text-[10px] font-bold text-gray-400 order-1">{item.value}%</span>
                <span className="text-[11px] font-black text-gray-700 order-2">{item.name}</span>
                <div className="w-2.5 h-2.5 rounded-full order-3" style={{ backgroundColor: item.color }}></div>
              </div>
            ))}
          </div>
        </div>

    
    
        <div className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h2 className="text-right font-black text-gray-800 text-sm mb-4">الإيرادات والتسجيلات الشهرية</h2>
          <div className="h-[300px] w-full flex items-center justify-center text-gray-200 font-bold border-2 border-dashed border-gray-50 rounded-[2rem]">
           
           
            مساحة الرسم البياني الخطي
          </div>
        </div>
      </div>


      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10" dir='rtl'>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50" dir='ltr'>
          <h2 className="text-right font-black text-gray-800 text-sm mb-6">أفضل الدورات أداءً</h2>
    <div className="flex flex-col gap-3 ">
        
  {[...Array(6)].map((_, i) => (
    <div key={i} className='bg-[#FFF3EB] rounded-2xl'>
      <CourseRow />
    </div>
  ))}
</div>
         </div>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50" dir='ltr'>
          <h2 className="text-right font-black text-gray-800 text-sm mb-6">أفضل المدربين</h2>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) =>(
             <div key={i} className='bg-[#FFF3EB] rounded-2xl' >
             <InstructorRow/>
             </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



const StatCard = ({ label, value, subText, icon, trend }) => (
  <div className="bg-white p-5 rounded-[1.8rem] border border-gray-50 flex items-center justify-between shadow-sm">
    <div className="text-right">
      <p className="text-gray-400 text-[10px] font-black mb-1">{label}</p>
      <p className="text-lg font-black text-gray-800 mb-1">{value}</p>
      <p className={`text-[9px] font-black flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : 'text-red-400'}`}>
        {trend === 'up' ? '↗' : '↘'} {subText}
      </p>
    </div>
    <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-orange-50">{icon}</div>
  </div>
);

const CourseRow = () => (
  <div className="flex items-center justify-between p-4 bg-[#FFF9F6]/60 rounded-2xl border border-orange-50/50">
    <div className="text-left">
      <p className="text-[12px] font-black text-gray-800" dir='rtl'>136,550 ج.م</p>
      <p className="text-[9px] font-black text-green-500 text-right italic">↗ 15%</p>
    </div>
    <div className="text-right">
      <p className="text-[12px] font-black text-gray-800 leading-tight">تصميم واجهات المستخدم UI&UX</p>
      <p className="text-[10px] font-bold text-gray-400">550 طالب</p>
    </div>
  </div>
);

const InstructorRow = () => (
  <div className="flex items-center justify-between p-4 bg-[#FFF9F6]/60 rounded-2xl border border-orange-50/50">
    <p className="text-[12px] font-black text-gray-800" dir='rtl'> 136,550 ج.م </p>
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-[12px] font-black text-gray-800">م. عبد الله علي</p>
        <p className="text-[10px] font-bold text-gray-400">9 دورات | 1125 طالب</p>
      </div>
      <img src="https://cdn.prod.website-files.com/643e89c2fc0b09a30ab40ca7/678cafa3486c5eebf1861ea1_IA-gnrant-photo-LinkedIn-professionnelle-studio.webp" className="w-10 h-10 rounded-full  shadow-sm" alt="avatar" />
    </div>
  </div>
);