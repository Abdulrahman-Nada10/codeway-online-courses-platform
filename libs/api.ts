import { Course } from "@/types";


const mockCourse: Course = {
  id: "python-zero-to-hero",
  title: "تعلم البرمجة بلغة بايثون من الصفر حتى الاحتراف",
  description:
    "دورة شاملة لتعلم أساسيات البرمجة وتطوير التطبيقات باستخدام Python. ستتعلم في هذه الدورة كل ما تحتاجه لتصبح مبرمجًا محترفًا في لغة بايثون، بدءًا من المفاهيم الأساسية وصولًا إلى بناء تطبيقات حقيقية.",
  thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  category: "البرمجة والتطوير",
  language: "العربية",
  level: "مبتدئ",
  rating: 4.9,
  reviewsCount: 1250,
  studentsCount: 4200,
  duration: "28 ساعة",
  lessonsCount: 180,
  price: 900,
  originalPrice: 1800,
  lastUpdated: "2025-01-01",
  instructor: {
    id: "ahmed-mohamed",
    name: "أحمد محمد العلي",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bio: "مهندس برمجيات بخبرة أكثر من 10 سنوات في مجال تطوير البرمجيات بدرجة كبرى وأب واحد، مشاركة دبرن مع الطلاب",
    rating: 4.9,
    reviewsCount: 1250,
    studentsCount: 4200,
    yearsExperience: 10,
  },
  whatYouLearn: [
    "فهم أساسيات البرمجة ومفاهيمها الأساسية",
    "التعامل مع قواعد البيانات",
    "كتابة برامج بايثون من الصفر",
    "أتمتة المهام المتكررة",
    "تحليل البيانات باستخدام pandas",
    "بناء تطبيقات ويب باستخدام Django",
  ],
  requirements: [
    "لا يتطلب أي خبرة برمجية سابقة",
    "جهاز كمبيوتر مع اتصال بالانترنت",
    "الرغبة في التعلم والممارسة",
  ],
  curriculum: [
    {
      id: "sec-1",
      title: "مقدمة في البرمجة وبايثون",
      lessonsCount: 5,
      badge: "دروس",
      lessons: [
        { id: "l1", title: "ما هي البرمجة ولماذا بايثون؟", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l2", title: "تثبيت بايثون وإعداد بيئة العمل", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l3", title: "المتغيرات وأنواع البيانات", duration: "12:30", isPreview: false, isFree: false, type: "video" },
        { id: "l4", title: "كتابة أول برنامج لك", duration: "12:30", isPreview: false, isFree: false, type: "video" },
      ],
    },
    {
      id: "sec-2",
      title: "الهياكل الشرطية والتكرارية",
      lessonsCount: 4,
      badge: "دروس",
      lessons: [
        { id: "l5", title: "جمل الشرط if/else", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l6", title: "حلقات التكرار for و while", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l7", title: "التمارين التطبيقية", duration: "12:30", isPreview: false, isFree: false, type: "video" },
      ],
    },
    {
      id: "sec-3",
      title: "الدوال والوحدات",
      lessonsCount: 4,
      badge: "دروس",
      lessons: [
        { id: "l8", title: "إنشاء واستخدام الدوال", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l9", title: "الوحدات والمكتبات", duration: "12:30", isPreview: true, isFree: true, type: "video" },
        { id: "l10", title: "مشروع تطبيقي", duration: "12:30", isPreview: false, isFree: false, type: "video" },
      ],
    },
  ],
  ratingBreakdown: [
    { stars: 5, percentage: 78, count: 975 },
    { stars: 4, percentage: 15, count: 188 },
    { stars: 3, percentage: 5, count: 63 },
    { stars: 2, percentage: 1, count: 13 },
    { stars: 1, percentage: 1, count: 11 },
  ],
  reviews: [
    {
      id: "r1",
      user: "محمد السيد",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
      rating: 5,
      date: "2025-01-10",
      comment: "دورة رائعة جداً، الشرح واضح ومبسط. استفدت كثيراً من هذه الدورة وأنصح بها بشدة لكل من يريد تعلم بايثون.",
    },
    {
      id: "r2",
      user: "فاطمة العمري",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
      rating: 5,
      date: "2025-01-05",
      comment: "أفضل دورة تعليمية تعلمتها. المدرب محترف جداً ويشرح بأسلوب سهل ومفهوم. شكراً جزيلاً.",
    },
    {
      id: "r3",
      user: "خالد المنصور",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
      rating: 4,
      date: "2024-12-28",
      comment: "دورة ممتازة ومنظمة جيداً. كنت أتمنى المزيد من التمارين العملية لكن بشكل عام هي دورة قيمة.",
    },
  ],
};

export async function getCourseById(courseId: string): Promise<Course | null> {
  if (courseId === mockCourse.id || courseId) {
    return mockCourse;
  }
  return null;
}
