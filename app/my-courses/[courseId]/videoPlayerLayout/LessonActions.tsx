'use client';

import { CheckCheck, MessageCircle, ThumbsUp } from 'lucide-react';
import { LessonStatus } from './types';

export default function LessonActions({
  title,
  status,
  likesCount,
  isLiked,
  isCommentsActive,
  onLike,
  onComments,
  onComplete,
}: {
  title: string;
  status: LessonStatus;
  likesCount: number;
  isLiked: boolean;
  isCommentsActive: boolean;
  onLike: () => void;
  onComments: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] border border-[#E8D8CA] bg-white px-3 py-3 shadow-[0_8px_20px_rgba(17,53,85,0.05)] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4" dir="rtl">
      <h2 className="text-right text-[12px] font-bold text-[#111111] min-[360px]:text-[13px] sm:text-[14px]">{title}</h2>

      <div className="flex flex-wrap items-center gap-3 text-[10px] min-[360px]:gap-4 min-[360px]:text-[11px] sm:justify-start">
        <button
          type="button"
          onClick={onLike}
          className={`inline-flex items-center gap-1.5 font-semibold transition ${
            isLiked ? 'text-[#FF6400]' : 'text-[#7B7B7B] hover:text-[#FF6400]'
          }`}
        >
          <span>{likesCount}</span>
          <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        <button
          type="button"
          onClick={onComments}
          className={`inline-flex items-center gap-1.5 font-medium transition ${
            isCommentsActive ? 'text-[#FF6400]' : 'text-[#7B7B7B] hover:text-[#FF6400]'
          }`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          التعليقات
        </button>

        <button
          type="button"
          onClick={onComplete}
          className={`inline-flex items-center gap-1.5 font-semibold transition ${
            status === 'completed'
            ? 'text-[#22C55E]'
            : status === 'locked'
            ? 'cursor-not-allowed text-[#A3A3A3]'
            : 'text-[#7B7B7B] hover:text-[#22C55E]'
          }`}
        >
          <CheckCheck className="h-3.5 w-3.5" />
          {status === 'completed' ? 'الغاء التحديد' : 'تحديد كمكتمل'}
        </button>
      </div>
    </div>
  );
}
