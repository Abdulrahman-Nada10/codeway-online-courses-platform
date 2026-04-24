'use client';

import { useMemo, useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { liveSessions } from '../data';
import { SessionTab } from '../types';
import { LiveSessionTabs } from './LiveSessionTabs';
import { SessionCard } from './SessionCard';

export function LiveSessionsHome() {
  const [activeTab, setActiveTab] = useState<SessionTab>('live');

  const groupedSessions = useMemo(
    () => ({
      upcoming: liveSessions.filter((session) => session.category === 'upcoming'),
      live: liveSessions.filter((session) => session.category === 'live'),
      past: liveSessions.filter((session) => session.category === 'past'),
    }),
    [],
  );

  const visibleSessions = groupedSessions[activeTab];

  return (
    <div className="mx-auto max-w-375 xl:mr-0 lg:mr-40">
      <div className="mb-5 text-right sm:mb-6 ">
        <h1 className="text-2xl font-bold text-[#113555] sm:text-3xl ">حصصي المباشرة</h1>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-[#6b7280] sm:text-sm">
          تابع الجلسات القادمة أو انتقل مباشرة إلى البث المفتوح الآن.
        </p>
      </div>

      <LiveSessionTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        counts={{
          upcoming: groupedSessions.upcoming.length,
          live: groupedSessions.live.length,
          past: groupedSessions.past.length,
        }}
      />

      {visibleSessions.length ? (
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 2xl:grid-cols-3">
          {visibleSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-[0_10px_35px_rgba(17,53,85,0.08)] sm:mt-12 sm:p-12">
          <CircleHelp className="mx-auto h-12 w-12 text-[#d6d3d1] sm:h-14 sm:w-14" />
          <p className="mt-4 text-base text-[#6b7280] sm:text-lg">لا توجد جلسات متاحة في هذا القسم حالياً.</p>
        </div>
      )}
    </div>
  );
}
