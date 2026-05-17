import React from 'react';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Assignment } from './types';

const statusMap: Record<string, { label: string; color: string }> = {
    review: { label: 'قيد المراجعة', color: 'bg-[#F5A623]' },
    completed: { label: 'مكتمل', color: 'bg-[#00B050]' },
    late: { label: 'متأخرة', color: 'bg-[#E53935]' },
};

export const AssignmentsTable = ({ data }: { data: Assignment[] }) => (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        {/* ── Desktop Table (hidden on mobile) ── */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right text-sm">
                <thead className="bg-[#FFF8F3] text-gray-800 border-b border-orange-100">
                    <tr>
                        <th className="p-4 font-semibold whitespace-nowrap">عنوان التكليف</th>
                        <th className="p-4 font-semibold whitespace-nowrap">الدورة</th>
                        <th className="p-4 font-semibold whitespace-nowrap">تاريخ الإنشاء</th>
                        <th className="p-4 font-semibold whitespace-nowrap">تاريخ الاستلام</th>
                        <th className="p-4 font-semibold whitespace-nowrap text-center">عدد التسليمات</th>
                        <th className="p-4 font-semibold whitespace-nowrap text-center">الحالة</th>
                        <th className="p-4 font-semibold whitespace-nowrap text-center">التحكم</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((assignment, idx) => (
                        <tr key={assignment.id} className={`${idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'} hover:bg-orange-50/30 transition-colors`}>
                            <td className="p-4 text-gray-800 font-medium">{assignment.title}</td>
                            <td className="p-4 text-gray-600">{assignment.course}</td>
                            <td className="p-4 text-gray-600">{assignment.createdAt}</td>
                            <td className="p-4 text-gray-600">{assignment.receivedAt}</td>
                            <td className="p-4 text-gray-600 text-center font-medium" dir="ltr">{assignment.submissions}</td>
                            <td className="p-4 text-center">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium text-white min-w-[100px] text-center ${statusMap[assignment.status]?.color}`}>
                                    {statusMap[assignment.status]?.label}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center justify-center gap-4">
                                    <Link href={`/ins-assignment/${assignment.id}`} className="text-[#FF7300] hover:text-orange-700 transition-colors">
                                        <Eye size={18} />
                                    </Link>
                                    <Link href={`/ins-assignment/${assignment.id}?edit=true`} className="text-[#FF7300] hover:text-orange-700 transition-colors">
                                        <SquarePen size={18} />
                                    </Link>
                                    <button className="text-red-500 hover:text-red-600 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* ── Mobile Card View (visible only on mobile) ── */}
        <div className="md:hidden divide-y divide-gray-100">
            {data.map((assignment, idx) => {
                const status = statusMap[assignment.status];
                return (
                    <div key={assignment.id} className={`p-4 ${idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
                        {/* Title + Status */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="text-sm font-bold text-gray-800 leading-relaxed flex-1">{assignment.title}</h3>
                            <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium text-white ${status?.color}`}>
                                {status?.label}
                            </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-3">
                            <div>
                                <span className="text-gray-400">الدورة</span>
                                <p className="text-gray-700 font-medium mt-0.5 truncate">{assignment.course}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">التسليمات</span>
                                <p className="text-gray-700 font-medium mt-0.5" dir="ltr">{assignment.submissions}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">تاريخ الإنشاء</span>
                                <p className="text-gray-700 font-medium mt-0.5">{assignment.createdAt}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">تاريخ الاستلام</span>
                                <p className="text-gray-700 font-medium mt-0.5">{assignment.receivedAt}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-5 pt-2 border-t border-gray-100">
                            <Link href={`/ins-assignment/${assignment.id}`} className="text-[#FF7300] hover:text-orange-700 transition-colors p-1">
                                <Eye size={18} />
                            </Link>
                            <Link href={`/ins-assignment/${assignment.id}?edit=true`} className="text-[#FF7300] hover:text-orange-700 transition-colors p-1">
                                <SquarePen size={18} />
                            </Link>
                            <button className="text-red-500 hover:text-red-600 transition-colors p-1">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);
