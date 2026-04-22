export type SessionTab = 'upcoming' | 'live' | 'past';

export interface SessionResource {
  id: string;
  name: string;
  type: 'pdf' | 'link';
}

export interface SessionMessage {
  id: string;
  author: string;
  avatar: string;
  text: string;
  role?: string;
}

export interface SessionPollOption {
  id: string;
  label: string;
  percentage: number;
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
  poll?: {
    question: string;
    options: SessionPollOption[];
  };
}
