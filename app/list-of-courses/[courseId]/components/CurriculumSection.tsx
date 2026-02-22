"use client";
import { useState } from "react";
import { ChevronDown, Lock, PlayCircle } from "lucide-react";
import Button from "@/app/components/ui/Button";

type Lesson = {
  title: string;
  duration: string;
  type?: "video" | "article" | "quiz"|string;
  isFree?: boolean;
};

type Section = {
  title: string;
  lecturesCount?: number; 
  duration?: string;    
  lessons: Lesson[];
};

export default function CurriculumSection({ sections }: { sections: Section[] }) {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [isAllOpen, setIsAllOpen] = useState(false);

  const visibleSections = isAllOpen ? sections : sections.slice(0, 3);

  const toggle = (i: number) => {
    setOpenSections((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };



  return (
    <section className="w-full max-w-5xl bg-white text-[#113555] p-5 rounded-3xl">
      <h2 className="text-2xl font-bold text-right mb-6">محتوى الدورة</h2>
      <div className="space-y-4">
        {visibleSections.map((sec, i) => {
          const isOpen = openSections.includes(i);
          return (
            <div key={i} className={`rounded-xl overflow-hidden bg-[#FFFFFF] ${isOpen ? "border border-[#78808A]" : ""}`} >
 
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-4"
              >
                 <div className="text-right">
                  <div className="font-semibold flex items-center gap-3">
                    {sec.title}

                    <span className="bg-[#113555] text-[#FFFFFF] text-[10px] px-2.5 py-0.5 rounded-full">
                      {sec.lecturesCount ?? 0} درس

                    </span>
                  </div>
               
                </div>
                <ChevronDown
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
               
              </button>

              {isOpen && (
                <div >
                  {sec.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-3 border-b last:border-0"
                    >
                      
                      <div className="flex items-center gap-3">
                        {lesson.isFree ? (
                          <>
                          <PlayCircle size={18} className="text-orange-500" />
                          <span className="text-right">{lesson.title}</span>
                          <span className="text-xs border border-orange-400 text-orange-500 px-2 py-0.5 rounded-full">
                            درس مجاني
                          </span>
                        

                          </>
                          
                        ) : (
                          <>
                            <Lock size={16} />
                              <span className="text-right">{lesson.title}</span>

                          </>
                        
                        )}
                       
                      </div>
                      <span className="text-sm ">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>


      <Button
  onClick={() => setIsAllOpen((prev) => !prev)}
  variant="outline"
  className="w-full mt-6"
>
  <ChevronDown
    size={16}
    className={`transition ${isAllOpen ? "rotate-180" : ""}`}
  />
  {isAllOpen ? "غلق الدروس" : "فتح الدروس كاملة"}
</Button>
    </section>
  );
}