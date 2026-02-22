import { ICourseDetails } from "@/types";
import CourseHeader from "./components/CourseHeader";
import Navbar from "@/app/components/Navbar";
import { CheckCircle, Circle } from "lucide-react";
import CurriculumSection from "./components/CurriculumSection";
import InstructorCard from "./components/InstructorCard";
import { CourseHeaderSkeleton, CurriculumSkeleton, InstructorCardSkeleton, WhatYouWillLearnSkeleton } from "./components/CourseDetailsSkeleton";
import CourseErrorState from "./components/CourseErrorState";


interface IProps
{

}

const CourseDetailsPage = ({}:IProps) => {

    const courseDetails: ICourseDetails = {
  id: "course_py_001_ar",
  title: "تعلم البرمجة باستخدام بايثون من الصفر حتى الاحتراف",
  subtitle: "Python بالعربي – تطبيقات حقيقية + Django + pandas + مشاريع",
  description: `دورة شاملة باللغة العربية تغطي أساسيات بايثون حتى المستويات المتقدمة، مع التركيز على بناء تطبيقات ويب باستخدام Django، تحليل البيانات بـ pandas، ومشاريع عملية تساعدك تدخل سوق العمل بثقة.`,
  
  originalPrice: 1800,
  discountedPrice: 900,
  currency: "EGP",
  discountPercentage: 50,
  hasDiscount: true,

  instructor: {
    name: "أحمد محمد العلي",
    bio: "مهندس برمجيات بخبرة +10 سنوات في تطوير التطبيقات والذكاء الاصطناعي، شارك في تدريب أكثر من 4200 طالب عربي.",
    experienceYears: 10,
    studentsCount: 4200,
    ratingsCount: 1250,
    rating: 4.9,
    imageUrl: "https://example.com/instructors/ahmed-mohamed.jpg"
  },

  duration: {
    hours: 28,
    lessonsCount: 180
  },

  level: "beginner",
  language: "العربية",
  lastUpdated: "2025-01-01",
  
  rating: 4.9,
  ratingsCount: 1250,
  studentsEnrolled: 4200,

  whatYouWillLearn: [
    "فهم أساسيات البرمجة ومفاهيم بايثون بشكل كامل",
    "التعامل مع القوائم، القواميس، المجموعات والـ tuples",
    "كتابة دوال واستخدام الـ modules والـ packages",
    "التعامل مع الملفات وقواعد البيانات",
    "بناء تطبيقات ويب احترافية باستخدام Django",
    "تحليل البيانات وتصورها باستخدام pandas و matplotlib",
    "حل مشاكل برمجية حقيقية ومشاريع عملية"
  ],

  requirements: [
    "لا يتطلب خبرة سابقة في البرمجة",
    "جهاز كمبيوتر متصل بالإنترنت",
    "رغبة في التعلم والممارسة اليومية"
  ],

  curriculum: {
    sections: [
      {
        title: "مقدمة في البرمجة وبايثون",
        lecturesCount: 12,
        duration: "02:45:00",
        lessons: [
          { title: "ما هي البرمجة ولماذا بايثون؟", duration: "12:30", isFree:true },
          { title: "تثبيت بايثون وإعداد بيئة العمل", duration: "18:45", isFree:false },
          { title: "أول برنامج – Hello World", duration: "08:20", isFree:false }
        ]
      },
      {
        title: "المتغيرات والأنواع الأساسية + الشروط والحلقات",
        lecturesCount: 28,
        duration: "05:10:00",
        lessons: [
          { title: "المتغيرات وأنواع البيانات", duration: "14:55", isFree:true },
          { title: "جمل if / else / elif", duration: "23:40", isFree:false },
          { title: "حلقات while و for", duration: "19:15", isFree:false }
        ]
      },
      {
        title: "الدوال والوحدات (Functions & Modules)",
        lecturesCount: 22,
        duration: "04:20:00",
        lessons: [
          { title: "إنشاء واستخدام الدوال", duration: "21:30", isFree:true },
          { title: "الدوال المجهولة (Lambda)", duration: "12:10", isFree:false}
        ]
      },
      {
        title: "Django – بناء تطبيقات ويب احترافية",
        lecturesCount: 45,
        duration: "09:30:00",
        lessons: [
          { title: "إعداد مشروع Django أول مرة", duration: "28:50", isFree:true },
          { title: "Models – قواعد البيانات", duration: "35:20", isFree:false}
        ]
      }
    ]
  },

  includesCertificate: true,
  hasLifetimeAccess: true,
  hasMoneyBackGuarantee: true,
  guaranteeDays: 15,

  thumbnailUrl: "https://example.com/courses/python-ar-thumbnail.jpg",
  promoVideoUrl: "https://example.com/videos/python-promo-ar.mp4",

  tags: ["python", "django", "pandas", "برمجة", "تطوير ويب", "تحليل بيانات", "تعلم بالعربي"],
  category: "البرمجة وتطوير التطبيقات",

  createdAt: "2024-11-15",
  updatedAt: "2025-01-01"
};

const half = Math.ceil(courseDetails.whatYouWillLearn.length / 2);
  const col1 = courseDetails.whatYouWillLearn.slice(0, half);
  const col2 = courseDetails.whatYouWillLearn.slice(half);


const isLoading=false
const isError = false
if(isError)
  {
    return <CourseErrorState/>
  }    
  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden  mt-26">
      <Navbar />
      {isLoading ? <CourseHeaderSkeleton /> : <CourseHeader course={courseDetails} />}
   

        <section className=" pr-7 sm:pr-10 md:pr-15 lg:pr-25 pl-10 py-20 flex flex-col space-y-15">
          
          {isLoading ? (
  <WhatYouWillLearnSkeleton />
):(
              <div className="bg-[#FFFFFF] w-full max-w-5xl rounded-3xl p-5 text-[#113555]">
      <h2 className="text-2xl font-bold text-right mb-5 ">
        ماذا ستتعلم في هذه الدورة؟
      </h2>

      <div className="grid md:grid-cols-2 gap-2">
        {[col1, col2].map((col, i) => (
          <ul key={i} className="space-y-2">
            {col.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-right">
                <CheckCircle
                  className="text-green-500 shrink-0 mt-1"
                  size={20}
                />
                <span className="text-[14px]">{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>

)
}




              {isLoading ? (
  <WhatYouWillLearnSkeleton />
):(
             
    <div className="bg-[#FFFFFF] w-full max-w-5xl rounded-3xl p-5 text-[#113555]">
      <h2 className="text-2xl font-bold text-right mb-5 ">
        المتطلبات
      </h2>

      <div className="grid  gap-2">
        {courseDetails.requirements.map((item, index) => (
          <ul key={index} className="space-y-4">
              <li key={index} className="flex items-start gap-3 text-right">
                <Circle
                  className="text-green-500 shrink-0 mt-1"
                  size={10}
                />
                <span className="text-[14px]">{item}</span>
              </li>
           
          </ul>
        ))}
      </div>
    </div>


)
}

    <div>
      {isLoading ? <CurriculumSkeleton /> : <CurriculumSection sections={courseDetails.curriculum.sections} />}
    
    </div>
    <div>
      {isLoading ? <InstructorCardSkeleton /> : <InstructorCard instructor={courseDetails.instructor} />}
      
    </div>
        </section>

    </div>
  )
}

export default CourseDetailsPage