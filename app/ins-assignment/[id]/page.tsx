"use client";

import React, { useState, useEffect } from 'react';
import NavbarInstructor from '../../components/NavbarInstructor';
import SidebarInstructor from '../../components/ui/SidebarInstructor';
import { ArrowRight, FileText, ExternalLink, Filter, MessageSquare, ClipboardEdit, Eye, ChevronLeft, ChevronRight, SquarePen, Star, Users, AlertCircle, Download, Save, Upload, ChevronDown, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AssignmentDetailsPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<'submissions' | 'peer-reviews'>('peer-reviews');
    const [gradingStudent, setGradingStudent] = useState<any>(null);
    const [viewingReview, setViewingReview] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showEditSuccess, setShowEditSuccess] = useState(false);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const searchParams = useSearchParams();

    // Auto-open edit mode if ?edit=true is in the URL
    useEffect(() => {
        if (searchParams.get('edit') === 'true') {
            setIsEditing(true);
        }
    }, [searchParams]);

    // Pre-filled assignment data for editing
    const [editData, setEditData] = useState({
        title: 'تمرين 1: استخدام المتغيرات',
        description: 'في هذا التمرين، ستتعلم كيفية استخدام المتغيرات في لغة Python لتخزين البيانات والتعامل معها. قم بحل الأسئلة التالية مع مراعاة كتابة كود منظم وواضح.',
        course: 'data-analysis',
        lesson: 'l1',
        marks: '20',
        deadline: '24-01-2026',
        resubmitCount: '3',
        peerReview: true,
    });

    const handleEditSave = () => {
        setShowEditSuccess(true);
        setTimeout(() => {
            setShowEditSuccess(false);
            setIsEditing(false);
        }, 2000);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    return (
        <>
            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0.9) translateY(10px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
            <SidebarInstructor collapsed={isSidebarCollapsed} onCollapse={setIsSidebarCollapsed} />
            <div className={`min-h-screen bg-[#FDF9F6] flex flex-col transition-all duration-200 ease-in-out ${isSidebarCollapsed ? 'md:mr-[72px]' : 'md:mr-64'}`} dir="rtl">
                <NavbarInstructor />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {gradingStudent ? (
                        <div className="max-w-5xl mx-auto w-full">
                            {/* Grading Header */}
                            <div className="flex justify-start items-center gap-3 mb-6">
                                <button onClick={() => setGradingStudent(null)} className="text-[#FF7300] hover:bg-orange-50 p-1.5 rounded-lg transition-colors">
                                    <ArrowRight size={24} />
                                </button>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-800">تمرين 1: استخدام المتغيرات</h1>
                            </div>

                            {/* Top Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 flex flex-col gap-4 sm:gap-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src="https://i.pravatar.cc/150?img=11" alt="Student" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                                        <span className="font-bold text-gray-800 text-base sm:text-lg">{gradingStudent.name}</span>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl border border-orange-300 text-gray-800 hover:bg-orange-50 transition-colors font-medium text-sm sm:text-base">
                                        <AlertCircle size={18} className="text-gray-800" />
                                        <span>ابلاغ</span>
                                    </button>
                                </div>
                                
                                <div className="h-px bg-gray-100 w-full"></div>

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <FileText size={18} className="text-gray-600 shrink-0" />
                                        <span className="text-gray-800 font-medium text-sm sm:text-base truncate">تمرين استخدام المتغيرات (PDF)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 shrink-0">
                                        <ExternalLink size={18} className="hover:text-orange-600 cursor-pointer transition-colors" />
                                        <Download size={18} className="hover:text-orange-600 cursor-pointer transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 mb-8">
                                    <div className="flex flex-col gap-3 w-full sm:w-1/3 sm:max-w-[250px]">
                                        <label className="text-gray-800 font-bold text-sm">الدرجة</label>
                                        <input 
                                            type="text" 
                                            defaultValue="15" 
                                            className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-3 outline-none focus:border-orange-300 w-full text-gray-800"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 w-full sm:w-1/3 sm:max-w-[250px]">
                                        <label className="text-gray-800 font-bold text-sm">الدرجة الكاملة</label>
                                        <span className="text-gray-800 font-medium text-lg px-1">20</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <label className="text-gray-800 font-bold text-sm">التعليق</label>
                                    <textarea 
                                        rows={5}
                                        placeholder="اكتب تعليقا لحل الطالب"
                                        className="bg-[#FFF8F3] border border-orange-100 rounded-xl p-4 outline-none focus:border-orange-300 w-full text-gray-800 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-start">
                                <button 
                                    onClick={() => {
                                        alert("تم حفظ الدرجة بنجاح");
                                        setGradingStudent(null);
                                    }}
                                    className="bg-[#FF7300] hover:bg-orange-600 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium shadow-sm w-full sm:w-auto"
                                >
                                    <span>حفظ التغييرات</span>
                                    <Save size={20} />
                                </button>
                            </div>
                        </div>
                    ) : viewingReview ? (
                        <div className="max-w-5xl mx-auto w-full">
                            {/* Reviewing Header */}
                            <div className="flex justify-start items-center gap-3 mb-6">
                                <button onClick={() => setViewingReview(null)} className="text-[#FF7300] hover:bg-orange-50 p-1.5 rounded-lg transition-colors">
                                    <ArrowRight size={24} />
                                </button>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-800">تمرين 1: استخدام المتغيرات</h1>
                            </div>
                            
                            {/* Users connection card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-8 py-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 relative">
                                <div className="flex items-center gap-3 sm:gap-4 z-10 bg-white">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Reviewer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base sm:text-lg text-gray-800">المُراجِع</span>
                                        <span className="text-gray-500 text-sm sm:text-base">{viewingReview.reviewer || 'محمد محمود'}</span>
                                    </div>
                                </div>
                                
                                {/* Connecting Arrow */}
                                <div className="hidden sm:flex absolute inset-0 justify-center items-center pointer-events-none">
                                    <div className="flex items-center text-[#FF7300] w-1/3 max-w-[200px]">
                                        <div className="h-[2px] flex-1 bg-[#FF7300]"></div>
                                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[12px] border-r-[#FF7300]"></div>
                                    </div>
                                </div>
                                {/* Mobile Arrow */}
                                <div className="sm:hidden flex items-center justify-center text-[#FF7300] rotate-90">
                                    <div className="flex items-center w-12">
                                        <div className="h-[2px] flex-1 bg-[#FF7300]"></div>
                                        <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[10px] border-r-[#FF7300]"></div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 z-10 bg-white">
                                    <img src="https://i.pravatar.cc/150?img=12" alt="Owner" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base sm:text-lg text-gray-800">صاحب المهمة</span>
                                        <span className="text-gray-500 text-sm sm:text-base">{viewingReview.owner || 'احمد محمود'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Content Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-gray-800 font-bold text-sm">التقييم</span>
                                        <div className="flex gap-1" dir="ltr">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star 
                                                    key={star} 
                                                    size={18} 
                                                    className={star <= (viewingReview?.rating || 0) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        <span className="text-gray-800 font-bold text-sm text-left">تاريخ التقييم</span>
                                        <span className="text-gray-500 text-sm text-left">30-12-2025</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-3 mt-8">
                                    <span className="text-gray-800 font-bold text-sm">التعليق</span>
                                    <p className="text-gray-600 mt-1">
                                        "عمل جيد، لكن يحتاج إلى تحسين في تنظيف البيانات"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : isEditing ? (
                        <div className="max-w-4xl mx-auto w-full">
                            {/* Edit Success Modal */}
                            {showEditSuccess && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
                                    <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-gray-100" style={{ animation: 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                                            <CheckCircle2 className="w-10 h-10 text-green-500 relative z-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">تم التعديل بنجاح!</h3>
                                        <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">
                                            تم تعديل بيانات التكليف بنجاح.
                                        </p>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ animation: 'progress 2s linear forwards' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Edit Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <button onClick={handleEditCancel} className="text-[#FF7300] hover:bg-orange-50 p-1.5 rounded-lg transition-colors">
                                        <ArrowRight size={24} />
                                    </button>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">تعديل التكليف</h1>
                                        <p className="text-gray-400 mt-1 text-sm">تعديل بيانات التمرين الحالي</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Card 1: Basic Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                                <div className="mb-6 flex flex-col items-start">
                                    <h2 className="text-xl font-bold text-gray-900">المعلومات الأساسية</h2>
                                    <p className="text-gray-400 text-sm mt-1">تعديل المعلومات الأساسية للمهمة او التمرين</p>
                                </div>

                                <form className="space-y-6">
                                    {/* Title */}
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="edit-title" className="block text-sm font-bold text-gray-800 mb-2">عنوان التكليف</label>
                                        <input
                                            type="text"
                                            id="edit-title"
                                            value={editData.title}
                                            onChange={(e) => setEditData({...editData, title: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm text-right placeholder-gray-400"
                                            placeholder="أدخل عنوان المهمة او التمرين"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="edit-description" className="block text-sm font-bold text-gray-800 mb-2">وصف التكليف</label>
                                        <textarea
                                            id="edit-description"
                                            rows={4}
                                            value={editData.description}
                                            onChange={(e) => setEditData({...editData, description: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors resize-y text-sm text-right placeholder-gray-400"
                                            placeholder="أدخل وصف تفصيلي للمهمة او التمرين"
                                        ></textarea>
                                    </div>

                                    {/* Row 1: Course, Lesson, Grade */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="edit-course" className="block text-sm font-bold text-gray-800 mb-2">الدورة التابعة</label>
                                            <div className="relative w-full">
                                                <select
                                                    id="edit-course"
                                                    value={editData.course}
                                                    onChange={(e) => setEditData({...editData, course: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors appearance-none text-sm text-gray-700 text-right pr-4 pl-10"
                                                >
                                                    <option value="" disabled>اختر الدورة التابعة</option>
                                                    <option value="data-analysis">دورة تحليل البيانات باستخدام python</option>
                                                    <option value="ui-ux">تصميم واجهات المستخدم</option>
                                                    <option value="web-dev">برمجة الويب</option>
                                                </select>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="edit-lesson" className="block text-sm font-bold text-gray-800 mb-2">الدرس</label>
                                            <div className="relative w-full">
                                                <select
                                                    id="edit-lesson"
                                                    value={editData.lesson}
                                                    onChange={(e) => setEditData({...editData, lesson: e.target.value})}
                                                    className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors appearance-none text-sm text-gray-700 text-right pr-4 pl-10"
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
                                            <label htmlFor="edit-marks" className="block text-sm font-bold text-gray-800 mb-2">إجمالي درجة المهمة</label>
                                            <input
                                                type="text"
                                                id="edit-marks"
                                                value={editData.marks}
                                                onChange={(e) => setEditData({...editData, marks: e.target.value})}
                                                className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm placeholder-gray-400 text-right"
                                                placeholder="ادخل الدرجة بالارقام"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Date, Resubmission */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="edit-deadline" className="block text-sm font-bold text-gray-800 mb-2">تاريخ الاستلام</label>
                                            <input
                                                type="text"
                                                id="edit-deadline"
                                                value={editData.deadline}
                                                onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                                                className="w-full px-4 py-3 rounded-lg border-none bg-[#FDF6EF] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 transition-colors text-sm text-gray-600 text-right"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label htmlFor="edit-resubmit" className="block text-sm font-bold text-gray-800 mb-2">إعادة التسليم</label>
                                            <input
                                                type="text"
                                                id="edit-resubmit"
                                                value={editData.resubmitCount}
                                                onChange={(e) => setEditData({...editData, resubmitCount: e.target.value})}
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
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={editData.peerReview}
                                                onChange={(e) => setEditData({...editData, peerReview: e.target.checked})}
                                            />
                                            <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#FF6B00] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-6 peer-checked:after:border-white"></div>
                                        </label>
                                    </div>
                                </form>
                            </div>

                            {/* Form Card 2: Attachments */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                                <div className="mb-6 flex flex-col items-start">
                                    <h2 className="text-xl font-bold text-gray-900">المرفقات والملفات</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* Current Assignment File */}
                                    <div className="flex flex-col items-start">
                                        <label className="block text-sm font-bold text-gray-800 mb-3">ملف التكليف الحالي</label>
                                        <div className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-[#FDF6EF] mb-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <FileText className="text-[#FF7300] shrink-0" size={20} />
                                                <span className="text-gray-700 font-medium text-sm truncate">تمرين استخدام المتغيرات (PDF)</span>
                                            </div>
                                            <button type="button" className="text-red-400 hover:text-red-600 transition-colors shrink-0 p-1">
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center bg-white hover:border-[#FF6B00]/50 transition-colors cursor-pointer">
                                            <button type="button" className="flex items-center gap-2 px-6 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] transition-colors mb-3">
                                                <Upload className="w-4 h-4" />
                                                <span className="font-medium text-sm">استبدال الملف</span>
                                            </button>
                                            <span className="text-xs text-gray-400">ملفات بصيغة PDF, DOC, PPT, ZIP</span>
                                        </div>
                                    </div>

                                    {/* Current Solution File */}
                                    <div className="flex flex-col items-start">
                                        <label className="block text-sm font-bold text-gray-800 mb-3">ملف الحل الحالي</label>
                                        <div className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-[#FDF6EF] mb-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <FileText className="text-[#FF7300] shrink-0" size={20} />
                                                <span className="text-gray-700 font-medium text-sm truncate">حل تمرين استخدام المتغيرات (PDF)</span>
                                            </div>
                                            <button type="button" className="text-red-400 hover:text-red-600 transition-colors shrink-0 p-1">
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center bg-white hover:border-[#FF6B00]/50 transition-colors cursor-pointer">
                                            <button type="button" className="flex items-center gap-2 px-6 py-2 border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] transition-colors mb-3">
                                                <Upload className="w-4 h-4" />
                                                <span className="font-medium text-sm">استبدال الملف</span>
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
                                    onClick={handleEditCancel}
                                    className="px-8 py-2.5 bg-white border border-[#FF6B00] text-[#FF6B00] rounded-lg hover:bg-[#FFF9F5] font-bold text-sm transition-colors w-full sm:w-auto text-center"
                                >
                                    الغاء
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEditSave}
                                    className="px-8 py-2.5 bg-[#FF6B00] text-white rounded-lg hover:bg-[#e66000] font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>حفظ التغييرات</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto w-full">
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <Link href="/ins-assignment" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-2 font-medium text-sm">
                                <span>التكليفات</span>
                                <ArrowRight size={18} />
                            </Link>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">التكليف</h1>
                            <p className="text-gray-500 text-sm">إدارة مهمة او تمرين الطلاب</p>
                        </div>
                        <button onClick={() => setIsEditing(true)} className="bg-[#FF7300] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm w-full sm:w-auto justify-center">
                            <span className="font-medium">تعديل المهمة</span>
                            <SquarePen size={18} />
                        </button>
                    </div>

                    {/* Main Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">تمرين 1: استخدام المتغيرات</h2>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <span className="bg-[#F59E0B] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">قيد المراجعة</span>
                                <span className="bg-[#10B981] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">مراجعة الزملاء مفعل</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base shrink-0">تاريخ الاستلام</span>
                                <span>:</span>
                                <span className="font-medium text-gray-800">24-01-2026</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base shrink-0">الدورة التابعة</span>
                                <span>:</span>
                                <span className="font-medium text-gray-800">دورة تحليل البيانات باستخدام python</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base shrink-0">تاريخ الانشاء</span>
                                <span>:</span>
                                <span className="font-medium text-gray-800">30-12-2025</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base shrink-0">الدرس</span>
                                <span>:</span>
                                <span className="font-medium text-gray-800">الدرس الاول</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-800 mb-3">وصف التكليف</h3>
                            <p className="text-gray-600 leading-relaxed">
                                في هذا التمرين، ستتعلم كيفية استخدام المتغيرات في لغة Python لتخزين البيانات والتعامل معها. قم بحل الأسئلة التالية مع مراعاة كتابة كود منظم وواضح.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-start gap-2 sm:gap-4 mt-6">
                            <span className="bg-[#FFF3E5] text-[#FF7300] px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium">اجمالي الدرجة من 20</span>
                            <span className="bg-[#FFF3E5] text-[#FF7300] px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium">عدد مرات إعادة التسليم 3</span>
                        </div>
                    </div>

                    {/* Assignment Data Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">بيانات التكليف</h2>
                        
                        <div className="mb-8">
                            <h3 className="text-gray-500 mb-3 font-medium">عدد التكليفات المستلمة</h3>
                            <p className="font-medium text-gray-800 text-lg">15 من 30</p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 mb-4 font-medium">ملفات التكليف</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors group gap-2">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <FileText className="text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" size={20} />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base truncate">تمرين استخدام المتغيرات (PDF)</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors group gap-2">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <FileText className="text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" size={20} />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base truncate">حل تمرين استخدام المتغيرات (PDF)</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons Box */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-8 flex gap-2 sm:gap-4">
                        <button 
                            onClick={() => setActiveTab('peer-reviews')}
                            className={`flex-1 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-colors shadow-sm ${
                                activeTab === 'peer-reviews' 
                                    ? 'bg-[#FF7300] text-white' 
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            مراجعة الزملاء
                        </button>
                        <button 
                            onClick={() => setActiveTab('submissions')}
                            className={`flex-1 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-colors shadow-sm ${
                                activeTab === 'submissions' 
                                    ? 'bg-[#FF7300] text-white' 
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            التكليفات المستلمة
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="mb-6">
                        <div className="flex justify-start mb-4">
                            <button className="flex items-center gap-2 border border-orange-200 text-[#FF7300] px-5 py-2.5 rounded-xl bg-white hover:bg-orange-50 transition-colors font-medium">
                                <span>تحديد بيانات</span>
                                <Filter size={18} />
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {activeTab === 'submissions' ? (<>
                                {/* Desktop Table */}
                                <table className="w-full text-right hidden md:table">
                                    <thead className="bg-[#FBE9DC] text-gray-700 font-semibold border-b border-orange-200">
                                        <tr>
                                            <th className="p-5 pr-8">الطالب</th>
                                            <th className="p-5">تاريخ التسليم</th>
                                            <th className="p-5 text-center">الدرجة</th>
                                            <th className="p-5 text-center">الحالة</th>
                                            <th className="p-5 text-center">التحكم</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { name: 'محمد محمود', date: '30-12-2025', score: '-', status: 'جاري مراجعتها', statusColor: 'bg-[#F59E0B]' },
                                            { name: 'محمد محمود', date: '30-12-2025', score: '-', status: 'معلقة', statusColor: 'bg-[#DC2626]' },
                                            { name: 'محمد محمود', date: '30-12-2025', score: '20', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                            { name: 'محمد محمود', date: '30-12-2025', score: '15', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                            { name: 'محمد محمود', date: '30-12-2025', score: '10', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                            { name: 'محمد محمود', date: '30-12-2025', score: '18', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                        ].map((student, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-5 pr-8 font-medium text-gray-800">{student.name}</td>
                                                <td className="p-5 text-gray-600">{student.date}</td>
                                                <td className="p-5 text-center font-medium text-gray-800">{student.score}</td>
                                                <td className="p-5 text-center">
                                                    <span className={`${student.statusColor} text-white px-4 py-1.5 rounded-full text-xs font-medium inline-block min-w-[100px] text-center`}>
                                                        {student.status}
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center justify-center gap-4">
                                                        {student.status !== 'تمت تصحيحها' && (
                                                            <>
                                                                <button className="text-[#FF7300] hover:text-orange-700 transition-colors">
                                                                    <MessageSquare size={18} />
                                                                </button>
                                                                <button onClick={() => setGradingStudent(student)} className="text-[#FF7300] hover:text-orange-700 transition-colors">
                                                                    <ClipboardEdit size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button className="text-[#FF7300] hover:text-orange-700 transition-colors">
                                                            <Eye size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {[
                                        { name: 'محمد محمود', date: '30-12-2025', score: '-', status: 'جاري مراجعتها', statusColor: 'bg-[#F59E0B]' },
                                        { name: 'محمد محمود', date: '30-12-2025', score: '-', status: 'معلقة', statusColor: 'bg-[#DC2626]' },
                                        { name: 'محمد محمود', date: '30-12-2025', score: '20', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                        { name: 'محمد محمود', date: '30-12-2025', score: '15', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                        { name: 'محمد محمود', date: '30-12-2025', score: '10', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                        { name: 'محمد محمود', date: '30-12-2025', score: '18', status: 'تمت تصحيحها', statusColor: 'bg-[#10B981]' },
                                    ].map((student, idx) => (
                                        <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-bold text-gray-800 text-sm">{student.name}</span>
                                                <span className={`${student.statusColor} text-white px-3 py-1 rounded-full text-[11px] font-medium`}>
                                                    {student.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                <span>التسليم: {student.date}</span>
                                                <span>الدرجة: <span className="font-bold text-gray-800">{student.score}</span></span>
                                            </div>
                                            <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                                                {student.status !== 'تمت تصحيحها' && (
                                                    <>
                                                        <button className="text-[#FF7300] hover:text-orange-700 transition-colors"><MessageSquare size={16} /></button>
                                                        <button onClick={() => setGradingStudent(student)} className="text-[#FF7300] hover:text-orange-700 transition-colors"><ClipboardEdit size={16} /></button>
                                                    </>
                                                )}
                                                <button className="text-[#FF7300] hover:text-orange-700 transition-colors"><Eye size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>) : (<>
                                {/* Desktop Table */}
                                <table className="w-full text-right hidden md:table">
                                    <thead className="bg-[#FBE9DC] text-gray-700 font-semibold border-b border-orange-200">
                                        <tr>
                                            <th className="p-5 pr-8">المراجع</th>
                                            <th className="p-5">صاحب المهمة</th>
                                            <th className="p-5 text-center">التقييم</th>
                                            <th className="p-5 text-center">الحالة</th>
                                            <th className="p-5 text-center">التحكم</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 4, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                            { reviewer: '-', owner: 'محمد محمود', rating: null, status: 'معلقة', statusColor: 'bg-[#DC2626]', showUsersIcon: true },
                                            { reviewer: '-', owner: 'محمد محمود', rating: null, status: 'قيد المراجعة', statusColor: 'bg-[#F59E0B]', showUsersIcon: true },
                                            { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 5, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                            { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 2, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                            { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 3, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                        ].map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-5 pr-8 font-medium text-gray-800">{item.reviewer}</td>
                                                <td className="p-5 text-gray-600 font-medium">{item.owner}</td>
                                                <td className="p-5 text-center">
                                                    {item.rating ? (
                                                        <div className="flex items-center justify-center gap-1 font-medium text-gray-800">
                                                            <Star size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                                                            <span>{item.rating}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500 font-medium">-</span>
                                                    )}
                                                </td>
                                                <td className="p-5 text-center">
                                                    <span className={`${item.statusColor} text-white px-4 py-1.5 rounded-full text-xs font-medium inline-block min-w-[100px] text-center`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center justify-center gap-4">
                                                        {item.showUsersIcon && (
                                                            <button className="text-[#FF7300] hover:text-orange-700 transition-colors"><Users size={18} /></button>
                                                        )}
                                                        <button onClick={() => setViewingReview(item)} className="text-[#FF7300] hover:text-orange-700 transition-colors"><Eye size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {[
                                        { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 4, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                        { reviewer: '-', owner: 'محمد محمود', rating: null, status: 'معلقة', statusColor: 'bg-[#DC2626]', showUsersIcon: true },
                                        { reviewer: '-', owner: 'محمد محمود', rating: null, status: 'قيد المراجعة', statusColor: 'bg-[#F59E0B]', showUsersIcon: true },
                                        { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 5, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                        { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 2, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                        { reviewer: 'محمد محمود', owner: 'محمد محمود', rating: 3, status: 'تمت مراجعتها', statusColor: 'bg-[#10B981]', showUsersIcon: false },
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] text-gray-400">المراجع</span>
                                                    <span className="font-bold text-gray-800 text-sm">{item.reviewer}</span>
                                                </div>
                                                <span className={`${item.statusColor} text-white px-3 py-1 rounded-full text-[11px] font-medium`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                <span>صاحب المهمة: <span className="font-medium text-gray-700">{item.owner}</span></span>
                                                {item.rating ? (
                                                    <div className="flex items-center gap-1 font-medium text-gray-800">
                                                        <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                                                        <span>{item.rating}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">بدون تقييم</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                                                {item.showUsersIcon && (
                                                    <button className="text-[#FF7300] hover:text-orange-700 transition-colors"><Users size={16} /></button>
                                                )}
                                                <button onClick={() => setViewingReview(item)} className="text-[#FF7300] hover:text-orange-700 transition-colors"><Eye size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>)}
                            
                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-[#FDF9F6] border-t border-gray-100 gap-3">
                                <div className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
                                    عرض البيانات من 1 إلى 6 من أصل 30 ملف مستلم
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
                                        <ChevronRight size={14} />
                                    </button>
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-[#FF7300] text-white font-medium text-xs sm:text-sm">
                                        1
                                    </button>
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:text-[#FF7300] hover:border-orange-200 transition-colors font-medium text-xs sm:text-sm">
                                        2
                                    </button>
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:text-[#FF7300] hover:border-orange-200 transition-colors font-medium text-xs sm:text-sm">
                                        3
                                    </button>
                                    <span className="text-gray-500 text-xs sm:text-sm px-0.5">...</span>
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:text-[#FF7300] hover:border-orange-200 transition-colors font-medium text-xs sm:text-sm">
                                        6
                                    </button>
                                    <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-[#FF7300] text-white hover:bg-orange-600 transition-colors">
                                        <ChevronLeft size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    )}
                </main>
            </div>
        </>
    );
}
