export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: number;
  yearsExperience: number;
  reviewsCount: number;
  profileUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
  isFree: boolean;
  type: "video" | "article" | "quiz";
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessonsCount: number;
  lessons: Lesson[];
  badge?: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface RatingBreakdown {
  stars: number;
  percentage: number;
  count: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  language: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  price: number;
  originalPrice: number;
  lastUpdated: string;
  instructor: Instructor;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  reviews: Review[];
  ratingBreakdown: RatingBreakdown[];
}

// ICourseDetails.ts

export interface ICourseDetails {
  // معلومات أساسية عن الكورس
  id: string | number;                    // معرف الكورس (ممكن يكون رقم أو uuid)
  title: string;                          // العنوان الرئيسي
  subtitle?: string;                      // وصف فرعي أو slogan
  description: string;                    // وصف الكورس التفصيلي (عادةً فقرة أو أكثر)
  slug?: string;                          // للـ URL (مثل: python-from-zero-to-pro)

  // السعر والعروض
  originalPrice: number;                  // السعر الأصلي (مثلاً 1800)
  discountedPrice: number;                // السعر بعد الخصم (مثلاً 900)
  currency: string;                       // EGP, USD, ...
  discountPercentage?: number;            // النسبة المئوية للخصم (اختياري)
  hasDiscount: boolean;

  // تفاصيل الدورة
  instructor: {
    name: string;
    bio?: string;
    experienceYears?: number;
    studentsCount?: number;
    ratingsCount?: number;
    rating: number;                       // 4.9 مثلاً
    imageUrl?: string;
  };

  duration: {
    hours: number;                        // 28 ساعة
    lessonsCount: number;                 // 180 درس
  };

  level: 'مبتديء' | 'متوسط' | 'متقدم' | string;  // مستوى الدورة
  language: string;                       // العربية
  lastUpdated: string;                    // تاريخ آخر تحديث "2025-01-01"
  publishedAt?: string;

  // التقييمات والإحصائيات
  rating: number;                         // 4.9
  ratingsCount: number;                   // 1250 تقييم
  studentsEnrolled: number;               // 4200 طالب

  // المحتوى
  whatYouWillLearn: string[];             // قائمة "ماذا ستتعلم" (bullet points)
  requirements: string[];                 // المتطلبات / الشروط المسبقة
  targetAudience?: string[];              // لمن هذه الدورة؟

  // هيكل الدورة (المنهج)
  curriculum: {
    sections: {
      title: string;
      lecturesCount?: number;
      duration?: string;                    // "02:30:00" أو "3 ساعات"
      isExpanded?: boolean;                 // هل القسم مفتوح في الواجهة؟
      lessons: {
        title: string;
        duration: string;                   // "12:30"
        isFree?: boolean;
        previewAvailable?: boolean;
        type?: 'video' | 'article' | 'quiz' | 'coding-exercise' | string;
      }[];
    }[];
  };

  // ميزات إضافية
  includesCertificate?: boolean;
  hasLifetimeAccess?: boolean;
  hasMoneyBackGuarantee?: boolean;
  guaranteeDays?: number;                 // 15 يوم ضمان استرداد
  isOnSale?: boolean;
  saleEndDate?: string | null;

  // بيانات إدارية / عرضية
  thumbnailUrl?: string;                  // صورة الغلاف الكبيرة
  promoVideoUrl?: string;                 // رابط فيديو ترويجي
  tags?: string[];                        // python, django, pandas, web-development, ...
  category?: string;                      // برمجة وتطوير
  createdAt?: string;
  updatedAt?: string;
}