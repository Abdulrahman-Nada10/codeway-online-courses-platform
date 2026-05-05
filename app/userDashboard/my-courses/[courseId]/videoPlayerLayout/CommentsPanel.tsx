'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ChevronDown, Send, X } from 'lucide-react';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { LessonComment } from './types';

export default function CommentsPanel({
  comments,
  placeholder,
  onClose,
  onCommentsChange,
}: {
  comments: LessonComment[];
  placeholder: string;
  onClose: () => void;
  onCommentsChange: (comments: LessonComment[]) => void;
}) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const [draft, setDraft] = useState('');

  const handleAddComment = () => {
    const normalized = draft.trim();
    if (!normalized) return;

    onCommentsChange([
      {
        id: comments.length + 1,
        author: t('dashboard.demoUser'),
        avatar: '/profile.jpg',
        content: normalized,
        timeAgo: t('player.threeMinutesAgo'),
      },
      ...comments,
    ]);
    setDraft('');
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2" dir={dir}>
      <div className="flex h-15.5 items-center gap-2 rounded-2xl border border-[#E8D8CA] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(17,53,85,0.05)] dark:bg-slate-900">
        <button
          type="button"
          onClick={handleAddComment}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6B7280] transition hover:bg-[#FFF3EB] hover:text-[#113555]"
          aria-label={t('dashboard.sendComment')}
        >
          <Send className="h-3.5 w-3.5" />
        </button>

        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleAddComment();
          }}
          placeholder={placeholder}
          className="h-8 flex-1 border-0 bg-transparent text-start text-[12px] text-[#113555] outline-none placeholder:text-[#9CA3AF] dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="relative h-87 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-background shadow-[0_8px_20px_rgba(17,53,85,0.06)] dark:bg-slate-900 lg:h-99 xl:h-108">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2.5 z-10 rounded-full p-1 text-[#6B7280] transition hover:bg-[#FFF3EB] hover:text-[#113555] rtl:left-3 ltr:right-3"
          aria-label={t('dashboard.closeComments')}
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="absolute bottom-2 z-10 text-[#A3A3A3] rtl:left-3 ltr:right-3">
          <ChevronDown className="h-3.5 w-3.5" />
        </div>

        <div className="custom-scrollbar h-full overflow-y-auto px-5 py-6 pr-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start justify-between gap-2 border-b border-[#F2E9E1] py-4 last:border-b-0"
            >
              <span className="shrink-0 text-[10px] text-[#8B8B8B]">{comment.timeAgo}</span>

              <div className="text-start">
                <div className="flex items-center justify-end gap-2">
                  <div className="relative h-6 w-5 overflow-hidden rounded-full border border-[#F0D9CB]">
                    <Image src={comment.avatar} alt={comment.author} fill className="object-cover" sizes="20px" />
                  </div>
                  <p className="text-[13px] font-semibold text-[#111111]">{comment.author}</p>
                </div>
                <p className="mt-0.5 text-[12px] text-[#8B8B8B]">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
