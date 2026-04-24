'use client';

import { useEffect } from 'react';
import { LiveSession } from '../types';
import { LiveSessionAssistant } from './LiveSessionAssistant';
import { SessionDetails } from './liveSessionRoom/SessionDetails';
import { RoomInteractionPanel } from './liveSessionRoom/RoomInteractionPanel';
import { VideoPanel } from './liveSessionRoom/VideoPanel';
import { incrementSessionViewers, useLiveSessionMetrics } from './useLiveSessionMetrics';

export function LiveSessionRoom({ session }: { session: LiveSession }) {
  const { viewers, elapsedTime, totalDuration, setViewers } = useLiveSessionMetrics(session);

  useEffect(() => {
    if (session.category !== 'live') {
      return;
    }

    const joinedKey = `live-session-joined:${session.id}`;

    if (window.sessionStorage.getItem(joinedKey) === 'true') {
      return;
    }

    setViewers(incrementSessionViewers(session.id, viewers));
    window.sessionStorage.setItem(joinedKey, 'true');
  }, [session.category, session.id, setViewers, viewers]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff3eb]" dir="rtl">
      <div className="lg:mr-70 xl:mr-68 2xl:mr-75">
        <main className="px-3 pb-6 pt-24 sm:px-4 sm:pb-8 sm:pt-28 lg:px-6 xl:px-8">
          <div className="mx-auto max-w-370">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start 2xl:grid-cols-[minmax(0,1fr)_360px]" dir="ltr">
              <div className="space-y-4">
                <VideoPanel elapsedTime={elapsedTime} session={session} totalDuration={totalDuration} viewers={viewers} />
                <SessionDetails session={session} />
              </div>

              <RoomInteractionPanel session={session} />
            </div>
          </div>
        </main>
      </div>

      <LiveSessionAssistant contextTitle={session.title} />
    </div>
  );
}
