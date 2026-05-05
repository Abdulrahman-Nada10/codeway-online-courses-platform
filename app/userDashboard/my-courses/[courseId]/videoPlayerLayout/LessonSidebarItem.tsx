'use client';

import Image from 'next/image';
import { Check, Clock3, Lock, MessageCircle, Play, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VideoPlayerLesson, LessonStatus } from './types';
import { getLessonStatusColor } from './utils';

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
        <Play className="h-3.5 w-3.5 fill-current rtl:mr-0.5 ltr:ml-0.5" />
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
  const { t } = useTranslation();
  const bgClass =
    lesson.status === 'locked' ? 'bg-[#D9D9D9]' : !isActive ? 'bg-[#FFF3EB]' : 'bg-white';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-[#E7D8CC] px-3 py-2 text-start transition hover:bg-[#FFF3EB] dark:border-slate-700 dark:hover:bg-slate-800 ${bgClass}`}
    >
      <span className="w-6 shrink-0 text-center text-[10px] text-[#6B7280] sm:text-[11px] lg:text-[10px]">
        {lesson.id}
      </span>

      <div className="relative h-10 w-18 shrink-0 overflow-hidden rounded-sm sm:h-12 lg:h-10">
        <Image 
          src={lesson.thumbnail} 
          alt={lesson.title} 
          fill 
          className="object-cover" 
          sizes="72px" 
        />
        <div className="absolute inset-0 bg-[#113555]/10" />
        <StatusBadge status={lesson.status} />
        <span className="absolute bottom-0.5 rounded bg-[#1f293785] px-1 py-px text-[7px] font-semibold text-white ltr:right-0.5 rtl:left-0.5">
          {lesson.videoDuration}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[10px] leading-3.5 text-[#5B5B5B] dark:text-slate-300 lg:text-[9px]">
          {lesson.title}
        </p>

        <div className="mt-1 flex flex-row-reverse items-center gap-2 text-[8px] text-[#6B7280] lg:text-[8px]">
          <span className={`font-medium ${getLessonStatusColor(lesson.status)}`}>
            {t(`player.lessonStatus.${lesson.status}`)}
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
    </button>
  );
}
