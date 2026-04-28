'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import VideoPlayerLayout from './videoPlayerLayout/VideoPlayerLayout';
import { getVideoPlayerCourse } from './videoPlayerLayout/data';

export default function CourseLearningPage() {
  const { t, i18n } = useTranslation();
  const params = useParams<{ courseId: string }>();
  const courseId = Number(params.courseId);
  const course = useMemo(
    () => getVideoPlayerCourse(courseId, t),
    [courseId, t, i18n.language]
  );

  if (Number.isNaN(courseId)) return null;

  return <VideoPlayerLayout course={course} />;
}
