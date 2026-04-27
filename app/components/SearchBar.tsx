'use client';

import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuery, searchThunk } from '../store/searchSlice';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);
  const context = useAppSelector((state) => state.search.context);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  // Debounced search: trigger API thunk 300ms after user stops typing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length > 0 && context) {
      debounceRef.current = setTimeout(() => {
        dispatch(searchThunk({ query, context }));
      }, 300);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, context, dispatch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="البحث..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2.5 pr-11 rounded-xl bg-[#FFF3EB] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6400] focus:ring-opacity-50 text-sm"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;

