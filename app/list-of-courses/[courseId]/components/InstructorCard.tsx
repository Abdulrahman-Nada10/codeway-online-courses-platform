"use client";

import Image from "next/image";
import { Star, Users, Award } from "lucide-react";
import Button from "@/app/components/ui/Button";

type Props = {
  instructor: {
    name: string;
    bio?: string;
    experienceYears?: number;
    studentsCount?: number;
    ratingsCount?: number;
    rating: number;
    imageUrl?: string;
  };
};

export default function InstructorCard({ instructor }: Props) {
  return (
    <section className="w-full max-w-5xl bg-white rounded-3xl p-5 flex flex-col gap-3 ">
       <h2 className="text-xl font-bold text-[#113555] mb-2">عن المدرس</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">


      <div className="shrink-0">
        <Image
          src={"/instructor.jpg"}
          alt={instructor.name}
          width={90}
          height={90}
          className="rounded-2xl w-30 h-30 object-cover"
        />
      </div>


      <div className="flex-1 text-right text-[#113555] space-y-2">
        <h3 className="font-bold  ">
          {instructor.name}
        </h3>

        <div className="flex flex-wrap gap-5 text-sm text-[#78808A] ">
            <div className="flex items-center gap-3">
              <Star size={16} className="text-[#F5A00F] fill-[#F5A00F]" />
              <span>{instructor.rating}</span>
            <span>({instructor.ratingsCount} تقييم)</span>
            
            
          </div>
          

          <div className="flex items-center gap-1">
            <Users size={16} />
            {instructor.studentsCount ? instructor.studentsCount.toLocaleString() : '0'}
          </div>
          <div className="flex items-center gap-1">
            <Award size={16} className="text-[#F5A00F]" />
            {instructor.experienceYears} سنوات خبرة
          </div>

        
        </div>

        <p className="text-sm  leading-relaxed">
          {instructor.bio}
        </p>

        <Button 
        variant="info"
        size="lg" className=" mt-2 bg-[#F3EAE2] text-[#113555] px-4 py-2 rounded-full text-sm hover:opacity-90 transition">
          عرض الملف الشخصي
        </Button>
      </div>
        </div>
    </section>
  );
}