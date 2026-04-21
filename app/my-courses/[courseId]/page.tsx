'use client';

import { useParams } from 'next/navigation';
import VideoPlayerLayout from './videoPlayerLayout/VideoPlayerLayout';
import { getVideoPlayerCourse } from './videoPlayerLayout/data';

export default function CourseLearningPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = Number(params.courseId);

  if (Number.isNaN(courseId)) return null;

  const course = getVideoPlayerCourse(courseId);

  return <VideoPlayerLayout course={course} />;
}
