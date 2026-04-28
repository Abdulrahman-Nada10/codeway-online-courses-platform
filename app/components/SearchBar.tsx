'use client';

import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '../hooks/useLocaleDirection';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuery, searchThunk } from '../store/searchSlice';

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);
  const context = useAppSelector((state) => state.search.context);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

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
    <div className="relative" dir={dir}>
      <input
        type="text"
        placeholder={t('nav.searchPlaceholder')}
        value={query}
        onChange={handleChange}
        className="w-full rounded-xl bg-[#FFF3EB] px-4 py-2.5 text-start text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6400] focus:ring-opacity-50 rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
      />

      <div className="absolute top-1/2 -translate-y-1/2 rtl:right-4 ltr:left-4">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
