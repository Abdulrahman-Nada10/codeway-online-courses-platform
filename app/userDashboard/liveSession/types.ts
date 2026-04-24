export type SessionTab = 'upcoming' | 'live' | 'past';

export type SessionAuthorRole = 'student' | 'instructor';

export interface SessionResource {
  id: string;
  name: string;
  type: 'pdf' | 'link';
}

export interface SessionMessage {
  id: string;
  authorId: string;
  author: string;
  avatar: string;
  text: string;
  role: SessionAuthorRole;
  createdAt: string;
}

export interface SessionQuestion extends SessionMessage {
  addressedTo: 'instructor';
  status?: 'open' | 'answered';
}

export interface SessionPollOption {
  id: string;
  label: string;
  votes: number;
}

export interface SessionPoll {
  id: string;
  authorId: string;
  author: string;
  avatar: string;
  question: string;
  role: SessionAuthorRole;
  createdAt: string;
  status: 'live' | 'ended';
  votedOptionId?: string | null;
  options: SessionPollOption[];
}

export interface LiveSession {
  id: number;
  slug: string;
  title: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  image: string;
  category: SessionTab;
  description: string;
  dateLabel?: string;
  timeLabel?: string;
  startTime?: string;
  endTime?: string;
  viewers?: number;
  durationLabel?: string;
  resources?: SessionResource[];
  speakers?: Array<{
    name: string;
    role: string;
  }>;
  messages?: SessionMessage[];
  questions?: SessionQuestion[];
  polls?: SessionPoll[];
}
