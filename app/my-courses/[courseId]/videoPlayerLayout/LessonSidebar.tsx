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
    <aside className="w-full overflow-hidden rounded-[16px] border border-[#E8D8CA] bg-white shadow-[0_10px_24px_rgba(17,53,85,0.06)] lg:w-[300px] xl:w-[358px] lg:self-start lg:flex-shrink-0">
      <div className="custom-scrollbar h-full overflow-y-auto max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[829px]">
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
