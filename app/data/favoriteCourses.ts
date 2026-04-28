import type { TFunction } from "i18next";

type FavoriteCourseRecord = {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
  rating: number;
  studentsCount: number;
  hoursCount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
};

export function localizeFavoriteCourse<T extends FavoriteCourseRecord>(
  course: T,
  t: TFunction
) {
  return {
    ...course,
    title: t(`favorites.courses.${course.id}.title`, { defaultValue: course.title }),
    instructor: t(`favorites.courses.${course.id}.instructor`, {
      defaultValue: course.instructor,
    }),
    category: t(`favorites.courses.${course.id}.category`, {
      defaultValue: course.category,
    }),
  };
}
