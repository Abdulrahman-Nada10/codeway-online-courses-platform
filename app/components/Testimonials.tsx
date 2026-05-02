type TestimonialItem = {
  name: string;
  job: string;
  letter: string;
  text: string;
  color: string;
};

export default function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      name: "نورة القحطاني",
      job: "محللة بيانات",
      letter: "N",
      text: "دورة تحليل البيانات كانت نقطة تحول في مسيرتي. المشاريع العملية ساعدتني على تطبيق ماتعلمته فوراً",
      color: "#F97316",
    },
    {
      name: "نورة القحطاني",
      job: "محللة بيانات",
      letter: "N",
      text: "دورة تحليل البيانات كانت نقطة تحول في مسيرتي. المشاريع العملية ساعدتني على تطبيق ماتعلمته فوراً",
      color: "#A855F7",
    },
    {
      name: "نورة القحطاني",
      job: "نورة بيانات",
      letter: "N",
      text: "دورة تحليل البيانات كانت نقطة تحول في مسيرتي. المشاريع العملية ساعدتني على تطبيق ماتعلمته فوراً",
      color: "#22C55E",
    },
    {
      name: "نورة القحطاني",
      job: "محللة بيانات",
      letter: "N",
      text: "دورة تحليل البيانات كانت نقطة تحول في مسيرتي. المشاريع العملية ساعدتني على تطبيق ماتعلمته فوراً",
      color: "#F97316",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FFF8F0]" dir="rtl">
      {/* Title */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <span className="inline-block text-xs sm:text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-3">
          آراء المتدربين
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          ماذا يقول <span className="text-primary">طلابنا</span> عنا
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-4 sm:px-6">
        {testimonials.map((item: TestimonialItem, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 text-right flex flex-col justify-between"
          >
            {/* Stars */}
            <div>
              <div className="flex gap-0.5 justify-end text-yellow-400 mb-4 text-sm sm:text-base">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <h4 className="font-bold text-sm text-gray-900">
                  {item.name}
                </h4>
                <span className="text-[11px] text-gray-400 font-medium">
                  {item.job}
                </span>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                style={{ backgroundColor: item.color }}
              >
                {item.letter}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
