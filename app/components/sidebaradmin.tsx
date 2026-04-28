// components/layout/Sidebar.tsx
import { LayoutDashboard, Users, GraduationCap, BookOpen, CreditCard, FileText, Award, Settings, LogOut } from 'lucide-react';
import Logo from'/public/logo.png'
const menuItems = [
  { name: 'نظرة عامة', icon: LayoutDashboard, active: true },
  { name: 'المستخدمون', icon: Users },
  { name: 'المدربون', icon: GraduationCap },
  { name: 'الدورات', icon: BookOpen },
  { name: 'المدفوعات', icon: CreditCard },
  { name: 'التقارير', icon: FileText },
  { name: 'الشهادات', icon: Award },
];

export default function Sidebar() {
  return (
    <aside className=" h-screen w-64  bg-white flex flex-col border-l border-gray-100 py-8">
      <div className="px-14 ml-10 mb-10   font-bold text-[#E9611D]">
       <img src="/logo.png" alt="logo"  />
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active ? 'bg-[#FFF2EB] text-[#E9611D]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 pt-10 border-t border-gray-50 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500">
          <Settings size={20} />
          <span>الإعدادات</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500">
          <LogOut size={20} />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
}