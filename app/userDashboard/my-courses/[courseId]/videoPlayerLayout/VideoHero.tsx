'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { LessonStatus } from './types';

export default function VideoHero({
  image,
  title,
  status,
}: {
  image: string;
  title: string;
  status: LessonStatus;
}) {
  return (
    <div className="h-49.5 w-full overflow-hidden rounded-lg shadow-[0_10px_24px_rgba(17,53,85,0.06)] sm:h-57 md:h-65 lg:h-67.5 xl:h-59">
      <div className="relative h-full w-full ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 702px"
        />
        <div className="absolute inset-0 bg-[#113555]/20" />
        {status !== 'locked' && (
          <button
            type="button"
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6400] text-white shadow-[0_14px_20px_rgba(255,100,0,0.28)] transition hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            aria-label="تشغيل الدرس"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}
