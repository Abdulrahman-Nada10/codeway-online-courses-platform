'use client';

import Image from 'next/image';
import { Check, Clock3, Lock, MessageCircle, Play, ThumbsUp } from 'lucide-react';
import { VideoPlayerLesson, LessonStatus } from './types';
import { getLessonStatusColor, getLessonStatusLabel } from './utils';

function StatusBadge({ status }: { status: LessonStatus }) {
  if (status === 'completed') {
    return (
      <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#10B981] text-white shadow-[0_6px_12px_rgba(16,185,129,0.28)]">
        <Check className="h-4 w-4 stroke-3" />
      </div>
    );
  }

  if (status === 'available') {
    return (
      <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6400] text-white shadow-[0_6px_12px_rgba(255,100,0,0.28)]">
        <Play className="mr-0.5 h-3.5 w-3.5 fill-current" />
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#113555] text-white shadow-[0_6px_12px_rgba(17,53,85,0.28)]">
      <Lock className="h-3.5 w-3.5" />
    </div>
  );
}

export default function LessonSidebarItem({
  lesson,
  isActive,
  onClick,
}: {
  lesson: VideoPlayerLesson;
  isActive: boolean;
  onClick: () => void;
}) {
  const bgClass =
    lesson.status === 'locked' ? 'bg-[#D9D9D9]' : !isActive ? 'bg-[#FFF3EB]' : 'bg-white';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid w-full grid-cols-[1fr_68px_18px] items-center gap-1.5 border-b border-[#E7D8CC] px-2 py-2 text-right transition hover:bg-[#FFF3EB] min-[360px]:grid-cols-[1fr_78px_20px] min-[360px]:gap-2 min-[360px]:px-2.5 sm:grid-cols-[1fr_84px_22px] sm:px-3 lg:grid-cols-[1fr_66px_18px] lg:px-2 xl:grid-cols-[1fr_72px_18px] ${bgClass}`}
    >
      <div className="min-w-0">
        <p className="line-clamp-2 text-[9px] leading-3.5 text-[#5B5B5B] min-[360px]:text-[10px] min-[360px]:leading-4 sm:text-[11px] lg:text-[9px] xl:text-[10px]">{lesson.title}</p>

        <div className="mt-1 flex items-center justify-start gap-1.5 text-[8px] text-[#6B7280] min-[360px]:gap-2 min-[360px]:text-[9px] sm:text-[10px] lg:text-[8px] xl:text-[9px]">
          <span className={`font-medium ${getLessonStatusColor(lesson.status)}`}>
            {getLessonStatusLabel(lesson.status)}
          </span>
          <span className="flex items-center gap-0.5">
            {lesson.durationMinutes}
            <Clock3 className="h-3 w-3" />
          </span>
          <span className="flex items-center gap-0.5">
            {lesson.commentsCount}
            <MessageCircle className="h-3 w-3" />
          </span>
          <span className="flex items-center gap-0.5">
            {lesson.likes}
            <ThumbsUp className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="relative h-10 overflow-hidden rounded-sm min-[360px]:h-11.5 sm:h-12.5 lg:h-10 xl:h-10.5">
        <Image src={lesson.thumbnail} alt={lesson.title} fill className="object-cover" sizes="(max-width: 359px) 68px, (max-width: 640px) 78px, (max-width: 1024px) 84px, 72px" />
        <div className="absolute inset-0 bg-[#113555]/10" />
        <StatusBadge status={lesson.status} />
        <span className="absolute bottom-0.5 left-0.5 rounded bg-[#1F2937]/85 px-1 py-px text-[7px] font-semibold text-white">
          {lesson.videoDuration}
        </span>
      </div>

      <span className="text-center text-[10px] text-[#6B7280] sm:text-[11px] lg:text-[10px]">{lesson.id}</span>
    </button>
  );
}
