import {
  Users,
  Headphones,
  Clock,
  ShieldCheck,
  Zap,
  ThumbsUp,
  Video,
  BadgeCheck,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <Users />,
      title: "مجتمع تفاعلي",
      desc: "تواصل مع زملائك والمدربين واسفد من المناقشات والتجارب المشتركه",
    },
    {
      icon: <Headphones />,
      title: "دعم فني متميز",
      desc: "فريق دعم متخصص جاهز لمساعدتك على مدار الساعه",
    },
    {
      icon: <Clock />,
      title: "تعلم في أي وقت",
      desc: "منصتنا متاحة 24/7 تعلم وفقاً لجدولك الخاص بدون قيود",
    },
    {
      icon: <BadgeCheck />,
      title: "شهادات معتمدة",
      desc: "احصل على شهادات موثقة ومعتمدة يمكنك مشاركتها مع أصحاب العمل",
    },
    {
      icon: <Zap />,
      title: "تحديثات مستمرة",
      desc: "محتوى يُحدث باستمرار ليواكب أحدث التطورات في مجالك",
    },
    {
      icon: <ThumbsUp />,
      title: "محتوى علمي مميز",
      desc: "محتوي علمي مميز مع تطبق عملي ومنافسه جيده بين المتدربين.",
    },
    {
      icon: <Video />,
      title: "فيديوهات عالية الجودة",
      desc: "محتوى تعليمي مصور بأعلى جودة مع إمكانية التحميل والمشاهدة أوفلاين",
    },
    {
      icon: <ShieldCheck />,
      title: "ضمان استرجاع المال",
      desc: "نوفر ضمان استرجاع كامل للمبلغ خلال 30 يوم إذا لم تكن راضياً",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FFF8F0]">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <span className="bg-primary/10 text-primary px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
          لماذا تختار EGC
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-black mt-4 sm:mt-5">
          كل ما تحتاجه <span className="text-primary">لرحلة تعليمية ناجحة</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          نوفر لك تجربة متكاملة مع احدث التقنيات وافضل المدربين لضمان نجاحك
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-5 sm:p-6 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-gray-100 text-right flex flex-col items-start"
          >
            <div
              className={`bg-white text-primary w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-sm border border-gray-100`}
            >
              {f.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
