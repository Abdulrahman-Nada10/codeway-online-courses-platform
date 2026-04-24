'use client';

import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getAttachmentContext } from './attachments';
import { CHAT_ENDPOINT, DEFAULT_STORAGE_KEY, INTRO_DELAY_MS, MAX_ATTACHMENTS } from './constants';
import { getSpeechRecognitionApi } from './speech';
import { ConversationRecord, InputMode, LiveSessionAssistantProps, PendingAttachment, SpeechRecognitionLike } from './types';
import {
  createConversation,
  createId,
  getAssistantReply,
  getAttachmentMeta,
  getConversationTitle,
  parseStoredConversations,
} from './utils';

export function useLiveSessionAssistant({
  contextTitle,
  storageKey = DEFAULT_STORAGE_KEY,
}: LiveSessionAssistantProps) {
  const initialConversationRef = useRef<ConversationRecord>(createConversation());
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const hasLoadedRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<ConversationRecord[]>([initialConversationRef.current]);
  const [activeConversationId, setActiveConversationId] = useState(initialConversationRef.current.id);
  const [composerValue, setComposerValue] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachment[]>([]);
  const [pendingInputMode, setPendingInputMode] = useState<InputMode>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [introPhase, setIntroPhase] = useState<'idle' | 'title' | 'suggestions'>('idle');
  const [composerError, setComposerError] = useState<string | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations],
  );

  const historyConversations = useMemo(
    () =>
      [...conversations]
        .filter((conversation) => conversation.messages.length > 0)
        .sort((left, right) => right.updatedAt - left.updatedAt),
    [conversations],
  );

  const activeMessages = activeConversation?.messages ?? [];

  useEffect(() => {
    const storedConversations = parseStoredConversations(window.localStorage.getItem(storageKey));

    if (storedConversations.length > 0) {
      const orderedConversations = [...storedConversations].sort((left, right) => right.updatedAt - left.updatedAt);
      setConversations(orderedConversations);
      setActiveConversationId(orderedConversations[0].id);
      setIsHistoryOpen(true);
    }

    hasLoadedRef.current = true;
  }, [storageKey]);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(conversations.filter((conversation) => conversation.messages.length > 0)));
  }, [conversations, storageKey]);

  useEffect(() => {
    if (activeConversation && activeConversation.id !== activeConversationId) {
      setActiveConversationId(activeConversation.id);
    }
  }, [activeConversation, activeConversationId]);

  useEffect(() => {
    if (!isOpen || !activeConversation || activeConversation.messages.length > 0) {
      setIntroPhase('idle');
      return;
    }

    setIntroPhase('title');
    const timer = window.setTimeout(() => {
      setIntroPhase('suggestions');
    }, INTRO_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeConversation, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeMessages, isLoading, isOpen]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const updateConversationMessages = (conversationId: string, updater: (conversation: ConversationRecord) => ConversationRecord) => {
    setConversations((currentConversations) =>
      currentConversations.map((conversation) => (conversation.id === conversationId ? updater(conversation) : conversation)),
    );
  };

  const openAssistant = () => {
    setIsOpen(true);
  };

  const closeAssistant = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    setComposerError(null);
    setIsOpen(false);
  };

  const createNewConversation = () => {
    if (isLoading) {
      return;
    }

    const freshConversation = createConversation();

    setConversations((currentConversations) => {
      const currentConversation = currentConversations.find((conversation) => conversation.id === activeConversationId);

      if (currentConversation && currentConversation.messages.length === 0) {
        return currentConversations.map((conversation) =>
          conversation.id === activeConversationId ? freshConversation : conversation,
        );
      }

      return [freshConversation, ...currentConversations];
    });

    setActiveConversationId(freshConversation.id);
    setComposerValue('');
    setPendingAttachments([]);
    setPendingInputMode('text');
    setComposerError(null);
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setComposerValue('');
    setPendingAttachments([]);
    setPendingInputMode('text');
    setComposerError(null);
  };

  const sendMessage = async ({
    prompt,
    displayText,
    attachments,
    inputMode,
  }: {
    prompt: string;
    displayText?: string;
    attachments?: PendingAttachment[];
    inputMode?: InputMode;
  }) => {
    if (isLoading || !activeConversation) {
      return;
    }

    const textPrompt = prompt.trim();
    const selectedAttachments = attachments ?? pendingAttachments;

    if (!textPrompt && selectedAttachments.length === 0) {
      return;
    }

    const visibleMessage =
      displayText?.trim() || textPrompt || (selectedAttachments[0] ? `مرفق: ${selectedAttachments[0].file.name}` : 'رسالة جديدة');
    const selectedInputMode = inputMode ?? pendingInputMode;
    const userMessage = {
      id: createId(),
      role: 'user' as const,
      content: visibleMessage,
      createdAt: Date.now(),
      attachments: selectedAttachments.map((attachment) => getAttachmentMeta(attachment.file)),
      inputMode: selectedInputMode,
    };

    updateConversationMessages(activeConversation.id, (conversation) => {
      const nextMessages = [...conversation.messages, userMessage];

      return {
        ...conversation,
        title:
          conversation.messages.length === 0
            ? getConversationTitle(contextTitle ? `${visibleMessage} - ${contextTitle}` : visibleMessage, contextTitle)
            : conversation.title,
        updatedAt: Date.now(),
        messages: nextMessages,
      };
    });

    setComposerValue('');
    setPendingAttachments([]);
    setPendingInputMode('text');
    setComposerError(null);
    setIsLoading(true);

    try {
      const attachmentContext = selectedAttachments.length
        ? await getAttachmentContext(selectedAttachments.map((attachment) => attachment.file))
        : '';
      const messageParts: string[] = [];

      if (contextTitle) {
        messageParts.push(`السياق الحالي: ${contextTitle}`);
      }

      if (textPrompt) {
        messageParts.push(textPrompt);
      }

      if (attachmentContext) {
        messageParts.push(`المرفقات:\n${attachmentContext}`);
      }

      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageParts.join('\n\n'),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as unknown;
      const assistantMessage = {
        id: createId(),
        role: 'assistant' as const,
        content: getAssistantReply(data),
        createdAt: Date.now(),
      };

      updateConversationMessages(activeConversation.id, (conversation) => ({
        ...conversation,
        updatedAt: Date.now(),
        messages: [...conversation.messages, assistantMessage],
      }));
    } catch {
      const assistantMessage = {
        id: createId(),
        role: 'assistant' as const,
        content: 'حصل خطأ في الاتصال بالمساعد الذكي. حاول مرة تانية.',
        createdAt: Date.now(),
      };

      updateConversationMessages(activeConversation.id, (conversation) => ({
        ...conversation,
        updatedAt: Date.now(),
        messages: [...conversation.messages, assistantMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleComposerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage({ prompt: composerValue });
  };

  const handleComposerKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await sendMessage({ prompt: composerValue });
    }
  };

  const handleComposerChange = (value: string) => {
    setComposerValue(value);
    setComposerError(null);
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    setPendingAttachments((currentAttachments) => {
      const existingKeys = new Set(currentAttachments.map((attachment) => `${attachment.file.name}-${attachment.file.size}`));
      const nextAttachments = [...currentAttachments];

      files.forEach((file) => {
        const key = `${file.name}-${file.size}`;

        if (!existingKeys.has(key) && nextAttachments.length < MAX_ATTACHMENTS) {
          nextAttachments.push({ id: createId(), file });
          existingKeys.add(key);
        }
      });

      return nextAttachments;
    });

    event.target.value = '';
  };

  const removePendingAttachment = (attachmentId: string) => {
    setPendingAttachments((currentAttachments) => currentAttachments.filter((attachment) => attachment.id !== attachmentId));
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    const SpeechRecognitionApi = getSpeechRecognitionApi();

    if (!SpeechRecognitionApi) {
      setComposerError('المتصفح الحالي لا يدعم تحويل الصوت إلى نص.');
      return;
    }

    const recognition = new SpeechRecognitionApi();
    let finalTranscript = '';

    recognition.lang = 'ar-EG';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript ?? '';

        if (event.results[index].isFinal) {
          finalTranscript += `${transcript} `;
        } else {
          interimTranscript += transcript;
        }
      }

      const mergedTranscript = `${finalTranscript} ${interimTranscript}`.replace(/\s+/g, ' ').trim();
      setComposerValue(mergedTranscript);
      setPendingInputMode('voice');
      setComposerError(null);
    };

    recognition.onerror = () => {
      setComposerError('تعذر التقاط الرسالة الصوتية. حاول مرة تانية.');
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  return {
    activeConversationId,
    activeMessages,
    closeAssistant,
    composerError,
    composerValue,
    contextTitle,
    createNewConversation,
    fileInputRef,
    handleComposerChange,
    handleComposerKeyDown,
    handleComposerSubmit,
    handleFileSelection,
    handleVoiceInput,
    historyConversations,
    introPhase,
    isHistoryOpen,
    isListening,
    isLoading,
    isOpen,
    listEndRef,
    openAssistant,
    pendingAttachments,
    removePendingAttachment,
    selectConversation,
    sendMessage,
    setIsHistoryOpen,
  };
}
