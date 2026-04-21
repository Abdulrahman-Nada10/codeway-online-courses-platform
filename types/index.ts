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

export interface ICourseDetails {

  id: string | number;                   
  title: string;                          
  subtitle?: string;                     
  description: string;                   
  slug?: string;                         

  
  originalPrice: number;                  
  discountedPrice: number;               
  currency: string;                      
  discountPercentage?: number;            
  hasDiscount: boolean;

  instructor: {
    name: string;
    bio?: string;
    experienceYears?: number;
    studentsCount?: number;
    ratingsCount?: number;
    rating: number;                        
    imageUrl?: string;
  };

  duration: {
    hours: number;                        
    lessonsCount: number;                
  };

  level: 'مبتديء' | 'متوسط' | 'متقدم' | string;
  language: string;                     
  lastUpdated: string;                    
  publishedAt?: string;

  rating: number;                        
  ratingsCount: number;                   
  studentsEnrolled: number;               

  
  whatYouWillLearn: string[];           
  requirements: string[];                
  targetAudience?: string[];              

  curriculum: {
    sections: {
      title: string;
      lecturesCount?: number;
      duration?: string;                   
      isExpanded?: boolean;                
      lessons: {
        title: string;
        duration: string;                
        isFree?: boolean;
        previewAvailable?: boolean;
        type?: 'video' | 'article' | 'quiz' | 'coding-exercise' | string;
      }[];
    }[];
  };

  includesCertificate?: boolean;
  hasLifetimeAccess?: boolean;
  hasMoneyBackGuarantee?: boolean;
  guaranteeDays?: number;                 
  isOnSale?: boolean;
  saleEndDate?: string | null;

  thumbnailUrl?: string;                  
  promoVideoUrl?: string;               
  tags?: string[];                      
  category?: string;                   
  createdAt?: string;
  updatedAt?: string;
}

export type PaymentMethod = 'card' | 'fawry' | 'paypal' | 'vodafone';

export interface ITicketSummary {
  title: string;
  instructor: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
}

export interface IPaymentTabs {
  label: string;
  src: string;
  method: PaymentMethod;
}

export interface IModalContent {
  icon?: React.ReactNode;
  paymentTypeSrc?: string;
  title?: string;
  desc: string;
  primaryBtn?: string;
  secondaryBtn?: string;
}