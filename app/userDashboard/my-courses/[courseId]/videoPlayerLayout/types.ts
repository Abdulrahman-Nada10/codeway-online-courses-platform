export type VideoPlayerTab = 'overview' | 'resources' | 'assignments';
export type LessonStatus = 'completed' | 'available' | 'locked';
export type VideoPlayerPanel = 'content' | 'comments';

export interface LessonComment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
}

export interface LessonResource {
  id: number;
  title: string;
  kind: 'pdf' | 'zip' | 'ppt';
}

export interface LessonAssignment {
  id: number;
  title: string;
  description: string;
  icon: 'check' | 'file';
}

export interface VideoPlayerLessonContent {
  overviewDuration: string;
  overviewPoints: string[];
  comments: LessonComment[];
  resources: LessonResource[];
  assignments: LessonAssignment[];
}

export interface VideoPlayerLesson {
  id: number;
  title: string;
  shortTitle: string;
  thumbnail: string;
  videoDuration: string;
  durationMinutes: number;
  likes: number;
  commentsCount: number;
  status: LessonStatus;
  content: VideoPlayerLessonContent;
}

export interface VideoPlayerCourse {
  id: number;
  title: string;
  breadcrumbLabel: string;
  instructorName: string;
  instructorAvatar: string;
  heroImage: string;
  tabs: { id: VideoPlayerTab; label: string }[];
  commentsPlaceholder: string;
  lessons: VideoPlayerLesson[];
}

export interface LessonInteractionState {
  isLiked: boolean;
  likesCount: number;
  isMarkedComplete: boolean;
}
