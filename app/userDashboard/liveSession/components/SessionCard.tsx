'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Eye, Radio, User, Users } from 'lucide-react';
import { LiveSession } from '../types';
import { SessionCountdown } from './SessionCountdown';
import { incrementSessionViewers, useLiveSessionMetrics } from './useLiveSessionMetrics';

function formatDuration(startTime?: string, endTime?: string) {
  if (!startTime || !endTime) {
    return '00:00:00';
  }

  const diff = Math.max(0, new Date(endTime).getTime() - new Date(startTime).getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, '0')).join(':');
}

function formatEndedSince(endTime?: string) {
  if (!endTime) {
    return 'انتهت منذ قليل';
  }

  const diffMs = Date.now() - new Date(endTime).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 24) {
    return diffHours <= 1 ? 'انتهت منذ قليل' : `انتهت منذ ${diffHours} ساعات`;
  }

  return `انتهت منذ ${Math.floor(diffHours / 24)} أيام`;
}

function LiveBadge({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div
      className={`absolute right-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold ${
        muted ? 'border border-[#717171] bg-[#e6e6e6] text-black' : 'bg-[#eb001b] text-white'
      }`}
    >
      {label}
    </div>
  );
}

export function SessionCard({ session }: { session: LiveSession }) {
  const href = `/userDashboard/liveSession/${session.slug}`;
  const { viewers, setViewers } = useLiveSessionMetrics(session);
  const liveCardTimeLabel = session.durationLabel ?? '42:15';

  const handleJoinLive = () => {
    if (session.category !== 'live') {
      return;
    }

    setViewers(incrementSessionViewers(session.id, viewers));
    window.sessionStorage.setItem(`live-session-joined:${session.id}`, 'true');
  };

  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_35px_rgba(17,53,85,0.08)] transition-transform hover:-translate-y-1">
      <div className="relative aspect-video">
        <Image src={session.image} alt={session.title} fill className="object-cover" />
        {session.category === 'live' ? <LiveBadge label="مباشرة الآن" /> : null}
        {session.category === 'past' ? <LiveBadge label="تم الانتهاء" muted /> : null}
      </div>

      <div className="space-y-4 p-5 text-right">
        <div>
          <h3 className="line-clamp-2 text-xl font-bold leading-9 text-[#113555]">{session.title}</h3>
          <p className="mt-2 flex items-center justify-end gap-2 text-sm text-[#6b7280]">
            <span>{session.instructor}</span>
            <User className="h-4 w-4" />
          </p>
        </div>

        {session.category === 'upcoming' && session.startTime ? <SessionCountdown startTime={session.startTime} /> : null}

        {session.category === 'live' ? (
          <div className="flex flex-wrap justify-end gap-2">
            <div className="flex items-center gap-2 rounded-full border border-[#ff6400] bg-[#fff3eb] px-4 py-2 text-sm text-[#113555]">
              <span>{viewers} متعلم</span>
              <Users className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#ff6400] bg-[#fff3eb] px-4 py-2 text-sm text-[#113555]">
              <span>{liveCardTimeLabel}</span>
              <Clock3 className="h-4 w-4" />
            </div>
          </div>
        ) : null}

        {session.category === 'past' ? (
          <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2 rounded-full border border-[#ff6400] bg-[#fff3eb] px-3 py-3 text-[#113555]">
              <span>{session.viewers ?? 0} مشاهدة</span>
              <Eye className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full border border-[#ff6400] bg-[#fff3eb] px-3 py-3 text-[#113555]">
              <span>{formatDuration(session.startTime, session.endTime)}</span>
              <Clock3 className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center rounded-full border border-[#717171] bg-[#e6e6e6] px-3 py-3 text-black">
              <span>{formatEndedSince(session.endTime)}</span>
            </div>
          </div>
        ) : null}

        <Link
          href={href}
          onClick={handleJoinLive}
          className={`flex h-12 items-center justify-center rounded-2xl text-base font-semibold transition-colors ${
            session.category === 'upcoming'
              ? 'bg-[#fee0cd] text-white hover:bg-[#ffb68c]'
              : 'bg-[#ff6400] text-white hover:bg-[#eb5c00]'
          }`}
        >
          {session.category === 'past' ? 'عرض التسجيل' : 'انضم الآن'}
        </Link>

        {session.category === 'live' ? (
          <div className="flex items-center justify-end gap-2 text-xs font-medium text-[#eb001b]">
            <span>{liveCardTimeLabel}</span>
            <Radio className="h-3.5 w-3.5" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
