type TestimonialItem = {
  name: string;
  job: string;
  letter: string;
  color: string;
};

export default function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      name: "نورة القحطاني",
      job: "محللة بيانات",
      letter: "ن",
      color: "bg-orange-500",
    },
    {
      name: "خالد العتيبي",
      job: "مطور ويب",
      letter: "خ",
      color: "bg-purple-600",
    },
    {
      name: "سارة أحمد",
      job: "مصممة UX",
      letter: "س",
      color: "bg-green-500",
    },
    {
      name: "محمد سالم",
      job: "مهندس برمجيات",
      letter: "م",
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FFE6D4]">
      {/* Title */}
      <div className="text-center mb-10 sm:mb-14 px-4">
        <span className="inline-block text-xs sm:text-sm font-semibold text-orange-500 bg-orange-100 px-3 sm:px-4 py-1 rounded-full mb-3">
          آراء المتدربين
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          ماذا يقول <span className="text-orange-500">طلابنا</span> عنا
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-4 sm:px-6">
        {testimonials.map((item: TestimonialItem, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 text-center"
          >
            {/* Stars */}
            <div className="flex justify-center text-yellow-400 mb-3 sm:mb-4 text-lg sm:text-xl">
              ★★★★★
            </div>

            {/* Text */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              "دورة تحليل البيانات كانت نقطة تحول في مسيرتي. المشاريع العملية
              ساعدتني على تطبيق ما تعلمته فوراً."
            </p>

            {/* User */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 border-t pt-3 sm:pt-4">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base`}
              >
                {item.letter}
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs sm:text-sm text-gray-800">
                  {item.name}
                </h4>
                <span className="text-xs text-gray-400">
                  {item.job}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
