import { MessageSquareText } from 'lucide-react';
import { RoomFeedItem, RoomTab } from './types';
import { CommentCard } from './CommentCard';
import { PollCard } from './PollCard';
import { QuestionCard } from './QuestionCard';

interface RoomFeedListProps {
  activeTab: RoomTab;
  currentUserId: string;
  items: RoomFeedItem[];
  onEndPoll: (pollId: string) => void;
  onVote: (pollId: string, optionId: string) => void;
}

function EmptyState({ activeTab }: { activeTab: RoomTab }) {
  const messages = {
    chat: 'لا توجد تفاعلات بعد. ابدأ تعليقاً جديداً ليظهر في الدردشة المباشرة.',
    questions: 'لا توجد أسئلة مرسلة بعد. أرسل سؤالك للمحاضر من الأسفل.',
    poll: 'لا توجد استطلاعات حالياً. أنشئ استطلاعاً جديداً ليظهر هنا.',
  };

  return (
    <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5d7cf] bg-[#fffaf7] px-6 text-center">
      <MessageSquareText className="h-10 w-10 text-[#d8c2b4]" />
      <p className="mt-3 max-w-xs text-sm leading-7 text-[#8b8b8b]">{messages[activeTab]}</p>
    </div>
  );
}

export function RoomFeedList({ activeTab, currentUserId, items, onEndPoll, onVote }: RoomFeedListProps) {
  if (!items.length) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
        <EmptyState activeTab={activeTab} />
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
      <div className="space-y-4">
        {items.map((item) => {
          if (item.type === 'comment') {
            return <CommentCard key={item.id} currentUserId={currentUserId} message={item.message} />;
          }

          if (item.type === 'question') {
            return <QuestionCard key={item.id} currentUserId={currentUserId} question={item.question} />;
          }

          return <PollCard key={item.id} currentUserId={currentUserId} onEndPoll={onEndPoll} onVote={onVote} poll={item.poll} />;
        })}
      </div>
    </div>
  );
}
