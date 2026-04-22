import { LessonStatus, VideoPlayerLesson } from './types';

export function getLessonStatusLabel(status: LessonStatus) {
  if (status === 'completed') return 'مكتمل';
  if (status === 'available') return 'غير مكتمل';
  return 'مغلق';
}

export function getLessonStatusColor(status: LessonStatus) {
  if (status === 'completed') return 'text-[#22C55E]';
  if (status === 'available') return 'text-[#7B7B7B]';
  return 'text-[#113555]';
}

export function getEffectiveLessonStatus(
  lesson: VideoPlayerLesson,
  isMarkedComplete: boolean,
): LessonStatus {
  if (lesson.status === 'locked') return 'locked';
  return isMarkedComplete ? 'completed' : 'available';
}
