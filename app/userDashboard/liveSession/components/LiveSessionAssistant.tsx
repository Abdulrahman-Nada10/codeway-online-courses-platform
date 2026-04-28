'use client';

import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { Bot, LoaderCircle, X } from 'lucide-react';
import { AssistantComposer } from './liveSessionAssistant/AssistantComposer';
import { AssistantEmptyState } from './liveSessionAssistant/AssistantEmptyState';
import { AssistantSidebar } from './liveSessionAssistant/AssistantSidebar';
import { MessageBubble } from './liveSessionAssistant/MessageBubble';
import { LiveSessionAssistantProps } from './liveSessionAssistant/types';
import { useLiveSessionAssistant } from './liveSessionAssistant/useLiveSessionAssistant';

export function LiveSessionAssistant(props: LiveSessionAssistantProps) {
  const { t } = useTranslation();
  const { dir, isRTL } = useLocaleDirection();
  const assistant = useLiveSessionAssistant(props);

  return (
    <>
      <button
        type="button"
        onClick={assistant.openAssistant}
        className="fixed bottom-4 z-60 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#e9edf9_55%,#d8ddf0_100%)] shadow-[0_14px_30px_rgba(17,53,85,0.22)] transition hover:-translate-y-1 rtl:left-4 ltr:right-4 sm:bottom-6 sm:h-14 sm:w-14 sm:rtl:left-6 sm:ltr:right-6"
        aria-label={t('assistant.openAssistant')}
        title={t('assistant.openAssistant')}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#113555] text-white shadow-[0_8px_18px_rgba(17,53,85,0.28)] sm:h-10 sm:w-10">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </button>

      {assistant.isOpen ? (
        <div
          className="fixed inset-0 z-80 flex items-stretch justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
          dir={dir}
        >
          <div className="relative flex h-dvh w-full max-w-none flex-col overflow-hidden bg-[#fff4ec] px-3 pb-3 pt-12 shadow-[0_25px_80px_rgba(17,53,85,0.18)] dark:bg-slate-950 sm:h-full sm:max-h-[192vh] sm:max-w-7xl sm:rounded-2xl sm:p-10">
            <button
              type="button"
              onClick={assistant.closeAssistant}
              className="absolute top-3 z-10 rounded-full p-2 text-[#3f3f46] transition hover:bg-white/70 rtl:right-3 ltr:left-3 dark:text-slate-300 sm:top-0 sm:rtl:right-1 sm:ltr:left-1"
              aria-label={t('common.close')}
              title={t('common.close')}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-4" dir={isRTL ? 'ltr' : 'rtl'}>
              <section className="order-2 flex min-h-0 flex-col rounded-3xl bg-white px-3 py-4 shadow-[0_12px_35px_rgba(17,53,85,0.06)] dark:bg-slate-900 sm:px-5 sm:py-5 lg:order-1 lg:min-h-[68vh] lg:rounded-[28px] lg:px-6">
                <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
                  {assistant.activeMessages.length > 0 ? (
                    <div className="space-y-5 pb-4">
                      {assistant.activeMessages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          contextTitle={assistant.contextTitle}
                          disabled={assistant.isLoading}
                          onAction={(prompt, label) => {
                            void assistant.sendMessage({ prompt, displayText: label });
                          }}
                        />
                      ))}

                      {assistant.isLoading ? (
                        <div className="flex justify-start">
                          <div className="flex items-center gap-2 rounded-full bg-[#fff3eb] px-4 py-2 text-sm text-[#7a4b2d] dark:bg-slate-800 dark:text-slate-200">
                            <LoaderCircle className="h-4 w-4 animate-spin text-[#ff6400]" />
                            <span>{t('assistant.typing')}</span>
                          </div>
                        </div>
                      ) : null}

                      <div ref={assistant.listEndRef} />
                    </div>
                  ) : (
                    <>
                      <AssistantEmptyState
                        contextTitle={assistant.contextTitle}
                        introPhase={assistant.introPhase}
                        isLoading={assistant.isLoading}
                        onSuggestionClick={(prompt, label) => {
                          void assistant.sendMessage({ prompt, displayText: label });
                        }}
                      />
                      <div ref={assistant.listEndRef} />
                    </>
                  )}
                </div>

                <AssistantComposer
                  composerError={assistant.composerError}
                  composerValue={assistant.composerValue}
                  fileInputRef={assistant.fileInputRef}
                  isListening={assistant.isListening}
                  isLoading={assistant.isLoading}
                  pendingAttachments={assistant.pendingAttachments}
                  onComposerChange={assistant.handleComposerChange}
                  onFileSelection={assistant.handleFileSelection}
                  onRemoveAttachment={assistant.removePendingAttachment}
                  onSubmit={assistant.handleComposerSubmit}
                  onTextareaKeyDown={assistant.handleComposerKeyDown}
                  onVoiceInput={assistant.handleVoiceInput}
                />
              </section>

              <AssistantSidebar
                activeConversationId={assistant.activeConversationId}
                contextTitle={assistant.contextTitle}
                historyConversations={assistant.historyConversations}
                isHistoryOpen={assistant.isHistoryOpen}
                isLoading={assistant.isLoading}
                onCreateConversation={assistant.createNewConversation}
                onSelectConversation={assistant.selectConversation}
                onToggleHistory={() => assistant.setIsHistoryOpen((currentValue) => !currentValue)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
