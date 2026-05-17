import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 text-sm text-gray-500">
        <div className="text-center sm:text-right order-2 sm:order-1">عرض البيانات من 1 إلى 9 من أصل 490 تكليف</div>
        <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center" dir="rtl">
            <button className="w-8 h-8 rounded border border-[#FF7300] text-[#FF7300] hover:bg-orange-50 flex items-center justify-center transition-colors">
                <ChevronRight size={18} />
            </button>
            <button className="w-8 h-8 rounded bg-[#FF7300] text-white font-medium flex items-center justify-center transition-colors shadow-sm">1</button>
            <button className="w-8 h-8 rounded border border-[#FF7300] text-[#FF7300] font-medium flex items-center justify-center hover:bg-orange-50 transition-colors">2</button>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-600 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">3</button>
            <button className="hidden xs:flex w-8 h-8 rounded border border-gray-200 text-gray-600 font-medium items-center justify-center hover:bg-gray-50 transition-colors">4</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-600 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">12</button>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>
    </div>
);
