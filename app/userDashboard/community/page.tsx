'use client';

import React, { useState } from 'react';
import { Search, Users, ArrowLeft, Atom } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const filters = ['الكل', 'غير مقروء', 'نشط الآن', 'المدرب', 'مفضل'];
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const communities = [
    {
      id: 1,
      title: 'مجتمع React الأساسي',
      subtitle: 'تطوير الواجهات بـ React',
      unreadCount: 4,
      lastMessageAuthor: 'أحمد ك.',
      lastMessageText: 'هل أحد جرب Hook الـ useReducer مع Context؟',
      membersCount: 248,
      lastActive: 'منذ 5 د',
      category: 'نشط الآن',
    },
    {
      id: 2,
      title: 'مجتمع Node.js المتقدم',
      subtitle: 'تطوير الواجهات الخلفية',
      unreadCount: 0,
      lastMessageAuthor: 'سارة م.',
      lastMessageText: 'كيف يمكن تحسين أداء قواعد البيانات؟',
      membersCount: 150,
      lastActive: 'منذ 10 د',
      category: 'مفضل',
    },
    {
      id: 3,
      title: 'مجتمع UI/UX',
      subtitle: 'تصميم واجهات المستخدم',
      unreadCount: 2,
      lastMessageAuthor: 'خالد ي.',
      lastMessageText: 'أفضل أدوات التصميم في 2024؟',
      membersCount: 320,
      lastActive: 'منذ ساعتين',
      category: 'مفضل',
    },
    {
      id: 4,
      title: 'مجتمع JavaScript',
      subtitle: 'أساسيات البرمجة',
      unreadCount: 0,
      lastMessageAuthor: 'أستاذ محمد',
      lastMessageText: 'تم رفع المادة العلمية الجديدة',
      membersCount: 410,
      lastActive: 'منذ يوم',
      category: 'المدرب',
    },
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.title.includes(searchQuery) || community.subtitle.includes(searchQuery);
    
    if (activeFilter === 'الكل') return matchesSearch;
    if (activeFilter === 'غير مقروء') return matchesSearch && community.unreadCount > 0;
    
    return matchesSearch && community.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden mt-22 lg:mt-26">
      <div className="lg:mr-75">
        <div className="max-w-6xl mx-auto p-4 md:p-8 font-cairo">
      {/* Header */}
      <div className="mb-6 text-right">
        <h1 className="text-3xl font-bold text-[#000000] mb-2">المجتمع</h1>
        <p className="text-gray-500 text-sm">تواصل، اسأل، وشارك مع طلاب دوراتك</p>
      </div>

      {/* Search and info container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-right">
          <h2 className="text-xl font-bold text-[#000000] mb-2">مجتمعاتك ({filteredCommunities.length})</h2>
          <p className="text-gray-500 text-sm">كل دورة تنضم إليها تفتح لك مجتمعها الخاص للنقاش والأسئلة وتبادل المعرفة.</p>
        </div>
        
        <div className="w-full md:w-[400px] flex justify-end">
           <div className="relative w-full">
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="البحث..." 
               className="w-full bg-[#FFF5EF] text-gray-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#FF6400] text-sm"
             />
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-end">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-sm ${
              filter === activeFilter
                ? 'bg-[#FF6400] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommunities.map((community) => (
          <div key={community.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                 <div className="bg-[#FFF5EF] p-3 rounded-full text-[#FF6400]">
                   <Atom className="w-6 h-6" />
                 </div>
                 <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-[#000000]">{community.title}</h3>
                      {community.unreadCount > 0 && (
                        <span className="bg-[#0B6E23] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {community.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{community.subtitle}</p>
                 </div>
              </div>
            </div>

            {/* Last Message Box */}
            <div className="bg-[#FFF5EF] rounded-2xl p-5 mb-6 text-right">
              <p className="text-xs text-gray-500 mb-2">آخر رسالة • {community.lastMessageAuthor}</p>
              <p className="text-sm font-bold text-gray-800">{community.lastMessageText}</p>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center text-sm pt-2">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-xs font-medium">{community.membersCount} عضو • {community.lastActive}</span>
                <Users className="w-4 h-4" />
              </div>

              <Link href={`/userDashboard/community/${community.id}`} className="flex items-center gap-2 text-[#FF6400] font-bold hover:-translate-x-1 transition-transform">
                <span className="text-sm">دخول</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
        {filteredCommunities.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            لا توجد مجتمعات تطابق بحثك.
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}
