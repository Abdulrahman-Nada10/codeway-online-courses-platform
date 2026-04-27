'use client';

import React from 'react';
import { FilterType, filters as filterOptions, allCourses } from '../data/courses';

interface FilterSectionProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="mb-4 sm:mb-6 relative right-6">
      <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:p-3 lg:flex lg:flex-row lg:p-4">
        {filterOptions.map((filter) => {
          const count = allCourses.filter((course) => {
            if (filter.id === 'all') return true;
            return course.category === filter.id;
          }).length;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`
                group relative flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3
                font-cairo text-xs font-semibold transition-all duration-300 sm:min-h-12 sm:px-4 sm:text-sm lg:min-h-14 lg:flex-1 lg:px-6 lg:text-lg
                ${
                  activeFilter === filter.id
                    ? 'border-transparent bg-linear-to-r from-[#FF6400] to-[#FF8C42] text-white shadow-md'
                    : 'border-gray-300 bg-white text-[#113555] hover:border-[#FF6400] hover:shadow-sm'
                }
              `}
            >
              <span className="truncate">{filter.label}</span>

              <span
                className={`
                  shrink-0 rounded-full px-2 py-0.5 text-[10px] transition-all duration-300 sm:px-4 sm:py-1 sm:text-xs
                  ${activeFilter === filter.id ? 'text-white' : 'text-black group-hover:bg-orange-50'}
                `}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
