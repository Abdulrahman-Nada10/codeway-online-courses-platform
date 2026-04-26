import { AssistantFollowUpAction, AssistantSuggestion } from './types';

export const DEFAULT_STORAGE_KEY = 'live-session-ai-history-v1';
export const INTRO_DELAY_MS = 280;
export const MAX_ATTACHMENTS = 5;
export const MAX_TEXT_ATTACHMENT_SIZE = 150_000;
export const RECENT_HISTORY_LIMIT = 10;
export const SEND_DEBOUNCE_MS = 400;

export const TEXT_ATTACHMENT_EXTENSIONS = new Set([
  'txt',
  'md',
  'json',
  'csv',
  'ts',
  'tsx',
  'js',
  'jsx',
  'py',
  'html',
  'css',
  'xml',
  'yml',
  'yaml',
]);

export const introSuggestions: AssistantSuggestion[] = [
  {
    id: 'explain-lesson',
    label: 'شرح الدرس',
    buildPrompt: (contextTitle?: string) =>
      contextTitle ? `اشرح لي موضوع "${contextTitle}" بطريقة بسيطة ومنظمة.` : 'اشرح لي الدرس بطريقة بسيطة ومنظمة.',
  },
  {
    id: 'quick-summary',
    label: 'تلخيص سريع',
    buildPrompt: (contextTitle?: string) =>
      contextTitle ? `لخص لي أهم أفكار "${contextTitle}" في نقاط قصيرة.` : 'لخص لي الموضوع في نقاط قصيرة.',
  },
  {
    id: 'illustrative-example',
    label: 'مثال توضيحي',
    buildPrompt: (contextTitle?: string) =>
      contextTitle ? `اعطني مثالاً توضيحياً بسيطاً على "${contextTitle}".` : 'اعطني مثالاً توضيحياً بسيطاً على الموضوع.',
  },
  {
    id: 'solve-question',
    label: 'حل سؤال',
    buildPrompt: (contextTitle?: string) =>
      contextTitle
        ? `ساعدني في حل سؤال متعلق بـ "${contextTitle}" واسألني عن السؤال لو لم يكن واضحاً.`
        : 'ساعدني في حل سؤال متعلق بالموضوع واسألني عن السؤال لو لم يكن واضحاً.',
  },
];

export const assistantFollowUpActions: AssistantFollowUpAction[] = [
  {
    id: 'example',
    label: 'مثال توضيحي',
    buildPrompt: (assistantMessage: string, contextTitle?: string) =>
      `${contextTitle ? `الموضوع الحالي هو "${contextTitle}".\n\n` : ''}اعطني مثالاً توضيحياً بسيطاً على الشرح التالي:\n${assistantMessage}`,
  },
  {
    id: 'expand',
    label: 'اشرح أكثر',
    buildPrompt: (assistantMessage: string, contextTitle?: string) =>
      `${contextTitle ? `الموضوع الحالي هو "${contextTitle}".\n\n` : ''}اشرح هذه الإجابة بمزيد من التفصيل وبأسلوب أبسط:\n${assistantMessage}`,
  },
];
