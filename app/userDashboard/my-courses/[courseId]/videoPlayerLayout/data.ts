import { VideoPlayerCourse, VideoPlayerLesson } from './types';

const profileAvatar = '/profile.jpg';
const lessonThumb = '/prog.jpg';

function makeComments(topic: string, count = 4) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    author: 'مصطفى عادل',
    avatar: profileAvatar,
    content: `شرح ممتاز في ${topic}`,
    timeAgo: 'منذ 3 دقائق',
  }));
}

function makeResources(topic: string) {
  return [
    { id: 1, title: `ملخص ${topic} (PDF)`, kind: 'pdf' as const },
    { id: 2, title: `ملفات ${topic} (ZIP)`, kind: 'zip' as const },
    { id: 3, title: `عرض تقديمي ${topic} (PPT)`, kind: 'ppt' as const },
  ];
}

function makeAssignments(topic: string) {
  return [
    {
      id: 1,
      title: `تمرين 1: تطبيق ${topic}`,
      description: `اكتب برنامجًا بسيطًا يوضح كيفية استخدام ${topic} في مثال عملي.`,
      icon: 'check' as const,
    },
    {
      id: 2,
      title: `تمرين 2: معالجة ${topic}`,
      description: `قم بإنشاء مثال قصير يوضح تنفيذ ${topic} مع عرض النتيجة.`,
      icon: 'file' as const,
    },
  ];
}

function createLesson(lesson: Partial<VideoPlayerLesson> & Pick<VideoPlayerLesson, 'id' | 'title' | 'shortTitle' | 'status'>): VideoPlayerLesson {
  const topic = lesson.shortTitle;

  return {
    thumbnail: lessonThumb,
    videoDuration: '15:00',
    durationMinutes: 30,
    likes: 199,
    commentsCount: 30,
    content: {
      overviewDuration: '15 دقيقة',
      overviewPoints: [
        'في هذا الدرس سنتعلم:',
        `ما المفهوم الأساسي في ${topic}؟`,
        `كيف نستخدم ${topic} داخل مسار تحليل البيانات؟`,
        `أهم النقاط العملية التي تساعدك على التطبيق.`,
        'في نهاية الدرس ستكون قادرًا على فهم الفكرة والبدء في تجربتها بنفسك.',
      ],
      comments: makeComments(topic),
      resources: makeResources(topic),
      assignments: makeAssignments(topic),
    },
    ...lesson,
  };
}

const lessons: VideoPlayerLesson[] = [
  createLesson({
    id: 1,
    title: 'مقدمة الدورة',
    shortTitle: 'مقدمة الدورة',
    status: 'completed',
    content: {
      overviewDuration: '15 دقيقة',
      overviewPoints: [
        'في هذا الدرس سنتعلم:',
        'ما هو تحليل البيانات ولماذا هو مهم؟',
        'كيفية استخدام Python في تحليل البيانات؟',
        'نظرة عامة على أهم الأدوات الأساسية.',
        'نهاية هذا الدرس ستكون قادرًا على فهم الأساسيات والبدء في تطبيقها.',
      ],
      comments: makeComments('مقدمة الدورة', 5),
      resources: makeResources('الدرس'),
      assignments: makeAssignments('المعلومات'),
    },
  }),
  createLesson({
    id: 2,
    title: 'الفصل 1: مقدمة في تحليل البيانات',
    shortTitle: 'الفصل 1: مقدمة في تحليل البيانات',
    status: 'available',
    content: {
      overviewDuration: '',
      overviewPoints: [],
      comments: makeComments('تحليل البيانات'),
      resources: makeResources('البيانات'),
      assignments: makeAssignments('البيانات'),
    },
  }),
  createLesson({
    id: 3,
    title: 'الفصل 2: أساسيات لغة Python',
    shortTitle: 'الفصل 2: أساسيات Python',
    status: 'available',
    content: {
      overviewDuration: '20 دقيقة',
      overviewPoints: [
        'في هذا الدرس سنتعلم أساسيات Python',
        'المتغيرات والدوال',
        'الهياكل التحكمية',
      ],
      comments: makeComments('Python'),
      resources: [],
      assignments: makeAssignments('Python'),
    },
  }),
  createLesson({
    id: 4,
    title: 'الفصل 3: المتغيرات وأنواع البيانات',
    shortTitle: 'الفصل 3: المتغيرات',
    status: 'locked',
    content: {
      overviewDuration: '25 دقيقة',
      overviewPoints: [
        'أنواع البيانات في Python',
        'المتغيرات والتحويلات',
        'العمليات الأساسية',
      ],
      comments: makeComments('المتغيرات'),
      resources: makeResources('المتغيرات'),
      assignments: [],
    },
  }),
  createLesson({
    id: 5,
    title: 'الفصل 4: العمليات الحسابية والمنطقية',
    shortTitle: 'الفصل 4: العمليات',
    status: 'locked',
  }),
  createLesson({
    id: 6,
    title: 'الفصل 5: الجمل الشرطية',
    shortTitle: 'الفصل 5: الجمل الشرطية',
    status: 'locked',
    content: {
      overviewDuration: '18 دقيقة',
      overviewPoints: ['الجمل الشرطية if/else', 'elif و nested conditions'],
      comments: makeComments('الجمل الشرطية'),
      resources: [],
      assignments: makeAssignments('الجمل الشرطية'),
    },
  }),
  createLesson({
    id: 7,
    title: 'الفصل 6: الحلقات التكرارية',
    shortTitle: 'الفصل 6: الحلقات',
    status: 'locked',
    content: {
      overviewDuration: '22 دقيقة',
      overviewPoints: ['for و while loops', 'break/continue/pass'],
      comments: makeComments('الحلقات'),
      resources: makeResources('الحلقات'),
      assignments: [],
    },
  }),
  createLesson({
    id: 8,
    title: 'الفصل 7: القوائم والقواميس',
    shortTitle: 'الفصل 7: القوائم',
    status: 'locked',
    content: {
      overviewDuration: '',
      overviewPoints: [],
      comments: makeComments('القوائم'),
      resources: [],
      assignments: [],
    },
  }),
];

export const videoPlayerCourses: Record<number, VideoPlayerCourse> = {
  1: {
    id: 1,
    title: 'دورة تحليل البيانات باستخدام python',
    breadcrumbLabel: 'العودة لتفاصيل الدورة',
    instructorName: 'م. محمد محمود',
    instructorAvatar: profileAvatar,
    heroImage: '/prog.jpg',
    commentsPlaceholder: 'اكتب تعليقك...',
    tabs: [
      { id: 'overview', label: 'نظرة عامة' },
      { id: 'resources', label: 'المرفقات والملفات' },
      { id: 'assignments', label: 'المهام والتمارين' },
    ],
    lessons,
  },
};

export function getVideoPlayerCourse(courseId: number): VideoPlayerCourse {
  return (
    videoPlayerCourses[courseId] ?? {
      ...videoPlayerCourses[1],
      id: courseId,
    }
  );
}
