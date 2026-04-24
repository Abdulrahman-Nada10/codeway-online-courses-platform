import Image from 'next/image';
import { CircleHelp } from 'lucide-react';
import { SessionQuestion } from '../../types';
import { formatRoomTime } from './utils';

interface QuestionCardProps {
  currentUserId: string;
  question: SessionQuestion;
}

export function QuestionCard({ currentUserId, question }: QuestionCardProps) {
  const isCurrentUser = question.authorId === currentUserId;

  return (
    <article className="rounded-2xl border border-[#ffd8bf] bg-[#fff8f4] p-4 text-right">
      <div className=" flex flex-row-reverse items-start gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#f2e7df]">
          <Image src={question.avatar} alt={question.author} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#ff6400] px-2.5 py-1 text-[11px] text-white">سؤال للمحاضر</span>
              {isCurrentUser ? <span className="rounded-full bg-white px-2 py-1 text-[11px] text-[#ff6400]">أنت</span> : null}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#111827]">{question.author}</p>
              <p className="text-xs text-[#9ca3af]">{formatRoomTime(question.createdAt)}</p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-[#6b7280] shadow-[0_8px_30px_rgba(17,53,85,0.05)]">
            <div className="mb-2 flex items-center justify-end gap-2 text-xs text-[#ff6400]">
              <span>موجّه إلى المحاضر</span>
              <CircleHelp className="h-3.5 w-3.5" />
            </div>
            {question.text}
          </div>
        </div>
      </div>
    </article>
  );
}
