export type MessageRole = 'user' | 'assistant';
export type InputMode = 'text' | 'voice';

export interface AttachmentMeta {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  attachments?: AttachmentMeta[];
  inputMode?: InputMode;
}

export interface ConversationRecord {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ConversationMessage[];
}

export interface PendingAttachment {
  id: string;
  file: File;
}

export interface LiveSessionAssistantProps {
  contextTitle?: string;
  storageKey?: string;
}

export interface AssistantSuggestion {
  id: string;
  label: string;
  buildPrompt: (contextTitle?: string) => string;
}

export interface AssistantFollowUpAction {
  id: string;
  label: string;
  buildPrompt: (assistantMessage: string, contextTitle?: string) => string;
}

export interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

export interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

export interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

export interface SpeechRecognitionErrorEventLike {
  error: string;
}

export interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export type ExtendedWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};
