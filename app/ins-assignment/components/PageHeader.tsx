import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const PageHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">التكليفات</h1>
            <p className="text-gray-500 text-sm mt-1">إدارة مهام و تمارين الطلاب</p>
        </div>
        <Link href="/ins-assignment/add-assignment" className="flex items-center justify-center gap-2 bg-[#FF7300] hover:bg-[#E66800] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto">
            <Plus size={20} />
            <span>إضافة التكليف</span>
        </Link>
    </div>
);
