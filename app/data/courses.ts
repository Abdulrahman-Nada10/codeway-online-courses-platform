import type { TFunction } from "i18next";

export interface Course {
  id: number;
  title: string;
  instructor: string;
  completedLessons: number;
  totalLessons: number;
  totalHours: number;
  completedHours: number;
  progress: number;
  isCompleted: boolean;
  image: string;
  category: "all" | "in_progress" | "completed";
  lastWatched?: string;
}

export type FilterType = "all" | "in_progress" | "completed";

export function getAllCourses(t: TFunction): Course[] {
  return [
    {
      id: 1,
      title: t("dashboard.coursesData.1.title"),
      instructor: t("dashboard.coursesData.1.instructor"),
      completedLessons: 18,
      totalLessons: 25,
      totalHours: 20,
      completedHours: 12,
      progress: 65,
      isCompleted: false,
      image: "/card.jpg",
      category: "in_progress",
      lastWatched: t("dashboard.lastWatchedToday"),
    },
    {
      id: 2,
      title: t("dashboard.coursesData.2.title"),
      instructor: t("dashboard.coursesData.2.instructor"),
      completedLessons: 15,
      totalLessons: 30,
      totalHours: 15,
      completedHours: 7,
      progress: 50,
      isCompleted: false,
      image: "/card.jpg",
      category: "in_progress",
      lastWatched: t("dashboard.lastWatchedToday"),
    },
    {
      id: 3,
      title: t("dashboard.coursesData.3.title"),
      instructor: t("dashboard.coursesData.3.instructor"),
      completedLessons: 50,
      totalLessons: 50,
      totalHours: 25,
      completedHours: 25,
      progress: 100,
      isCompleted: true,
      image: "/card.jpg",
      category: "completed",
      lastWatched: t("dashboard.lastWatchedYesterday"),
    },
    {
      id: 4,
      title: t("dashboard.coursesData.4.title"),
      instructor: t("dashboard.coursesData.4.instructor"),
      completedLessons: 10,
      totalLessons: 25,
      totalHours: 10,
      completedHours: 4,
      progress: 40,
      isCompleted: false,
      image: "/card.jpg",
      category: "in_progress",
      lastWatched: t("dashboard.lastWatchedToday"),
    },
    {
      id: 5,
      title: t("dashboard.coursesData.5.title"),
      instructor: t("dashboard.coursesData.5.instructor"),
      completedLessons: 35,
      totalLessons: 35,
      totalHours: 18,
      completedHours: 18,
      progress: 100,
      isCompleted: true,
      image: "/card.jpg",
      category: "completed",
      lastWatched: t("dashboard.lastWatchedYesterday"),
    },
    {
      id: 6,
      title: t("dashboard.coursesData.6.title"),
      instructor: t("dashboard.coursesData.6.instructor"),
      completedLessons: 20,
      totalLessons: 45,
      totalHours: 22,
      completedHours: 10,
      progress: 45,
      isCompleted: false,
      image: "/card.jpg",
      category: "in_progress",
      lastWatched: t("dashboard.lastWatchedToday"),
    },
  ];
}

export function getCourseFilters(t: TFunction) {
  return [
    { id: "all" as FilterType, label: t("dashboard.filterAllCourses") },
    {
      id: "in_progress" as FilterType,
      label: t("dashboard.filterInProgressCourses"),
    },
    {
      id: "completed" as FilterType,
      label: t("dashboard.filterCompletedCourses"),
    },
  ];
}
