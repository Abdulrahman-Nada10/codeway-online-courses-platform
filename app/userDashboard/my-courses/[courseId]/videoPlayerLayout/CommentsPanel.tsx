'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Send, X } from 'lucide-react';
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
  const [draft, setDraft] = useState('');

  const handleAddComment = () => {
    const normalized = draft.trim();
    if (!normalized) return;

    onCommentsChange([
      {
        id: comments.length + 1,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: normalized,
        timeAgo: 'منذ 3 دقائق',
      },
      ...comments,
    ]);
    setDraft('');
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex h-15.5 items-center gap-2 rounded-2xl border border-[#E8D8CA] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(17,53,85,0.05)]">
        <button
          type="button"
          onClick={handleAddComment}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6B7280] transition hover:bg-[#FFF3EB] hover:text-[#113555]"
          aria-label="إرسال التعليق"
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
          className="h-8 flex-1 border-0 bg-transparent text-right text-[12px] text-[#113555] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>

      <div className="relative h-87 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white shadow-[0_8px_20px_rgba(17,53,85,0.06)] lg:h-99 xl:h-108">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-3 top-2.5 z-10 rounded-full p-1 text-[#6B7280] transition hover:bg-[#FFF3EB] hover:text-[#113555]"
          aria-label="إغلاق التعليقات"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="absolute bottom-2 left-3 z-10 text-[#A3A3A3]">
          <ChevronDown className="h-3.5 w-3.5" />
        </div>

        <div className="custom-scrollbar h-full overflow-y-auto px-5 py-6 pr-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start justify-between gap-2 border-b border-[#F2E9E1] py-4 last:border-b-0"
            >
              <span className="shrink-0 text-[10px] text-[#8B8B8B]">{comment.timeAgo}</span>

              <div className="text-right">
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
