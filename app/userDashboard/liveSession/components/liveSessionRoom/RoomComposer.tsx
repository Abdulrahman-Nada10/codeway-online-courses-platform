import { FormEvent } from 'react';
import { CirclePlus, Send, Smile, X } from 'lucide-react';
import { maxPollOptions, minPollOptions } from './constants';
import { PollDraft, RoomTab } from './types';

interface RoomComposerProps {
  activeTab: RoomTab;
  onAddPollOption: () => void;
  onChangePollOption: (index: number, value: string) => void;
  onChangePollQuestion: (value: string) => void;
  onRemovePollOption: (index: number) => void;
  onSubmitPoll: () => void;
  onSubmitText: () => void;
  onTextChange: (value: string) => void;
  pollDraft: PollDraft;
  textValue: string;
}

export function RoomComposer({
  activeTab,
  onAddPollOption,
  onChangePollOption,
  onChangePollQuestion,
  onRemovePollOption,
  onSubmitPoll,
  onSubmitText,
  onTextChange,
  pollDraft,
  textValue,
}: RoomComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeTab === 'poll') {
      onSubmitPoll();
      return;
    }

    onSubmitText();
  };

  const placeholders = {
    chat: 'اكتب تعليقك أثناء البث...',
    questions: 'اطرح سؤالك للمحاضر...',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {activeTab === 'poll' ? (
        <>
          <div className="rounded-2xl border border-[#f0e6df] bg-[#fffaf7] p-3">
            <input
              type="text"
              value={pollDraft.question}
              onChange={(event) => onChangePollQuestion(event.target.value)}
              placeholder="اكتب سؤال الاستطلاع..."
              className="w-full bg-transparent text-right text-sm outline-none placeholder:text-[#c4c4c4]"
            />
          </div>

          <div className="space-y-2">
            {pollDraft.options.map((option, index) => (
              <div key={`poll-option-${index}`} className="flex items-center gap-2 rounded-2xl border border-[#f0e6df] px-3 py-3">
                {pollDraft.options.length > minPollOptions ? (
                  <button
                    type="button"
                    onClick={() => onRemovePollOption(index)}
                    className="rounded-full bg-[#f3f4f6] p-1 text-[#9ca3af]"
                    aria-label="حذف الخيار"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <span className="w-6 text-center text-xs text-[#c4c4c4]">{index + 1}</span>
                )}

                <input
                  type="text"
                  value={option}
                  onChange={(event) => onChangePollOption(index, event.target.value)}
                  placeholder={`الخيار ${index + 1}`}
                  className="flex-1 bg-transparent text-right text-sm outline-none placeholder:text-[#c4c4c4]"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onAddPollOption}
              disabled={pollDraft.options.length >= maxPollOptions}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#ffcfb3] px-4 py-3 text-sm font-medium text-[#ff6400] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CirclePlus className="h-4 w-4" />
              <span>إضافة خيار</span>
            </button>

            <button type="submit" className="rounded-xl bg-[#ff6400] px-5 py-3 text-sm font-semibold text-white">
              نشر الاستطلاع
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-right text-xs leading-6 text-[#9ca3af]">
            {activeTab === 'questions'
              ? 'سيظهر السؤال هنا وفي تبويب الدردشة بصيغة مختلفة ليسهل على المحاضر مراجعته.'
              : 'التعليق الذي ترسله سيظهر مباشرة داخل الدردشة العامة للجلسة.'}
          </p>

          <div className="flex items-center gap-2 rounded-2xl border border-[#f0e6df] px-3 py-3 sm:gap-3 sm:px-4">
            <button type="submit" aria-label="إرسال" className="rounded-xl bg-[#ff6400] p-2 text-white">
              <Send className="h-4 w-4" />
            </button>

            <button type="button" aria-label="إيموجي" className="text-[#c4c4c4]">
              <Smile className="h-5 w-5" />
            </button>

            <input
              type="text"
              value={textValue}
              onChange={(event) => onTextChange(event.target.value)}
              placeholder={placeholders[activeTab]}
              className="flex-1 bg-transparent text-right text-sm outline-none placeholder:text-[#c4c4c4]"
            />
          </div>
        </>
      )}
    </form>
  );
}
