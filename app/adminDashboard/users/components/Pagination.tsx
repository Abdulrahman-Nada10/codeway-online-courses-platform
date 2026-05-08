import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [1, 2, 3, 4, '...', 12]; 

  return (
    <div className="flex items-center gap-2" dir="ltr">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="p-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all
            ${page === currentPage 
              ? "bg-[#FF6B00] text-white" 
            : "text-[#333333] border border-[#FF6B00] hover:bg-orange-50"}
            ${page === '...' ? "cursor-default" : "cursor-pointer"}
          `}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="p-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
