import type { TFunction } from "i18next";
import { VideoPlayerCourse, VideoPlayerLesson } from "./types";

const profileAvatar = "/profile.jpg";
const lessonThumb = "/prog.jpg";

function makeComments(t: TFunction, topic: string, count = 4) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    author: t("dashboard.demoUser"),
    avatar: profileAvatar,
    content: t("player.commentTemplate", { topic }),
    timeAgo: t("player.threeMinutesAgo"),
  }));
}

function makeResources(t: TFunction, topic: string) {
  return [
    { id: 1, title: t("player.resourceSummary", { topic }), kind: "pdf" as const },
    { id: 2, title: t("player.resourceFiles", { topic }), kind: "zip" as const },
    { id: 3, title: t("player.resourcePresentation", { topic }), kind: "ppt" as const },
  ];
}

function makeAssignments(t: TFunction, topic: string) {
  return [
    {
      id: 1,
      title: t("player.assignmentOneTitle", { topic }),
      description: t("player.assignmentOneDescription", { topic }),
      icon: "check" as const,
    },
    {
      id: 2,
      title: t("player.assignmentTwoTitle", { topic }),
      description: t("player.assignmentTwoDescription", { topic }),
      icon: "file" as const,
    },
  ];
}

function createLesson(
  t: TFunction,
  lesson: Partial<VideoPlayerLesson> &
    Pick<VideoPlayerLesson, "id" | "title" | "shortTitle" | "status">
): VideoPlayerLesson {
  const topic = lesson.shortTitle;

  return {
    thumbnail: lessonThumb,
    videoDuration: "15:00",
    durationMinutes: 30,
    likes: 199,
    commentsCount: 30,
    content: {
      overviewDuration: t("player.defaultOverviewDuration"),
      overviewPoints: [
        t("player.overviewIntro"),
        t("player.overviewConcept", { topic }),
        t("player.overviewUsage", { topic }),
        t("player.overviewPracticalPoints"),
        t("player.overviewOutcome"),
      ],
      comments: makeComments(t, topic),
      resources: makeResources(t, topic),
      assignments: makeAssignments(t, topic),
    },
    ...lesson,
  };
}

function getLessons(t: TFunction): VideoPlayerLesson[] {
  return [
    createLesson(t, {
      id: 1,
      title: t("player.lessons.1.title"),
      shortTitle: t("player.lessons.1.shortTitle"),
      status: "completed",
      content: {
        overviewDuration: t("player.defaultOverviewDuration"),
        overviewPoints: [
          t("player.overviewIntro"),
          t("player.lessonOnePointOne"),
          t("player.lessonOnePointTwo"),
          t("player.lessonOnePointThree"),
          t("player.lessonOnePointFour"),
        ],
        comments: makeComments(t, t("player.lessons.1.shortTitle"), 5),
        resources: makeResources(t, t("player.lessonResourceTopic")),
        assignments: makeAssignments(t, t("player.lessonAssignmentTopic")),
      },
    }),
    createLesson(t, {
      id: 2,
      title: t("player.lessons.2.title"),
      shortTitle: t("player.lessons.2.shortTitle"),
      status: "available",
      content: {
        overviewDuration: "",
        overviewPoints: [],
        comments: makeComments(t, t("player.lessons.2.shortTitle")),
        resources: makeResources(t, t("player.lessonTwoTopic")),
        assignments: makeAssignments(t, t("player.lessonTwoTopic")),
      },
    }),
    createLesson(t, {
      id: 3,
      title: t("player.lessons.3.title"),
      shortTitle: t("player.lessons.3.shortTitle"),
      status: "available",
      content: {
        overviewDuration: t("player.lessonThreeDuration"),
        overviewPoints: [
          t("player.lessonThreePointOne"),
          t("player.lessonThreePointTwo"),
          t("player.lessonThreePointThree"),
        ],
        comments: makeComments(t, t("player.lessonThreeTopic")),
        resources: [],
        assignments: makeAssignments(t, t("player.lessonThreeTopic")),
      },
    }),
    createLesson(t, {
      id: 4,
      title: t("player.lessons.4.title"),
      shortTitle: t("player.lessons.4.shortTitle"),
      status: "locked",
      content: {
        overviewDuration: t("player.lessonFourDuration"),
        overviewPoints: [
          t("player.lessonFourPointOne"),
          t("player.lessonFourPointTwo"),
          t("player.lessonFourPointThree"),
        ],
        comments: makeComments(t, t("player.lessonFourTopic")),
        resources: makeResources(t, t("player.lessonFourTopic")),
        assignments: [],
      },
    }),
    createLesson(t, {
      id: 5,
      title: t("player.lessons.5.title"),
      shortTitle: t("player.lessons.5.shortTitle"),
      status: "locked",
    }),
    createLesson(t, {
      id: 6,
      title: t("player.lessons.6.title"),
      shortTitle: t("player.lessons.6.shortTitle"),
      status: "locked",
      content: {
        overviewDuration: t("player.lessonSixDuration"),
        overviewPoints: [
          t("player.lessonSixPointOne"),
          t("player.lessonSixPointTwo"),
        ],
        comments: makeComments(t, t("player.lessonSixTopic")),
        resources: [],
        assignments: makeAssignments(t, t("player.lessonSixTopic")),
      },
    }),
    createLesson(t, {
      id: 7,
      title: t("player.lessons.7.title"),
      shortTitle: t("player.lessons.7.shortTitle"),
      status: "locked",
      content: {
        overviewDuration: t("player.lessonSevenDuration"),
        overviewPoints: [
          t("player.lessonSevenPointOne"),
          t("player.lessonSevenPointTwo"),
        ],
        comments: makeComments(t, t("player.lessonSevenTopic")),
        resources: makeResources(t, t("player.lessonSevenTopic")),
        assignments: [],
      },
    }),
    createLesson(t, {
      id: 8,
      title: t("player.lessons.8.title"),
      shortTitle: t("player.lessons.8.shortTitle"),
      status: "locked",
      content: {
        overviewDuration: "",
        overviewPoints: [],
        comments: makeComments(t, t("player.lessonEightTopic")),
        resources: [],
        assignments: [],
      },
    }),
  ];
}

export function getVideoPlayerCourse(
  courseId: number,
  t: TFunction
): VideoPlayerCourse {
  const lessons = getLessons(t);

  return {
    id: courseId,
    title: t("player.courseTitle"),
    breadcrumbLabel: t("player.breadcrumbLabel"),
    instructorName: t("player.instructorName"),
    instructorAvatar: profileAvatar,
    heroImage: "/prog.jpg",
    commentsPlaceholder: t("player.commentsPlaceholder"),
    tabs: [
      { id: "overview", label: t("player.tabs.overview") },
      { id: "resources", label: t("player.tabs.resources") },
      { id: "assignments", label: t("player.tabs.assignments") },
    ],
    lessons,
  };
}
