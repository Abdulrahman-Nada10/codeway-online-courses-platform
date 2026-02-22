'use client';

import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery, setStatusFilter } from '../store/courseSlice';
import { selectSearchQuery, selectStatusFilter } from '../store/selectors';
import type { CourseStatus } from '../store/types';

type FilterValue = CourseStatus | 'all';

const statusOptions: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'active', label: 'نشط' },
  { value: 'pending', label: 'قيد المراجعة' },
  { value: 'inactive', label: 'غير نشط' },
];

export function CourseFilters() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const statusFilter = useAppSelector(selectStatusFilter);

  const handleRefresh = () => {
    dispatch(setSearchQuery(''));
    dispatch(setStatusFilter('all'));
  };

  return (
    <div className="flex items-center gap-3 flex-wrap" role="search" aria-label="فلترة الدورات">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] sm:min-w-[220px]">
        <Search
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="بحث بإسم الدورة..."
          aria-label="البحث عن دورة"
          className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
        />
      </div>

      {/* Status Filter */}
      <div className="relative min-w-[140px] sm:min-w-[160px]">
        <SlidersHorizontal
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          aria-hidden="true"
        />
        <select
          value={statusFilter}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as FilterValue))}
          aria-label="فلتر الحالة"
          className="w-full appearance-none pr-9 pl-8 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 cursor-pointer transition-all"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">▾</span>
      </div>

      {/* Refresh */}
      <button
        onClick={handleRefresh}
        aria-label="تحديث البيانات"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all active:scale-95 whitespace-nowrap"
      >
        <RefreshCw size={15} aria-hidden="true" />
        <span className="hidden sm:inline">تحديث بيانات</span>
      </button>
    </div>
  );
}