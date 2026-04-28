import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, MessageSquareText, Plus } from 'lucide-react';
import { ConversationRecord } from './types';

interface AssistantSidebarProps {
  activeConversationId?: string;
  contextTitle?: string;
  historyConversations: ConversationRecord[];
  isHistoryOpen: boolean;
  isLoading: boolean;
  onCreateConversation: () => void;
  onSelectConversation: (conversationId: string) => void;
  onToggleHistory: () => void;
}

export function AssistantSidebar({
  activeConversationId,
  contextTitle,
  historyConversations,
  isHistoryOpen,
  isLoading,
  onCreateConversation,
  onSelectConversation,
  onToggleHistory,
}: AssistantSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="order-1 flex min-h-0 flex-col rounded-3xl bg-white p-3 shadow-[0_12px_35px_rgba(17,53,85,0.06)] dark:bg-slate-900 sm:p-4 lg:order-2 lg:min-h-[68vh] lg:rounded-[28px]">
      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <button
          type="button"
          onClick={onCreateConversation}
          disabled={isLoading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#ff6400_0%,#ffb16f_100%)] px-3 py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 lg:hidden"
        >
          <Plus className="h-4 w-4" />
          <span>{t('assistant.newConversation')}</span>
        </button>

        <Image src="/logo.png" alt={t('nav.brand')} width={92} height={50} className="h-auto w-20 object-contain sm:w-[92px]" />
      </div>

      <div className="mt-4 lg:mt-5">
        <button
          type="button"
          onClick={onToggleHistory}
          className="flex w-full items-center justify-end gap-3 rounded-xl border border-[#c7d2e0] px-3 py-3 text-sm font-semibold text-[#113555] dark:border-slate-700 dark:text-slate-100"
        >
          {isHistoryOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronUp className="h-4 w-4 shrink-0" />}
          <span className="flex-1 text-start">{t('assistant.conversationHistory')}</span>
          <MessageSquareText className="h-4 w-4 shrink-0" />
        </button>

        {isHistoryOpen ? (
          <div className="custom-scrollbar mt-3 max-h-52 overflow-y-auto rounded-2xl bg-[#113555] p-1.5 sm:max-h-72 lg:max-h-105">
            {historyConversations.length ? (
              <div className="space-y-1">
                {historyConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`w-full rounded-xl px-3 py-3 text-start text-sm transition ${
                      conversation.id === activeConversationId ? 'bg-[#173f63] text-[#ff9b59]' : 'text-white hover:bg-[#173f63]'
                    }`}
                  >
                    <span className="line-clamp-2 block">{conversation.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl px-4 py-8 text-center text-sm text-white/75">{t('assistant.firstConversationHint')}</div>
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-4 hidden pt-2 lg:mt-auto lg:block lg:pt-4">
        <button
          type="button"
          onClick={onCreateConversation}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#ff6400_0%,#ffb16f_100%)] px-4 py-4 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{t('assistant.newConversation')}</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 hidden items-center justify-center gap-2 text-xs text-[#9a938e] lg:flex">
        <span>{contextTitle ? t('assistant.contextBound', { context: contextTitle }) : t('assistant.defaultContext')}</span>
      </div>
    </aside>
  );
}
