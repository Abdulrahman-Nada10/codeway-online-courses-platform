'use client';

import { useEffect, useState } from 'react';

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
  const [timeLeft, setTimeLeft] = useState(() => getDiffParts(startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getDiffParts(startTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="text-center">
      <p className="mb-3 text-sm font-medium text-[#113555]">تبدأ خلال</p>
      <div className="flex items-center justify-center gap-3">
        {[
          { label: 'ساعة', value: timeLeft.h },
          { label: 'دقيقة', value: timeLeft.m },
          { label: 'ثانية', value: timeLeft.s },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff6400] bg-[#fff3eb] text-lg font-bold text-[#113555]">
              {formatTime(item.value)}
            </div>
            <span className="text-xs text-[#6b7280]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
