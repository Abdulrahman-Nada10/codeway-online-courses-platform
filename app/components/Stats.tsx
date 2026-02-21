import { Clock, Award, Users, BookOpen } from "lucide-react";
import type { ReactElement } from "react";

type StatItem = {
  icon: ReactElement;
  num: string;
  label: string;
  color: string;
};

export default function Stats() {
  const stats: StatItem[] = [
    {
      icon: <Clock />,
      num: "+5.0K",
      label: "ساعة تعليمية",
      color: "text-green-500",
    },
    {
      icon: <Award />,
      num: "+10K",
      label: "شهادة معتمدة",
      color: "text-pink-500",
    },
    {
      icon: <Users />,
      num: "+50K",
      label: "طالب مسجل",
      color: "text-purple-500",
    },
    {
      icon: <BookOpen />,
      num: "+500K",
      label: "دورة تعليمية",
      color: "text-orange-500",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FFF8F0]">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#ff6908]">
          أرقام تتحدث عن نفسها
        </h2>
        <p className="text-[#ff6908] mt-2 text-sm sm:text-base">
          نفتخر بثقة آلاف المتعلمين في منصتنا ونسعى دائما للافضلل
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4 sm:px-6">
        {stats.map((item: StatItem, idx: number) => (
          <div
            key={idx}
            className="bg-[#0F172A] p-6 sm:p-8 rounded-2xl text-center text-white shadow-lg hover:-translate-y-2 transition duration-300"
          >
            <div
              className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 ${item.color} bg-white/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
            >
              {item.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#ff6908] mb-2">
              {item.num}
            </h3>
            <p className="text-[#ff6908] text-sm sm:text-base">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
