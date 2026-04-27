'use client';

import { VideoPlayerLesson } from './types';
import LessonSidebarItem from './LessonSidebarItem';

export default function LessonSidebar({
  lessons,
  activeLessonId,
  onLessonSelect,
}: {
  lessons: VideoPlayerLesson[];
  activeLessonId: number;
  onLessonSelect: (lessonId: number) => void;
}) {
  return (
    <aside className="w-full overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white shadow-[0_10px_24px_rgba(17,53,85,0.06)] lg:w-60 xl:w-79.5 lg:self-start lg:shrink-0">
      <div className="custom-scrollbar h-full overflow-y-auto max-h-80 sm:max-h-95 md:max-h-105 lg:max-h-207.25">
        {lessons.map((lesson) => (
          <LessonSidebarItem
            key={lesson.id}
            lesson={lesson}
            isActive={lesson.id === activeLessonId}
            onClick={() => onLessonSelect(lesson.id)}
          />
        ))}
      </div>
    </aside>
  );
}
