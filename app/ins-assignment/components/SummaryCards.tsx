import React from 'react';
import { FileText, FileEdit, FileCheck, FileX } from 'lucide-react';

const cards = [
    { label: 'إجمالي المهام و التمارين', value: '490', Icon: FileText },
    { label: 'المهام و التمارين قيد المراجعة', value: '150', Icon: FileEdit },
    { label: 'المهام و التمارين تم التصحيح', value: '300', Icon: FileCheck },
    { label: 'المهام و التمارين متأخرة', value: '40', Icon: FileX },
];

export const SummaryCards = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map(({ label, value, Icon }) => (
            <div key={label} className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-2">
                <div className="flex flex-col text-right min-w-0">
                    <span className="text-gray-500 text-[11px] sm:text-sm font-medium mb-1 leading-tight">{label}</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-800">{value}</span>
                </div>
                <div className="bg-orange-50 p-2.5 sm:p-3.5 rounded-full text-[#FF7300] shrink-0">
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                </div>
            </div>
        ))}
    </div>
);
