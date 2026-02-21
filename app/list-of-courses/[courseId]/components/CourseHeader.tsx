"use client"

import { ICourseDetails } from "@/types";
import StarRating from "@/app/components/ui/StarRating";
import Button from "@/app/components/ui/Button";
import { Award, BookOpen, CalendarDays, Clock5, Globe, Star, UsersRound } from "lucide-react";
import Image from "next/image";

interface CourseHeaderProps {
  course: ICourseDetails;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <section
      dir="rtl"
      className="w-full bg-[#113555] text-[#FFFFFF] pt-20 pb-15 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-start gap-10">

         <div className="w-full md:w-[320px] shrink-0">
  
          <div className="relative rounded-t-xl overflow-hidden mb-0">
            <img
              src="/prog.jpg"
              alt={course.title}
              className="w-full h-44 object-cover"
              
            />
          </div>

          <div className="bg-white text-gray-900 rounded-b-xl p-5 shadow-2xl -mt-1 flex flex-col gap-3">

            <div className="flex items-center gap-3">
              <span className="text-2xl font-medium text-[#FF6400]">
                 {course.discountedPrice} {course.currency}
            
              </span>
              {course.hasDiscount && (
                <span className="text-lg line-through text-[#D9D9D9] font-medium">
                  {course.originalPrice} {course.currency}
                </span>
              )}
              {course.hasDiscount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  خصم {course.discountPercentage}%
                </span>
              )}
            </div>

 
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-xl transition-colors"
            >
              اشترك الآن
            </Button>

            <Button variant="outline" className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold text-base py-3 rounded-xl transition-colors">
              إضافة إلى السلة
            </Button>

            {course.hasMoneyBackGuarantee && (
              <p className="text-center text-sm text-green-600 font-medium">
                ضمان استرداد خلال {course.guaranteeDays} يوم
              </p>
            )}
          </div>
        </div>


        <div className="flex-1 flex flex-col space-y-7">

          <span className="self-start bg-[#FF6400]  font-semibold px-4 py-1 rounded-full">
            {course.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug ">
            {course.title}
          </h1>

   
          <p className=" text-sm">{course.subtitle}</p>


          <div className="flex flex-wrap items-center gap-7 text-sm font-medium">

            <div className="flex items-center gap-2">
              <Star fill="#F5A00F" stroke="none" className="w-5 h-5"/>

              <span >{course.rating}</span>
              <span>
                ({course.ratingsCount.toLocaleString("ar-EG")}تقييم)
              </span>
            </div>

    
            <div className="flex items-center gap-2">
              <UsersRound  className="w-5 h-5" />
              <span>{course.studentsEnrolled.toLocaleString("ar-EG")}</span>
            </div>


            <div className="flex items-center gap-2">
              <Clock5 className="w-5 h-5" />
              <span>{course.duration.lessonsCount} درس</span>
            </div>


            <div className="flex items-center gap-2">
             <BookOpen  className="w-5 h-5"/>
              <span>{course.duration.hours} ساعة</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <Image
              src="/instructor.jpg"
              width={5}
              height={5}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-lg object-center  "
             
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-medium text-[#78808A]">المدرب</span>
              <span className=" font-bold text-lg">
                {course.instructor.name.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm mt-1">
            <div className="flex items-center gap-2">
             <Globe className="w-5 h-5"/>
              <span className="text-lg">{course.language}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5"/>
              <span>آخر تحديث: {course.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
           
             <Award className="w-5 h-5"/>
              <span className="text-lg">
                {course.level === "beginner"
                  ? "مبتدئ"
                  : course.level === "intermediate"
                  ? "متوسط"
                  : "متقدم"}
              </span>
            </div>
           
          </div>
        </div>

      </div>
    </section>
  );
}