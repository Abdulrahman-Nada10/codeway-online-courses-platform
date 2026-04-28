'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function getDiffParts(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { h: 0, m: 0, s: 0, isReady: true };
  }

  return {
    h: Math.floor(diff / (1000 * 60 * 60)),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
    isReady: false,
  };
}

function formatTime(value: number) {
  return value.toString().padStart(2, '0');
}

export function SessionCountdown({ startTime }: { startTime: string }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(() => getDiffParts(startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getDiffParts(startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="text-center">
      <p className="mb-3 text-sm font-medium text-[#113555]">{t('dashboard.startsIn')}</p>
      <div className="flex items-center justify-center gap-3">
        {[
          { label: t('dashboard.hour'), value: timeLeft.h },
          { label: t('dashboard.minute'), value: timeLeft.m },
          { label: t('dashboard.second'), value: timeLeft.s },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff6400] bg-[#fff3eb] text-lg font-bold text-[#113555] dark:bg-slate-800 dark:text-slate-100">
              {formatTime(item.value)}
            </div>
            <span className="text-xs text-[#6b7280] dark:text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

