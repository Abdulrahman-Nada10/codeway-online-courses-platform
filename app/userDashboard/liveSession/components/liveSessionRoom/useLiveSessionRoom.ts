'use client';

import { useEffect, useMemo, useState } from 'react';
import { LiveSession, SessionPoll } from '../../types';
import { createDefaultPollDraft, currentRoomUser, maxPollOptions, minPollOptions, roomTabs } from './constants';
import { PollDraft, RoomFeedItem, RoomTab } from './types';
import {
  buildInitialRoomItems,
  buildPollOptionId,
  createRoomItemId,
  getRoomStorageKey,
  getRoomTabCounts,
  getVisibleRoomItems,
  parseStoredRoomItems,
  sortRoomItems,
} from './utils';

export function useLiveSessionRoom(session: LiveSession) {
  const initialItems = useMemo(() => buildInitialRoomItems(session), [session]);
  const storageKey = useMemo(() => getRoomStorageKey(session.id), [session.id]);

  const [activeTab, setActiveTab] = useState<RoomTab>('chat');
  const [items, setItems] = useState<RoomFeedItem[]>(initialItems);
  const [textValue, setTextValue] = useState('');
  const [pollDraft, setPollDraft] = useState<PollDraft>(createDefaultPollDraft);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setItems(initialItems);
      return;
    }

    const storedItems = parseStoredRoomItems(window.localStorage.getItem(storageKey));
    setItems(storedItems ?? initialItems);
  }, [initialItems, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      const nextItems = parseStoredRoomItems(event.newValue);
      if (nextItems) {
        setItems(nextItems);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  const visibleItems = useMemo(() => getVisibleRoomItems(items, activeTab), [activeTab, items]);
  const counts = useMemo(() => getRoomTabCounts(items), [items]);
  const activeTabMeta = useMemo(() => roomTabs.find((tab) => tab.id === activeTab) ?? roomTabs[0], [activeTab]);

  const submitText = () => {
    const trimmedText = textValue.trim();

    if (!trimmedText || activeTab === 'poll') {
      return false;
    }

    const createdAt = new Date().toISOString();
    const id = createRoomItemId(activeTab === 'questions' ? 'question' : 'comment');

    const nextItem: RoomFeedItem =
      activeTab === 'questions'
        ? {
            id,
            type: 'question',
            createdAt,
            question: {
              id,
              authorId: currentRoomUser.id,
              author: currentRoomUser.name,
              avatar: currentRoomUser.avatar,
              text: trimmedText,
              role: currentRoomUser.role,
              createdAt,
              addressedTo: 'instructor',
              status: 'open',
            },
          }
        : {
            id,
            type: 'comment',
            createdAt,
            message: {
              id,
              authorId: currentRoomUser.id,
              author: currentRoomUser.name,
              avatar: currentRoomUser.avatar,
              text: trimmedText,
              role: currentRoomUser.role,
              createdAt,
            },
          };

    setItems((currentItems) => sortRoomItems([...currentItems, nextItem]));
    setTextValue('');
    return true;
  };

  const updatePollDraftQuestion = (value: string) => {
    setPollDraft((currentDraft) => ({
      ...currentDraft,
      question: value,
    }));
  };

  const updatePollDraftOption = (index: number, value: string) => {
    setPollDraft((currentDraft) => ({
      ...currentDraft,
      options: currentDraft.options.map((option, optionIndex) => (optionIndex === index ? value : option)),
    }));
  };

  const addPollOption = () => {
    setPollDraft((currentDraft) => {
      if (currentDraft.options.length >= maxPollOptions) {
        return currentDraft;
      }

      return {
        ...currentDraft,
        options: [...currentDraft.options, ''],
      };
    });
  };

  const removePollOption = (index: number) => {
    setPollDraft((currentDraft) => {
      if (currentDraft.options.length <= minPollOptions) {
        return currentDraft;
      }

      return {
        ...currentDraft,
        options: currentDraft.options.filter((_, optionIndex) => optionIndex !== index),
      };
    });
  };

  const submitPoll = () => {
    const question = pollDraft.question.trim();
    const options = pollDraft.options.map((option) => option.trim()).filter(Boolean);

    if (!question || options.length < minPollOptions) {
      return false;
    }

    const createdAt = new Date().toISOString();
    const pollId = createRoomItemId('poll');

    const poll: SessionPoll = {
      id: pollId,
      authorId: currentRoomUser.id,
      author: currentRoomUser.name,
      avatar: currentRoomUser.avatar,
      question,
      role: currentRoomUser.role,
      createdAt,
      status: 'live',
      options: options.map((option, index) => ({
        id: buildPollOptionId(pollId, index),
        label: option,
        votes: 0,
      })),
    };

    setItems((currentItems) =>
      sortRoomItems([
        ...currentItems,
        {
          id: pollId,
          type: 'poll',
          createdAt,
          poll,
        },
      ]),
    );
    setPollDraft(createDefaultPollDraft());
    return true;
  };

  const voteOnPoll = (pollId: string, optionId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.type !== 'poll' || item.poll.id !== pollId || item.poll.status === 'ended') {
          return item;
        }

        if (item.poll.votedOptionId === optionId) {
          return item;
        }

        return {
          ...item,
          poll: {
            ...item.poll,
            votedOptionId: optionId,
            options: item.poll.options.map((option) => {
              if (option.id === item.poll.votedOptionId) {
                return {
                  ...option,
                  votes: Math.max(0, option.votes - 1),
                };
              }

              if (option.id === optionId) {
                return {
                  ...option,
                  votes: option.votes + 1,
                };
              }

              return option;
            }),
          },
        };
      }),
    );
  };

  const endPoll = (pollId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.type !== 'poll' || item.poll.id !== pollId || item.poll.authorId !== currentRoomUser.id) {
          return item;
        }

        return {
          ...item,
          poll: {
            ...item.poll,
            status: 'ended',
          },
        };
      }),
    );
  };

  return {
    activeTab,
    activeTabMeta,
    counts,
    currentUserId: currentRoomUser.id,
    items,
    pollDraft,
    setActiveTab,
    setTextValue,
    submitPoll,
    submitText,
    textValue,
    updatePollDraftOption,
    updatePollDraftQuestion,
    addPollOption,
    removePollOption,
    visibleItems,
    voteOnPoll,
    endPoll,
  };
}
