'use client';

import { useEffect, useMemo, useState } from 'react';
import { LiveSession } from '../types';

const VIEWERS_STORAGE_KEY = 'live-session-viewers';

function formatClock(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, '0')).join(':');
}

function getClampedNow(endTime?: string) {
  const now = Date.now();

  if (!endTime) {
    return now;
  }

  return Math.min(now, new Date(endTime).getTime());
}

function readStoredViewers(sessionId: number, fallback: number) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = window.localStorage.getItem(`${VIEWERS_STORAGE_KEY}:${sessionId}`);
  return stored ? Number(stored) : fallback;
}

export function incrementSessionViewers(sessionId: number, currentValue: number) {
  if (typeof window === 'undefined') {
    return currentValue + 1;
  }

  const nextValue = readStoredViewers(sessionId, currentValue) + 1;
  window.localStorage.setItem(`${VIEWERS_STORAGE_KEY}:${sessionId}`, String(nextValue));
  return nextValue;
}

export function useLiveSessionMetrics(session: LiveSession) {
  const [viewers, setViewers] = useState(session.viewers ?? 0);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    setViewers(readStoredViewers(session.id, session.viewers ?? 0));
  }, [session.id, session.viewers]);

  useEffect(() => {
    if (session.category !== 'live' || !session.startTime) {
      setElapsedTime(session.durationLabel ?? '00:00:00');
      return;
    }

    const updateElapsed = () => {
      const start = new Date(session.startTime as string).getTime();
      const current = getClampedNow(session.endTime);
      const diffSeconds = Math.max(0, Math.floor((current - start) / 1000));
      setElapsedTime(formatClock(diffSeconds));
    };

    updateElapsed();
    const timer = window.setInterval(updateElapsed, 1000);

    return () => window.clearInterval(timer);
  }, [session.category, session.durationLabel, session.endTime, session.startTime]);

  const totalDuration = useMemo(() => {
    if (!session.startTime || !session.endTime) {
      return session.durationLabel ?? '00:00:00';
    }

    const totalSeconds = Math.max(
      0,
      Math.floor((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000),
    );

    return formatClock(totalSeconds);
  }, [session.durationLabel, session.endTime, session.startTime]);

  return { viewers, elapsedTime, totalDuration, setViewers };
}
