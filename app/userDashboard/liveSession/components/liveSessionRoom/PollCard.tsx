import Image from 'next/image';
import { BarChart3 } from 'lucide-react';
import { SessionPoll } from '../../types';
import { formatRoomTime, getPollOptionPercentage, getPollTotalVotes } from './utils';

interface PollCardProps {
  currentUserId: string;
  onEndPoll: (pollId: string) => void;
  onVote: (pollId: string, optionId: string) => void;
  poll: SessionPoll;
}

export function PollCard({ currentUserId, onEndPoll, onVote, poll }: PollCardProps) {
  const totalVotes = getPollTotalVotes(poll);
  const isEnded = poll.status === 'ended';
  const isOwner = poll.authorId === currentUserId;

  return (
    <article className="rounded-2xl border border-[#ffd1b2] bg-[#fff7f1] p-4 text-right">
      <div className="flex flex-row-reverse items-start gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#f2e7df]">
          <Image src={poll.avatar} alt={poll.author} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] ${
                  isEnded ? 'bg-[#e5e7eb] text-[#4b5563]' : 'bg-[#ff6400] text-white'
                }`}
              >
                {isEnded ? 'استطلاع رأي منتهي' : 'استطلاع نشط'}
              </span>

              {isOwner && !isEnded ? (
                <button
                  type="button"
                  onClick={() => onEndPoll(poll.id)}
                  className="rounded-full border border-[#ffcfb3] bg-white px-3 py-1 text-[11px] font-medium text-[#ff6400]"
                >
                  إنهاء الاستطلاع
                </button>
              ) : null}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#111827]">{poll.author}</p>
              <p className="text-xs text-[#9ca3af]">{formatRoomTime(poll.createdAt)}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="rounded-full bg-white p-2 text-[#ff6400]">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#111827] sm:text-lg">{poll.question}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {poll.options.map((option) => {
              const percentage = getPollOptionPercentage(poll, option.id);
              const isSelected = poll.votedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={isEnded}
                  onClick={() => onVote(poll.id, option.id)}
                  className={`relative block w-full overflow-hidden rounded-xl border text-right transition ${
                    isSelected
                      ? 'border-[#ff6400] bg-white shadow-[0_8px_25px_rgba(255,100,0,0.12)]'
                      : 'border-[#ffcfb3] bg-white/90'
                  } ${isEnded ? 'cursor-default opacity-90' : 'hover:border-[#ff6400]'}`}
                >
                  <span className="absolute inset-y-0 right-0 bg-[#ffd9c2]" style={{ width: `${percentage}%` }} />

                  <span className="relative flex items-center justify-between gap-3 px-3 py-3 text-sm text-[#6b3d21]">
                    <span>{percentage}%</span>
                    <span className="font-medium">{option.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#9ca3af]">
            <span>{totalVotes} صوت</span>
            <span>{isEnded ? 'تم إغلاق التصويت' : 'يمكنك التصويت مرة واحدة وتغيير اختيارك قبل الإنهاء'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
