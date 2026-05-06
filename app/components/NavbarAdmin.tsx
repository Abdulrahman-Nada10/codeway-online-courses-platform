// components/NavbarAdmin.tsx
import { Search, Bell, Menu } from 'lucide-react';

export default function NavbarAdmin() {
  return (
   
<nav 
  className="w-[calc(100%-48px)] mx-10 mt-6 h-20 bg-white rounded-[2rem] flex items-center justify-between px-6 shadow-sm border border-orange-50/50" 
  style={{ marginRight: '50px', marginLeft: '24px' }} 
  dir="ltr"
>
    
      <div className="flex items-center gap-4 shrink-0 " style={{marginLeft:'60px'}}>
      
        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          <div className="text-right">
            <h4 className="text-[13px] font-bold text-slate-800">محمد محمود</h4>
            <p className="text-[10px] text-orange-500 font-semibold leading-none mt-1">مشرف النظام</p>
          </div>
          <div className="w-10 h-10 rounded-[15px] overflow-hidden bg-gray-100 border border-gray-100">
            <img src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        
        <button className="p-3 bg-white rounded-[15px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-400 hover:text-orange-500 transition-all border border-gray-50">
          <Bell size={20} />
        </button>
      </div>

      
      <div className="hidden md:flex flex-1 justify-center px-10">
        <div className="relative w-full max-w-[500px]">
          <input
            type="text"
            placeholder="البحث عن دروس، مدربين..."
            className="w-full bg-[#F9F1E9] border-none rounded-[18px] py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-gray-400 text-slate-600"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

 
    </nav>
  );
}