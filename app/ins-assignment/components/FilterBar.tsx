import React from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

export const FilterBar = () => (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                placeholder="بحث بعنوان الدورة أو اسم الطالب..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-[#FF7300] transition-colors"
            />
        </div>

        {/* Dropdown */}
        <div className="relative w-full md:w-56 shrink-0">
            <select className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#FF7300] cursor-pointer transition-colors">
                <option>جميع الحالات</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Filter Button */}
        <button className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors font-medium w-full md:w-auto shrink-0">
            <Filter size={18} />
            <span>تحديد بيانات</span>
        </button>
    </div>
);
