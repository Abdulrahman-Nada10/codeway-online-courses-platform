import { LiveSession, SessionPoll } from '../../types';
import { RoomFeedItem, RoomTab, RoomTabCount } from './types';

const timeFormatter = new Intl.DateTimeFormat('ar-EG', {
  hour: 'numeric',
  minute: '2-digit',
});

export function getRoomStorageKey(sessionId: number) {
  return `live-session-room:${sessionId}`;
}

export function createRoomItemId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildPollOptionId(pollId: string, index: number) {
  return `${pollId}-option-${index + 1}`;
}

export function sortRoomItems(items: RoomFeedItem[]) {
  return [...items].sort((firstItem, secondItem) => {
    return new Date(firstItem.createdAt).getTime() - new Date(secondItem.createdAt).getTime();
  });
}

export function buildInitialRoomItems(session: LiveSession) {
  const messageItems: RoomFeedItem[] = (session.messages ?? []).map((message) => ({
    id: `comment-${message.id}`,
    type: 'comment',
    createdAt: message.createdAt,
    message,
  }));

  const questionItems: RoomFeedItem[] = (session.questions ?? []).map((question) => ({
    id: `question-${question.id}`,
    type: 'question',
    createdAt: question.createdAt,
    question,
  }));

  const pollItems: RoomFeedItem[] = (session.polls ?? []).map((poll) => ({
    id: `poll-${poll.id}`,
    type: 'poll',
    createdAt: poll.createdAt,
    poll,
  }));

  return sortRoomItems([...messageItems, ...questionItems, ...pollItems]);
}

export function parseStoredRoomItems(serializedValue: string | null) {
  if (!serializedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(serializedValue);

    if (!Array.isArray(parsedValue)) {
      return null;
    }

    return sortRoomItems(parsedValue as RoomFeedItem[]);
  } catch {
    return null;
  }
}

export function getVisibleRoomItems(items: RoomFeedItem[], activeTab: RoomTab) {
  if (activeTab === 'chat') {
    return items;
  }

  if (activeTab === 'questions') {
    return items.filter((item) => item.type === 'question');
  }

  return items.filter((item) => item.type === 'poll');
}

export function getRoomTabCounts(items: RoomFeedItem[]): RoomTabCount {
  return {
    chat: items.length,
    questions: items.filter((item) => item.type === 'question').length,
    poll: items.filter((item) => item.type === 'poll').length,
  };
}

export function getPollTotalVotes(poll: SessionPoll) {
  return poll.options.reduce((totalVotes, option) => totalVotes + option.votes, 0);
}

export function getPollOptionPercentage(poll: SessionPoll, optionId: string) {
  const totalVotes = getPollTotalVotes(poll);

  if (!totalVotes) {
    return 0;
  }

  const option = poll.options.find((pollOption) => pollOption.id === optionId);
  return option ? Math.round((option.votes / totalVotes) * 100) : 0;
}

export function formatRoomTime(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return timeFormatter.format(parsedDate);
}
