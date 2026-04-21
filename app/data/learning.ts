export type LearningTab = 'overview' | 'resources' | 'assignments';
export type LessonStatus = 'completed' | 'available' | 'locked';

export interface LearningLesson {
  id: number;
  title: string;
  shortTitle: string;
  durationMinutes: number;
  videoDuration: string;
  likes: number;
  commentsCount: number;
  status: LessonStatus;
  overviewDuration: string;
  overviewPoints: string[];
}

export interface LearningComment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
}

export interface LearningCourseDetails {
  id: number;
  courseTitle: string;
  instructorName: string;
  instructorAvatar: string;
  heroImage: string;
  breadcrumbLabel: string;
  tabs: { id: LearningTab; label: string }[];
  lessons: LearningLesson[];
  commentsPlaceholder: string;
  comments: LearningComment[];
}

const baseLessons: LearningLesson[] = [
  {
    id: 1,
    title: 'مقدمة الدورة',
    shortTitle: 'مقدمة الدورة',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'completed',
    overviewDuration: '15 دقيقة',
    overviewPoints: [
      'في هذا الدرس سنتعلم:',
      'ما هو تحليل البيانات ولماذا هو مهم؟',
      'كيفية استخدام python في تحليل البيانات؟',
      'نظرة عامة على أهم الأدوات الأساسية.',
      'نهاية هذا الدرس ستكون قادرًا على فهم الأساسيات والبدء في تطبيقها.',
    ],
  },
  {
    id: 2,
    title: 'الفصل 1: مقدمة في تحليل البيانات',
    shortTitle: 'الفصل 1: مقدمة في تحليل البيانات',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'available',
    overviewDuration: '15 دقيقة',
    overviewPoints: [
      'في هذا الفصل ستتعرف على المفاهيم الأولى المرتبطة بتحليل البيانات.',
      'سنراجع دورة حياة البيانات من الجمع وحتى استخراج النتائج.',
      'سترى أمثلة عملية على مشكلات يمكن حلها بالأدوات التحليلية.',
      'سنجهز بيئة العمل قبل الانتقال للفصول التالية.',
    ],
  },
  {
    id: 3,
    title: 'الفصل 2: أساسيات لغة Python',
    shortTitle: 'الفصل 2: أساسيات لغة Python',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'locked',
    overviewDuration: '18 دقيقة',
    overviewPoints: [
      'مقدمة في صياغة لغة Python واستخدامها في تحليل البيانات.',
      'التعامل مع المتغيرات والأنواع الأساسية.',
      'كتابة أمثلة صغيرة تساعدك على تثبيت المفاهيم.',
    ],
  },
  {
    id: 4,
    title: 'الفصل 3: المتغيرات وأنواع البيانات',
    shortTitle: 'الفصل 3: المتغيرات وأنواع البيانات',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'locked',
    overviewDuration: '20 دقيقة',
    overviewPoints: [
      'التفرقة بين النصوص والأرقام والقوائم والقواميس.',
      'اختيار نوع البيانات المناسب لكل استخدام.',
      'تمارين سريعة لفهم التحويل بين الأنواع المختلفة.',
    ],
  },
  {
    id: 5,
    title: 'الفصل 4: العمليات الحسابية والمنطقية',
    shortTitle: 'الفصل 4: العمليات الحسابية والمنطقية',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'locked',
    overviewDuration: '17 دقيقة',
    overviewPoints: [
      'تنفيذ العمليات الأساسية داخل Python.',
      'الربط بين الشروط والمقارنات والنتائج المنطقية.',
      'استخدام هذه العمليات في تجهيز البيانات الأولي.',
    ],
  },
  {
    id: 6,
    title: 'الفصل 5: الجمل الشرطية',
    shortTitle: 'الفصل 5: الجمل الشرطية',
    durationMinutes: 30,
    videoDuration: '15:00',
    likes: 199,
    commentsCount: 30,
    status: 'locked',
    overviewDuration: '19 دقيقة',
    overviewPoints: [
      'بناء القرارات داخل البرنامج باستخدام if و else.',
      'تنظيم تدفق التنفيذ حسب حالة البيانات.',
      'تطبيق عملي على سيناريوهات تحليلية بسيطة.',
    ],
  },
];

export const learningCourses: Record<number, LearningCourseDetails> = {
  1: {
    id: 1,
    courseTitle: 'دورة تحليل البيانات باستخدام python',
    instructorName: 'م. محمد محمود',
    instructorAvatar: '/profile.jpg',
    heroImage: '/prog.jpg',
    breadcrumbLabel: 'العودة لتفاصيل الدورة',
    tabs: [
      { id: 'overview', label: 'نظرة عامة' },
      { id: 'resources', label: 'المرفقات والملفات' },
      { id: 'assignments', label: 'المهام والتمارين' },
    ],
    lessons: baseLessons,
    commentsPlaceholder: 'اكتب تعليقك...',
    comments: [
      {
        id: 1,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: 'شرح ممتاز',
        timeAgo: 'منذ 3 دقائق',
      },
      {
        id: 2,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: 'شرح ممتاز',
        timeAgo: 'منذ 3 دقائق',
      },
      {
        id: 3,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: 'شرح ممتاز',
        timeAgo: 'منذ 3 دقائق',
      },
      {
        id: 4,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: 'شرح ممتاز',
        timeAgo: 'منذ 3 دقائق',
      },
      {
        id: 5,
        author: 'مصطفى عادل',
        avatar: '/profile.jpg',
        content: 'شرح ممتاز',
        timeAgo: 'منذ 3 دقائق',
      },
    ],
  },
};

export function getLearningCourse(courseId: number): LearningCourseDetails {
  return (
    learningCourses[courseId] ?? {
      ...learningCourses[1],
      id: courseId,
    }
  );
}
