'use client';

import React from 'react';
import { FilterType, filters as filterOptions, allCourses } from '../data/courses';

interface FilterSectionProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white rounded-2xl p-2 sm:p-3 lg:p-4 
                flex flex-col sm:grid sm:grid-cols-2 
                lg:flex lg:flex-row 
                gap-2 sm:gap-3 border border-gray-200">
        {filterOptions.map((filter) => {
          const count = allCourses.filter(course => {
            if (filter.id === 'all') return true;
            return course.category === filter.id;
          }).length;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`
                group relative
                w-full
                lg:flex-1
                min-h-11 sm:min-h-12 lg:min-h-14
                px-3 sm:px-4 lg:px-6
                rounded-xl
                font-cairo font-semibold
                text-xs sm:text-sm lg:text-lg
                flex items-center justify-center gap-2 sm:gap-3
                transition-all duration-300
                border
                ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-[#FF6400] to-[#FF8C42] text-white border-transparent shadow-md'
                    : 'bg-white text-[#113555] border-gray-300 hover:border-[#FF6400] hover:shadow-sm'
                }
              `}
            >
              <span className="truncate">{filter.label}</span>

              <span
                className={`
                  text-[10px] sm:text-xs
                  px-2 sm:px-3 py-0.5 sm:py-1
                  rounded-full
                  transition-all duration-300
                  shrink-0
                  ${
                    activeFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-orange-50'
                  }
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;

