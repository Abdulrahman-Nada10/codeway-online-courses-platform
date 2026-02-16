'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/searchSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="البحث..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2.5 pr-11 rounded-xl bg-[#FFF3EB] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6400] focus:ring-opacity-50 text-sm"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;

