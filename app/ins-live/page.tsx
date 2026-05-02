"use client";

import React, { useState } from "react";
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import { Plus, Search, ChevronDown, Filter, Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const sessionsData = [
  {
    id: 1,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png", // Replace with actual image path or generic icon
    views: null,
    duration: "2 ساعة",
    revenue: null,
    messages: 45,
    questions: 15,
    status: "مجدولة",
  },
  {
    id: 2,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: null,
    duration: "2 ساعة",
    revenue: null,
    messages: 45,
    questions: 15,
    status: "مجدولة",
  },
  {
    id: 3,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: 450,
    duration: "2 ساعة",
    revenue: "130,000 ج . م",
    messages: 45,
    questions: 15,
    status: "الان",
  },
  {
    id: 4,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: 450,
    duration: "2 ساعة",
    revenue: "130,000 ج . م",
    messages: 45,
    questions: 15,
    status: "انتهت",
  },
  {
    id: 5,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: 450,
    duration: "2 ساعة",
    revenue: "130,000 ج . م",
    messages: 45,
    questions: 15,
    status: "انتهت",
  },
  {
    id: 6,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: 450,
    duration: "2 ساعة",
    revenue: "130,000 ج . م",
    messages: 45,
    questions: 15,
    status: "انتهت",
  },
  {
    id: 7,
    title: "أساسيات تصميم واجهة المستخدم",
    image: "/figma-icon.png",
    views: 450,
    duration: "2 ساعة",
    revenue: "130,000 ج . م",
    messages: 45,
    questions: 15,
    status: "انتهت",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "مجدولة":
      return (
        <span className="bg-[#F59E0B] text-white px-5 py-1.5 rounded-full text-sm font-medium w-24 text-center inline-block">
          {status}
        </span>
      );
    case "الان":
      return (
        <span className="bg-[#E11D48] text-white px-5 py-1.5 rounded-full text-sm font-medium w-24 text-center inline-block">
          {status}
        </span>
      );
    case "انتهت":
      return (
        <span className="bg-[#1E293B] text-white px-5 py-1.5 rounded-full text-sm font-medium w-24 text-center inline-block">
          {status}
        </span>
      );
    default:
      return (
        <span className="bg-gray-500 text-white px-5 py-1.5 rounded-full text-sm font-medium w-24 text-center inline-block">
          {status}
        </span>
      );
  }
};

export default function InsLivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-[#FCF9F6] flex flex-col font-cairo">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">حصصي المباشرة</h1>
              <p className="text-gray-500 text-sm mt-1">إدارة الحصص المباشرة</p>
            </div>
            <button className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
              <Plus size={20} />
              <span>إضافة حصة جديدة</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-3 items-center">
            
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="بحث بإسم البث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fdfaf8] border border-[#f5ebe4] text-gray-700 py-2.5 pr-10 pl-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative shrink-0 w-full md:w-48">
              <select className="w-full appearance-none bg-[#fdfaf8] border border-[#f5ebe4] text-gray-700 py-2.5 pl-10 pr-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="all">جميع الحالات</option>
                <option value="scheduled">مجدولة</option>
                <option value="now">الان</option>
                <option value="ended">انتهت</option>
              </select>
              <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            <button className="flex items-center justify-center gap-2 bg-[#fdfaf8] hover:bg-orange-50 text-gray-700 px-4 py-2.5 rounded-lg border border-[#f5ebe4] transition-colors shrink-0 w-full md:w-auto">
              <Filter size={18} />
              <span className="text-sm font-medium">تحديد بيانات</span>
            </button>

          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#FCEAE1] border-b border-[#F97316] border-opacity-20 text-gray-800 text-sm font-bold">
                    <th className="py-4 px-6 font-bold w-1/4">الحصص</th>
                    <th className="py-4 px-6 font-bold text-center">المشاهدات</th>
                    <th className="py-4 px-6 font-bold text-center">المدة</th>
                    <th className="py-4 px-6 font-bold text-center">الإيرادات</th>
                    <th className="py-4 px-6 font-bold text-center">تفاعل</th>
                    <th className="py-4 px-6 font-bold text-center">الحالة</th>
                    <th className="py-4 px-6 font-bold text-center">التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionsData.map((session, index) => (
                    <tr 
                      key={session.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === sessionsData.length - 1 ? 'border-b-0' : ''}`}
                    >
                      {/* Course / Session Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                            {/* Assuming a generic icon representing Figma or similar inside the circle */}
                            <span className="text-white font-bold text-xs flex items-center justify-center w-full h-full">
                              <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                <span className="text-pink-400 text-[10px]">F</span>
                              </span>
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                            {session.title}
                          </span>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="py-4 px-6 text-center">
                        {session.views !== null ? (
                          <div className="flex items-center justify-center gap-1.5 text-gray-700 text-sm font-medium">
                            <span>{session.views}</span>
                            <Eye size={16} className="text-[#F97316]" />
                          </div>
                        ) : (
                          <span className="text-gray-400 font-bold">ـــــ</span>
                        )}
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-6 text-center">
                        <span className="text-gray-700 text-sm font-medium">{session.duration}</span>
                      </td>

                      {/* Revenue */}
                      <td className="py-4 px-6 text-center">
                        {session.revenue !== null ? (
                          <span className="text-gray-700 text-sm font-medium">{session.revenue}</span>
                        ) : (
                          <span className="text-gray-400 font-bold">ـــــ</span>
                        )}
                      </td>

                      {/* Interactions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <span className="text-[#F97316] text-xs font-semibold">
                            <span className="text-gray-900">{session.messages}</span> رسالة
                          </span>
                          <span className="text-[#F97316] text-xs font-semibold">
                            <span className="text-gray-900">{session.questions}</span> سؤال
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(session.status)}
                      </td>

                      {/* Controls */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-[#F97316] hover:text-orange-600 transition-colors p-1" title="عرض">
                            <Eye size={18} />
                          </button>
                          <button className="text-[#F97316] hover:text-orange-600 transition-colors p-1" title="تعديل">
                            <Pencil size={18} />
                          </button>
                          <button className="text-[#F97316] hover:text-red-600 transition-colors p-1" title="حذف">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
