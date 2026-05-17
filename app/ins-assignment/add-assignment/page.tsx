"use client";

import React, { useState } from 'react';
import NavbarInstructor from '@/app/components/NavbarInstructor';
import SidebarInstructor from '@/app/components/ui/SidebarInstructor';
import { ChevronDown, Upload, Save, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateAssignmentPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleCancel = () => {
        router.push('/ins-assignment');
    };

    const handleSave = () => {
        setShowSuccess(true);
        // Redirect after 2 seconds
        setTimeout(() => {
            router.push('/ins-assignment');
        }, 2000);
    };

    return (
        <>
            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0.9) translateY(10px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 2s linear forwards;
                }
            `}</style>

            <SidebarInstructor collapsed={isSidebarCollapsed} onCollapse={setIsSidebarCollapsed} />
            <div className={`min-h-screen bg-[#FDF9F6] flex flex-col transition-all duration-200 ease-in-out ${isSidebarCollapsed ? 'md:mr-[72px]' : 'md:mr-64'}`}>
                <NavbarInstructor />
                
                <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8 font-sans">
                    {/* Success Modal Overlay */}
                    {showSuccess && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 animate-scale-in border border-gray-100">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
                                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                                    <CheckCircle2 className="w-10 h-10 text-green-500 relative z-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">تم الحفظ بنجاح!</h3>
                                <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">
                                    تم إضافة التكليف الجديد الخاص بك بنجاح، جاري تحويلك لصفحة الواجبات الآن...
                                </p>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-green-500 h-1.5 rounded-full animate-progress"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto pt-4">
                        {/* Header */}
                        <div className="mb-8 flex flex-col items-start">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إضافة تكليف جديد</h1>
                            <p className="text-gray-400 mt-1 text-sm">أدخل بيانات التمرين الجديدة</p>
                        </div>

                        {/* Form Card 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                            <div className="mb-6 flex flex-col items-start">
                                <h2 className="text-xl font-bold text-gray-900">المعلومات الأساسية</h2>
                                <p className="text-gray-400 text-sm mt-1">أدخل المعلومات الأساسية للمهمة او التمرين</p>
                            </div>

                            <form className="space-y-6">
                                {/* Title */}
                                <div className="flex flex-col items-start">
                                    <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2">
                                        عنوان التكليف
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm text-right placeholder-gray-400"
                                        placeholder="أدخل عنوان المهمة او التمرين"
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col items-start">
                                    <label htmlFor="description" className="block text-sm font-bold text-gray-800 mb-2">
                                        وصف التكليف
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors resize-y text-sm text-right placeholder-gray-400"
                                        placeholder="أدخل وصف تفصيلي للمهمة او التمرين"
                                    ></textarea>
                                </div>

                                {/* Row 1: Course, Lesson, Grade */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="course" className="block text-sm font-bold text-gray-800 mb-2">
                                            الدورة التابعة
                                        </label>
                                        <div className="relative w-full">
                                            <select
                                                id="course"
                                                className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors appearance-none text-sm text-gray-400 text-right pr-4 pl-10"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>اختر الدورة التابعة</option>
                                                <option value="ui-ux">تصميم واجهات المستخدم</option>
                                                <option value="web-dev">برمجة الويب</option>
                                            </select>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronDown className="w-5 h-5 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="lesson" className="block text-sm font-bold text-gray-800 mb-2">
                                            الدرس
                                        </label>
                                        <div className="relative w-full">
                                            <select
                                                id="lesson"
                                                className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors appearance-none text-sm text-gray-400 text-right pr-4 pl-10"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>اختر الدرس</option>
                                                <option value="l1">الدرس الأول</option>
                                                <option value="l2">الدرس الثاني</option>
                                            </select>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronDown className="w-5 h-5 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="marks" className="block text-sm font-bold text-gray-800 mb-2">
                                            إجمالي درجة المهمة
                                        </label>
                                        <input
                                            type="text"
                                            id="marks"
                                            className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm placeholder-gray-400 text-right"
                                            placeholder="ادخل الدرجة بالارقام"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Date, Resubmission */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="deadline" className="block text-sm font-bold text-gray-800 mb-2">
                                            تاريخ الاستلام
                                        </label>
                                        <input
                                            type="text"
                                            id="deadline"
                                            defaultValue="30-12-2025"
                                            className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm text-gray-600 text-right"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="resubmit" className="block text-sm font-bold text-gray-800 mb-2">
                                            إعادة التسليم
                                        </label>
                                        <input
                                            type="text"
                                            id="resubmit"
                                            className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm placeholder-gray-400 text-right"
                                            placeholder="ادخل عدد مرات إعادة التسليم"
                                        />
                                    </div>
                                    <div className="hidden md:block"></div>
                                </div>

                                {/* Peer Review Toggle */}
                                <div className="flex items-center justify-start gap-4 pt-4 mt-6">
                                    <span className="text-sm font-bold text-gray-900">مراجعة الزملاء</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#FF6B00] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-6 peer-checked:after:border-white"></div>
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Card 2: Attachments */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                            <div className="mb-6 flex flex-col items-start">
                                <h2 className="text-xl font-bold text-gray-900">المرفقات والملفات</h2>
                            </div>

                            <div className="space-y-8">
                                {/* Attachment 1 */}
                                <div className="flex flex-col items-start">
                                    <label className="block text-sm font-bold text-gray-800 mb-3">رفع التكليف</label>
                                    <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center bg-white hover:border-[#FF6B00]/50 transition-colors cursor-pointer">
                                        <button type="button" className="flex items-center gap-2 px-6 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] transition-colors mb-3">
                                            <Upload className="w-4 h-4" />
                                            <span className="font-medium text-sm">رفع الملفات</span>
                                        </button>
                                        <span className="text-xs text-gray-400">ملفات بصيغة PDF, DOC, PPT, ZIP</span>
                                    </div>
                                </div>

                                {/* Attachment 2 */}
                                <div className="flex flex-col items-start">
                                    <label className="block text-sm font-bold text-gray-800 mb-3">رفع الحل</label>
                                    <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:border-[#FF6B00]/50 transition-colors cursor-pointer">
                                        <button type="button" className="flex items-center gap-2 px-6 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] transition-colors mb-3">
                                            <Upload className="w-4 h-4" />
                                            <span className="font-medium text-sm">رفع الملفات</span>
                                        </button>
                                        <span className="text-xs text-gray-400">ملفات بصيغة PDF, DOC, PPT, ZIP</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mb-10">
                            <button 
                                type="button" 
                                onClick={handleCancel}
                                className="px-8 py-2.5 bg-white border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] font-bold text-sm transition-colors w-full sm:w-auto text-center"
                            >
                                الغاء
                            </button>
                            <button 
                                type="button" 
                                onClick={handleSave}
                                className="px-8 py-2.5 bg-[#FF6B00] text-white rounded-lg hover:bg-[#e66000] font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <Save className="w-4 h-4" />
                                <span>حفظ التغييرات</span>
                            </button>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
