'use client';

import { useEffect, useMemo } from 'react';
import { LiveSessionsHome } from './components/LiveSessionsHome';
import { LiveSessionAssistant } from './components/LiveSessionAssistant';
import { liveSessions } from './data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setContext } from '../../store/searchSlice';

export default function LiveSessionPage() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);

  useEffect(() => {
    dispatch(setContext('liveSession'));
  }, [dispatch]);

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return liveSessions;
    const lower = searchQuery.toLowerCase();
    return liveSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(lower) ||
        session.instructor.toLowerCase().includes(lower) ||
        (session.description ? session.description.toLowerCase().includes(lower) : false)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#fff3eb] overflow-x-hidden">
      <div className="lg:mr-20 xl:mr-64">
        <main className="px-3 pb-6 pt-26 sm:px-4 sm:pb-8 sm:pt-28 lg:px-8">
          <LiveSessionsHome sessions={filteredSessions} />
        </main>
      </div>
      <LiveSessionAssistant contextTitle="الحصص المباشرة" />
    </div>
  );
}
