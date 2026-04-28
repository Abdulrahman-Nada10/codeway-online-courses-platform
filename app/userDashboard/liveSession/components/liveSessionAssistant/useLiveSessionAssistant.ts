'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { sendAiChatMessage } from '@/services/aiChat';
import {
  isValidCourseId,
  loadSessionContext,
  resolveCourseId,
  saveSessionContext,
  type AiSessionContext,
} from '@/services/aiCourseResolver';
import { useAppSelector } from '@/app/store/hooks';
import { getAttachmentContext } from './attachments';
import { DEFAULT_STORAGE_KEY, INTRO_DELAY_MS, MAX_ATTACHMENTS, RECENT_HISTORY_LIMIT, SEND_DEBOUNCE_MS } from './constants';
import { getSpeechRecognitionApi } from './speech';
import {
  ConversationMessage,
  ConversationRecord,
  InputMode,
  LiveSessionAssistantProps,
  PendingAttachment,
  SpeechRecognitionLike,
} from './types';
import {
  createConversation,
  createId,
  getAttachmentMeta,
  getAssistantReply,
  getConversationTitle,
  parseStoredConversations,
} from './utils';

function getOptionalParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0]?.trim() || undefined;
  }

  return value?.trim() || undefined;
}

function buildHistory(messages: ConversationMessage[], limit: number) {
  return messages
    .filter((message) => message.content.trim())
    .slice(-limit)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function isDuplicateAssistantMessage(
  messages: ConversationMessage[],
  content: string,
  windowMs = 2000,
): boolean {
  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    return false;
  }

  if (lastMessage.role !== 'assistant') {
    return false;
  }

  if (lastMessage.content !== content) {
    return false;
  }

  return Date.now() - lastMessage.createdAt < windowMs;
}

export function useLiveSessionAssistant({
  contextTitle,
  storageKey = DEFAULT_STORAGE_KEY,
  courseId,
  lessonId,
  sessionSlug,
  sessionContextData,
}: LiveSessionAssistantProps) {
  const { t, i18n } = useTranslation();
  const initialConversationRef = useRef<ConversationRecord>(createConversation());
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const hasLoadedRef = useRef(false);
  const isSendingRef = useRef(false);
  const lastSendRef = useRef<{ signature: string; sentAt: number } | null>(null);
  const routeParams = useParams<Record<string, string | string[]>>();
  const searchParams = useSearchParams();

  // Redux state for course resolution
  const reduxSelectedCourse = useAppSelector((state) => state.courses.selectedCourse);
  const reduxCourses = useAppSelector((state) => state.courses.courses);

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

  // Session context from localStorage for persistence across chats
  const [sessionContext, setSessionContext] = useState<AiSessionContext>(getDefaultSessionContext);

  function getDefaultSessionContext(): AiSessionContext {
    if (typeof window === 'undefined') {
      return {
        courseId: null,
        lessonId: null,
        lastMessages: [],
        detectedTopics: [],
        lastResolvedAt: 0,
      };
    }
    return loadSessionContext();
  }

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

  /**
   * INTELLIGENT COURSE RESOLUTION
   * Multi-source priority resolution with debug logging.
   */
  const resolvedCourseId = useMemo(() => {
    const resolved = resolveCourseId({
      directCourseId: courseId,
      searchCourseId: searchParams.get('courseId'),
      routeCourseId: getOptionalParamValue(routeParams.courseId),
      routeSessionId: getOptionalParamValue(routeParams.sessionId) ?? sessionSlug,
      reduxSelectedCourse,
      reduxCourses,
      contextTitle: contextTitle ?? sessionContextData?.title,
      sessionContext,
    });

    // eslint-disable-next-line no-console
    console.log('[AI DEBUG] Resolved courseId:', resolved);
    // eslint-disable-next-line no-console
    console.log('[AI DEBUG] Resolution sources:', {
      directCourseId: courseId,
      searchCourseId: searchParams.get('courseId'),
      routeCourseId: getOptionalParamValue(routeParams.courseId),
      routeSessionId: getOptionalParamValue(routeParams.sessionId) ?? sessionSlug,
      reduxSelectedCourseId: reduxSelectedCourse?.id,
      reduxCoursesCount: reduxCourses?.length,
      contextTitle,
      sessionContextCourseId: sessionContext.courseId,
    });

    return resolved;
  }, [
    courseId,
    searchParams,
    routeParams.courseId,
    routeParams.sessionId,
    sessionSlug,
    reduxSelectedCourse,
    reduxCourses,
    contextTitle,
    sessionContextData?.title,
    sessionContext,
  ]);

  const resolvedLessonId = useMemo(() => {
    const directLessonId = lessonId?.trim();

    if (directLessonId) {
      return directLessonId;
    }

    const searchLessonId = searchParams.get('lessonId')?.trim();

    if (searchLessonId) {
      return searchLessonId;
    }

    return getOptionalParamValue(routeParams.lessonId);
  }, [lessonId, routeParams, searchParams]);

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
    if (isLoading || isSendingRef.current || !activeConversation) {
      return;
    }

    const textPrompt = prompt.trim();
    const selectedAttachments = attachments ?? pendingAttachments;

    if (!textPrompt && selectedAttachments.length === 0) {
      return;
    }

    // INTELLIGENT COURSE RESOLUTION WITH MESSAGE CONTEXT
    // Try to infer from message if still not resolved
    const messageInferredCourseId = resolveCourseId({
      directCourseId: courseId,
      searchCourseId: searchParams.get('courseId'),
      routeCourseId: getOptionalParamValue(routeParams.courseId),
      routeSessionId: getOptionalParamValue(routeParams.sessionId) ?? sessionSlug,
      reduxSelectedCourse,
      reduxCourses,
      contextTitle: contextTitle ?? sessionContextData?.title,
      message: textPrompt,
      sessionContext,
    });

    const finalCourseId = messageInferredCourseId ?? resolvedCourseId;

    // eslint-disable-next-line no-console
    console.log('[AI DEBUG] Final courseId before send:', finalCourseId);

    if (!isValidCourseId(finalCourseId)) {
      setComposerError(t('assistant.selectCourseFirst'));
      // eslint-disable-next-line no-console
      console.warn('[AI DEBUG] Blocked send: no valid courseId resolved.');
      return;
    }

    const selectedInputMode = inputMode ?? pendingInputMode;
    const requestSignature = JSON.stringify({
      conversationId: activeConversation.id,
      textPrompt,
      inputMode: selectedInputMode,
      attachments: selectedAttachments.map((attachment) => `${attachment.file.name}-${attachment.file.size}`),
    });
    const now = Date.now();

    if (
      lastSendRef.current &&
      lastSendRef.current.signature === requestSignature &&
      now - lastSendRef.current.sentAt < SEND_DEBOUNCE_MS
    ) {
      return;
    }

    lastSendRef.current = { signature: requestSignature, sentAt: now };
    isSendingRef.current = true;

    const visibleMessage =
      displayText?.trim() || textPrompt || (selectedAttachments[0] ? `${t('assistant.attachment')}: ${selectedAttachments[0].file.name}` : t('assistant.newMessage'));
    const conversationId = activeConversation.id;
    const previousMessages = activeConversation.messages;
    const userMessage = {
      id: createId(),
      role: 'user' as const,
      content: visibleMessage,
      createdAt: Date.now(),
      attachments: selectedAttachments.map((attachment) => getAttachmentMeta(attachment.file)),
      inputMode: selectedInputMode,
    };

    updateConversationMessages(conversationId, (conversation) => {
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
        messageParts.push(t('assistant.currentContextLine', { contextTitle }));
      }

      if (textPrompt) {
        messageParts.push(textPrompt);
      }

      if (attachmentContext) {
        messageParts.push(`${t('assistant.attachmentsHeader')}:\n${attachmentContext}`);
      }

      const replyPayload = await sendAiChatMessage({
        message: messageParts.join('\n\n') || visibleMessage,
        courseId: finalCourseId!,
        history: buildHistory(previousMessages, RECENT_HISTORY_LIMIT),
      });
      const reply = getAssistantReply(replyPayload);

      // Persist resolved courseId to session context
      saveSessionContext({
        courseId: finalCourseId,
        lessonId: resolvedLessonId,
        lastMessages: [...(sessionContext.lastMessages.slice(-4)), textPrompt].slice(-5),
      });
      setSessionContext((prev) => ({
        ...prev,
        courseId: finalCourseId,
        lessonId: resolvedLessonId ?? prev.lessonId,
        lastMessages: [...(prev.lastMessages.slice(-4)), textPrompt].slice(-5),
        lastResolvedAt: Date.now(),
      }));

      if (isDuplicateAssistantMessage(activeConversation.messages, reply)) {
        // eslint-disable-next-line no-console
        console.warn('[useLiveSessionAssistant] Duplicate assistant message detected; skipping append.');
      } else {
        const assistantMessage = {
          id: createId(),
          role: 'assistant' as const,
          content: reply,
          createdAt: Date.now(),
        };

        updateConversationMessages(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: Date.now(),
          messages: [...conversation.messages, assistantMessage],
        }));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[useLiveSessionAssistant] AI chat error:', error);

      let errorText = t('assistant.aiConnectionError');

      if (error instanceof TypeError) {
        errorText = t('assistant.serverConnectionError');
      } else if (error instanceof Error) {
        const msg = error.message.toLowerCase();

        if (msg.includes('not valid json')) {
          errorText = t('assistant.invalidResponse');
        } else if (msg.includes('did not include a valid "reply"') || msg.includes('empty')) {
          errorText = t('assistant.emptyResponse');
        } else if (msg.includes('status 404')) {
          errorText = t('assistant.endpointNotFound');
        } else if (msg.includes('status 5')) {
          errorText = t('assistant.serverError');
        } else if (msg.includes('status 4')) {
          errorText = t('assistant.invalidRequest');
        } else if (msg.includes('no lessons found')) {
          errorText = t('assistant.noLessonsFound');
        } else {
          errorText = error.message;
        }
      }

      setComposerError(errorText);
      toast.error(errorText, { id: 'ai-chat-error' });
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
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
      setComposerError(t('assistant.voiceNotSupported'));
      return;
    }

    const recognition = new SpeechRecognitionApi();
    let finalTranscript = '';

    recognition.lang = i18n.language.startsWith('ar') ? 'ar-EG' : 'en-US';
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
      setComposerError(t('assistant.voiceCaptureError'));
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

