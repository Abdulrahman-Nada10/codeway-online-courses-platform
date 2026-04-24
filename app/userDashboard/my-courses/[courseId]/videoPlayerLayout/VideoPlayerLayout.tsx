'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AssignmentsPanel from './AssignmentsPanel';
import CommentsPanel from './CommentsPanel';
import { VideoPlayerCourse, VideoPlayerPanel, VideoPlayerTab, LessonInteractionState, VideoPlayerLesson } from './types';
import LessonActions from './LessonActions';
import LessonSidebar from './LessonSidebar';
import LessonTabs from './LessonTabs';
import OverviewPanel from './OverviewPanel';
import ResourcesPanel from './ResourcesPanel';
import VideoHero from './VideoHero';
import { getEffectiveLessonStatus } from './utils';

export default function VideoPlayerLayout({ course }: { course: VideoPlayerCourse }) {
  const [activeLessonId, setActiveLessonId] = useState(course.lessons[0]?.id ?? 1);
  const [activeTab, setActiveTab] = useState<VideoPlayerTab>('overview');
  const [previousTab, setPreviousTab] = useState<VideoPlayerTab>('overview');
  const [activePanel, setActivePanel] = useState<VideoPlayerPanel>('content');
  const [lessonStates, setLessonStates] = useState<Record<number, LessonInteractionState>>(
    () =>
      Object.fromEntries(
        course.lessons.map((lesson) => [
          lesson.id,
          {
            isLiked: false,
            likesCount: lesson.likes,
            isMarkedComplete: lesson.status === 'completed',
          },
        ]),
      ) as Record<number, LessonInteractionState>,
  );
  const [lessonComments, setLessonComments] = useState<Record<number, VideoPlayerLesson['content']['comments']>>(
    () =>
      Object.fromEntries(course.lessons.map((lesson) => [lesson.id, lesson.content.comments])),
  );

  const activeLesson = useMemo(
    () => course.lessons.find((lesson) => lesson.id === activeLessonId) ?? course.lessons[0],
    [activeLessonId, course.lessons],
  );

  if (!activeLesson) return null;

  const activeLessonState = lessonStates[activeLesson.id];
  const effectiveStatus = getEffectiveLessonStatus(activeLesson, activeLessonState.isMarkedComplete);
  const activeComments = lessonComments[activeLesson.id] ?? activeLesson.content.comments;

  const sidebarLessons = course.lessons.map((lesson) => {
    const state = lessonStates[lesson.id];
    return {
      ...lesson,
      likes: state?.likesCount ?? lesson.likes,
      commentsCount: (lessonComments[lesson.id] ?? lesson.content.comments).length,
      status: getEffectiveLessonStatus(lesson, state?.isMarkedComplete ?? false),
    };
  });

  const showTabs = activePanel !== 'comments';

  const handleLike = () => {
    setLessonStates((prev) => {
      const current = prev[activeLesson.id];
      return {
        ...prev,
        [activeLesson.id]: {
          ...current,
          isLiked: !current.isLiked,
          likesCount: current.isLiked ? current.likesCount - 1 : current.likesCount + 1,
        },
      };
    });
  };

  const handleComplete = () => {
    if (activeLesson.status === 'locked') return;

    setLessonStates((prev) => {
      const current = prev[activeLesson.id];
      return {
        ...prev,
        [activeLesson.id]: {
          ...current,
          isMarkedComplete: !current.isMarkedComplete,
        },
      };
    });
  };

  const handleCommentsToggle = () => {
    if (activePanel === 'comments') {
      setActivePanel('content');
      setActiveTab(previousTab);
    } else {
      setPreviousTab(activeTab);
      setActivePanel('comments');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-[#FFF3EB] pt-22 lg:h-screen lg:overflow-hidden lg:pt-14">
      <div className="min-h-[calc(100vh-5.5rem)] md:mr-0 lg:h-[calc(100vh-6.5rem)] lg:min-h-0 lg:mr-24 xl:mr-28">
        <main className="h-full w-full overflow-visible p-2.5 sm:p-4 lg:overflow-hidden lg:px-5 lg:py-0 xl:px-6" dir="rtl">
          <div className="mx-auto flex h-full max-w-269 flex-col gap-2 pt-4 lg:gap-2.5 lg:pt-6 xl:pt-7 lg:mr-21">
            <div className="flex w-full flex-col items-start gap-1 text-right xl:max-w-175.5 lg:mr-12">
              <Link
                href="/userDashboard/my-courses"
                className="inline-flex items-center justify-end gap-1.5 text-[15px] font-bold  transition hover:text-[#FF6400]"
              >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#ffff]">
                    <ArrowRight className="w-6 h-6 text-[#FF6400]" />
                  </div>
                {course.breadcrumbLabel}
              </Link>
              <h1 className="text-[15px] font-extrabold text-[#111111] sm:text-[14px] lg:text-[16px] xl:text-[18px]">
                {course.title}
              </h1>
            </div>
            <div className="grid gap-3 lg:h-[calc(100%-3.75rem)] lg:gap-2 lg:grid-cols-[minmax(0,1fr)_300px] lg:justify-center xl:grid-cols-[minmax(0,702px)_358px] xl:items-start" dir="ltr">
              <section className="order-1 flex min-w-0 flex-col gap-2 lg:h-full xl:w-175.5 xl:-translate-x-14 xl:-translate-y-11">
                <div
                  className={`grid w-full gap-2 ${
                    activePanel === 'comments'
                      ? 'grid-rows-[198px_54px_minmax(0,1fr)] sm:grid-rows-[228px_54px_minmax(0,1fr)] md:grid-rows-[260px_54px_minmax(0,1fr)] lg:h-full lg:grid-rows-[270px_54px_minmax(0,1fr)] xl:grid-rows-[236px_54px_minmax(0,1fr)]'
                      : 'grid-rows-[198px_54px_58px_minmax(0,1fr)] sm:grid-rows-[228px_54px_58px_minmax(0,1fr)] md:grid-rows-[260px_54px_58px_minmax(0,1fr)] lg:h-full lg:grid-rows-[270px_54px_58px_minmax(0,1fr)] xl:grid-rows-[236px_54px_58px_minmax(0,1fr)]'
                  }`}
                >
                  <div className="row-span-1">
                    <div className="h-full w-full">
                      <VideoHero image={course.heroImage} title={activeLesson.shortTitle} status={effectiveStatus} />
                    </div>
                  </div>

                  <div className="row-span-1">
                    <LessonActions
                      title={activeLesson.shortTitle}
                      status={effectiveStatus}
                      likesCount={activeLessonState.likesCount}
                      isLiked={activeLessonState.isLiked}
                      isCommentsActive={activePanel === 'comments'}
                      onLike={handleLike}
                      onComments={handleCommentsToggle}
                      onComplete={handleComplete}
                    />
                  </div>

                  {showTabs && (
                    <div className="row-span-1">
                      <LessonTabs tabs={course.tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                  )}

                  <div className="row-span-1 min-h-0 overflow-hidden z-90">
                    {activePanel === 'comments' ? (
                      <CommentsPanel
                        comments={activeComments}
                        placeholder={course.commentsPlaceholder}
                        onClose={() => {
                          setActivePanel('content');
                          setActiveTab(previousTab);
                        }}
                        onCommentsChange={(comments) =>
                          setLessonComments((prev) => ({ ...prev, [activeLesson.id]: comments }))
                        }
                      />

                    ) : activeTab === 'overview' ? (
                      <OverviewPanel
                        duration={activeLesson.content.overviewDuration}
                        instructorName={course.instructorName}
                        instructorAvatar={course.instructorAvatar}
                        points={activeLesson.content.overviewPoints}
                      />
                    ) : activeTab === 'resources' ? (
                      <ResourcesPanel resources={activeLesson.content.resources} />
                    ) : (
                      <AssignmentsPanel assignments={activeLesson.content.assignments} />
                    )}
                  </div>
                </div>
              </section>

              <div className="order-2 w-full lg:h-full lg:w-75 xl:w-89.5">
                <LessonSidebar
                  lessons={sidebarLessons}
                  activeLessonId={activeLesson.id}
                  onLessonSelect={(lessonId) => {
                    setActiveLessonId(lessonId);
                    setActivePanel('content');
                    setActiveTab('overview');
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
