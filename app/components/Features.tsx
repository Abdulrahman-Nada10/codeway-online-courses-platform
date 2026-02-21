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
  color: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <Users />,
      title: "مجتمع تفاعلي",
      desc: "تواصل مع زملائك والمدربين واسفد من المناقشات والتجارب المشتركه",
      color: "bg-purple-600",
    },
    {
      icon: <Headphones />,
      title: "دعم فني متميز",
      desc: "فريق دعم متخصص جاهز لمساعدتك على مدار الساعه",
      color: "bg-blue-600",
    },
    {
      icon: <Clock />,
      title: "تعلم في أي وقت",
      desc: "منصتنا متاحة 24/7 تعلم وفقاً لجدولك الخاص بدون قيود",
      color: "bg-green-600",
    },
    {
      icon: <BadgeCheck />,
      title: "شهادات معتمدة",
      desc: "احصل على شهادات موثقة ومعتمدة يمكنك مشاركتها مع أصحاب العمل",
      color: "bg-pink-600",
    },
    {
      icon: <Zap />,
      title: "تحديثات مستمرة",
      desc: "محتوى يُحدث باستمرار ليواكب أحدث التطورات في مجالك",
      color: "bg-cyan-500",
    },
    {
      icon: <ThumbsUp />,
      title: "محتوى علمي مميز",
      desc: "محتوي علمي مميز مع تطبق عملي ومنافسه جيده بين المتدربين.",
      color: "bg-orange-600",
    },
    {
      icon: <Video />,
      title: "فيديوهات عالية الجودة",
      desc: "محتوى تعليمي مصور بأعلى جودة مع إمكانية التحميل والمشاهدة أوفلاين",
      color: "bg-indigo-400",
    },
    {
      icon: <ShieldCheck />,
      title: "ضمان استرجاع المال",
      desc: "نوفر ضمان استرجاع كامل للمبلغ خلال 30 يوم إذا لم تكن راضياً",
      color: "bg-red-500",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-orange-100">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <span className="bg-orange-100 text-orange-600 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
          لماذا تختار EGC?
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 sm:mt-4">
          كل ما تحتاجه لرحلة تعليمية ناجحة
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4 sm:px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 sm:p-6 rounded-xl hover:shadow-md transition border border-gray-800 text-center"
          >
            <div
              className={`${f.color} text-white w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}
            >
              {f.icon}
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
