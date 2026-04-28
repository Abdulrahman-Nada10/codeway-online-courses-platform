import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { FileText } from 'lucide-react';
import { getAssistantFollowUpActions } from './constants';
import { ConversationMessage } from './types';
import { formatFileSize } from './utils';

interface MessageBubbleProps {
  message: ConversationMessage;
  contextTitle?: string;
  disabled: boolean;
  onAction: (prompt: string, label: string) => void;
}

const actionKeyMap: Record<string, string> = {
  'example': 'assistant.action.example',
  'expand': 'assistant.action.expand',
};

export function MessageBubble({ message, contextTitle, disabled, onAction }: MessageBubbleProps) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const isAssistant = message.role === 'assistant';
  const assistantFollowUpActions = getAssistantFollowUpActions();

  return (
    <div dir={dir} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div dir={dir} className={`flex max-w-[94%] flex-col gap-2 sm:max-w-[78%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div
          className={`rounded-[22px] px-4 py-3 text-sm leading-7 shadow-[0_8px_20px_rgba(17,53,85,0.06)] ${
            isAssistant ? 'bg-white text-[#1f2937] dark:bg-slate-900 dark:text-slate-100' : 'bg-[#ff6b00] text-white'
          }`}
        >
          <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>

          {message.attachments?.length ? (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-xs ${
                    isAssistant ? 'border-[#f0e6df] bg-[#fff7f1] text-[#526070]' : 'border-white/20 bg-white/10 text-white'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">{attachment.name}</span>
                  </div>
                  <span className="shrink-0">{formatFileSize(attachment.size)}</span>
                </div>
              ))}
            </div>
          ) : null}

          {message.inputMode === 'voice' ? (
            <span
              className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
                isAssistant ? 'bg-[#fff3eb] text-[#ff6400]' : 'bg-white/15 text-white'
              }`}
            >
              {t('assistant.voiceMessage')}
            </span>
          ) : null}
        </div>

        {isAssistant ? (
          <div className="flex flex-wrap gap-2">
            {assistantFollowUpActions.map((action) => (
              <button
                key={action.id}
                type="button"
                disabled={disabled}
                onClick={() => onAction(action.buildPrompt(message.content, contextTitle), t(actionKeyMap[action.id]))}
                className="rounded-full border border-[#f3d7c7] bg-white px-3 py-1.5 text-xs font-medium text-[#7a4b2d] transition hover:border-[#ffb890] hover:text-[#ff6400] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t(actionKeyMap[action.id])}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

