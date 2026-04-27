import Image from 'next/image';
import { SessionMessage } from '../../types';
import { formatRoomTime } from './utils';

interface CommentCardProps {
  currentUserId: string;
  message: SessionMessage;
}

export function CommentCard({ currentUserId, message }: CommentCardProps) {
  const isCurrentUser = message.authorId === currentUserId;
  const isInstructor = message.role === 'instructor';

  return (
    <article className="flex flex-row-reverse items-start gap-3 text-right">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#f2e7df]">
        <Image src={message.avatar} alt={message.author} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isCurrentUser ? <span className="rounded-full bg-[#fff0e6] px-2 py-1 text-[11px] text-[#ff6400]">أنت</span> : null}
            {isInstructor ? <span className="rounded-full bg-[#113555] px-2 py-1 text-[11px] text-white">المحاضر</span> : null}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#111827]">{message.author}</p>
            <p className="text-xs text-[#9ca3af]">{formatRoomTime(message.createdAt)}</p>
          </div>
        </div>

        <div
          className={`mt-2 rounded-2xl px-4 py-3 text-sm leading-7 ${
            isInstructor ? 'bg-[#fff4ec] text-[#7c4a25]' : 'bg-[#f3f4f6] text-[#6b7280]'
          }`}
        >
          {message.text}
        </div>
      </div>
    </article>
  );
}
