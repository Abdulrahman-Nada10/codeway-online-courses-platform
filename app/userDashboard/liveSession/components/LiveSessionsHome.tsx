'use client';

import { useMemo, useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { SessionTab, LiveSession } from '../types';
import { LiveSessionTabs } from './LiveSessionTabs';
import { SessionCard } from './SessionCard';

interface LiveSessionsHomeProps {
  sessions: LiveSession[];
}

export function LiveSessionsHome({ sessions }: LiveSessionsHomeProps) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const [activeTab, setActiveTab] = useState<SessionTab>('live');

  const groupedSessions = useMemo(
    () => ({
      upcoming: sessions.filter((session) => session.category === 'upcoming'),
      live: sessions.filter((session) => session.category === 'live'),
      past: sessions.filter((session) => session.category === 'past'),
    }),
    [sessions]
  );

  const visibleSessions = groupedSessions[activeTab];

  return (
    <div className="mx-auto max-w-375 rtl:lg:mr-40 rtl:xl:mr-0 ltr:lg:ml-40 ltr:xl:ml-0" dir={dir}>
      <div className="mb-5 text-start sm:mb-6">
        <h1 className="text-2xl font-bold text-[#113555] dark:text-slate-100 sm:text-3xl">
          {t('session.myLiveSessions')}
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-[#6b7280] dark:text-slate-400 sm:text-sm">
          {t('session.liveSessionSubtitle')}
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
        <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-[0_10px_35px_rgba(17,53,85,0.08)] dark:bg-slate-900 dark:shadow-[0_10px_35px_rgba(0,0,0,0.25)] sm:mt-12 sm:p-12">
          <CircleHelp className="mx-auto h-12 w-12 text-[#d6d3d1] sm:h-14 sm:w-14" />
          <p className="mt-4 text-base text-[#6b7280] dark:text-slate-400 sm:text-lg">
            {t('session.noSessionsAvailable')}
          </p>
        </div>
      )}
    </div>
  );
}
