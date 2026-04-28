'use client';

import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { LiveSession } from '../../types';
import { RoomComposer } from './RoomComposer';
import { RoomFeedList } from './RoomFeedList';
import { RoomTabs } from './RoomTabs';
import { useLiveSessionRoom } from './useLiveSessionRoom';

export function RoomInteractionPanel({ session }: { session: LiveSession }) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const {
    activeTab,
    addPollOption,
    counts,
    currentUserId,
    endPoll,
    pollDraft,
    removePollOption,
    setActiveTab,
    setTextValue,
    submitPoll,
    submitText,
    textValue,
    updatePollDraftOption,
    updatePollDraftQuestion,
    visibleItems,
    voteOnPoll,
  } = useLiveSessionRoom(session);

  const helperKeys: Record<string, string> = {
    chat: t('dashboard.chatHelper'),
    questions: t('dashboard.questionsHelper'),
    poll: t('dashboard.pollHelper'),
  };

  return (
    <aside className="flex min-h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(17,53,85,0.06)] dark:bg-slate-900 xl:sticky xl:top-32 xl:max-h-[calc(100vh-9rem)]" dir={dir}>
      <div className="border-b border-[#f0e6df] px-4 p-4 sm:px-5 overflow-hidden">
        <RoomTabs activeTab={activeTab} counts={counts} onChange={setActiveTab} />
        <p className="overflow-hidden pb-4 pt-2 text-start text-xs leading-6 text-[#9ca3af] dark:text-slate-400">{helperKeys[activeTab]}</p>
      </div>

      <RoomFeedList activeTab={activeTab} currentUserId={currentUserId} items={visibleItems} onEndPoll={endPoll} onVote={voteOnPoll} />

      <div className=" border-t border-[#f0e6df] px-4 py-4 sm:px-5">
        <RoomComposer
          activeTab={activeTab}
          onAddPollOption={addPollOption}
          onChangePollOption={updatePollDraftOption}
          onChangePollQuestion={updatePollDraftQuestion}
          onRemovePollOption={removePollOption}
          onSubmitPoll={submitPoll}
          onSubmitText={submitText}
          onTextChange={setTextValue}
          pollDraft={pollDraft}
          textValue={textValue}
        />
      </div>
    </aside>
  );
}
