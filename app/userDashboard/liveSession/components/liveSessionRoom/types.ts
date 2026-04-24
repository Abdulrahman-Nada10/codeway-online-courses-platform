import { SessionMessage, SessionPoll, SessionQuestion } from '../../types';

export type RoomTab = 'chat' | 'questions' | 'poll';

export interface RoomCommentItem {
  id: string;
  type: 'comment';
  createdAt: string;
  message: SessionMessage;
}

export interface RoomQuestionItem {
  id: string;
  type: 'question';
  createdAt: string;
  question: SessionQuestion;
}

export interface RoomPollItem {
  id: string;
  type: 'poll';
  createdAt: string;
  poll: SessionPoll;
}

export type RoomFeedItem = RoomCommentItem | RoomQuestionItem | RoomPollItem;

export interface PollDraft {
  question: string;
  options: string[];
}

export interface RoomTabCount {
  chat: number;
  questions: number;
  poll: number;
}

export interface RoomUser {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'instructor';
}
