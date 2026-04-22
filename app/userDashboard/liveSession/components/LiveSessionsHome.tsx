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
    <div className="mx-auto max-w-375">
      <div className="mb-6 text-right">
        <h1 className="text-3xl font-bold text-[#113555]">حصصي المباشرة</h1>
        <p className="mt-2 text-sm text-[#6b7280]">تابع الجلسات القادمة أو انتقل مباشرة إلى البث المفتوح الآن.</p>
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
        <div className="mt-6 grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
          {visibleSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-4xl bg-white p-12 text-center shadow-[0_10px_35px_rgba(17,53,85,0.08)]">
          <CircleHelp className="mx-auto h-14 w-14 text-[#d6d3d1]" />
          <p className="mt-4 text-lg text-[#6b7280]">لا توجد جلسات متاحة في هذا القسم حالياً.</p>
        </div>
      )}
    </div>
  );
}
