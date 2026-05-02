import Link from "next/link";

export default function CTA() {
  const perks = [
    "ضمان استرجاع المال",
    "شهادات معتمدة",
    "دعم على مدار الساعة",
    "وصول مدى الحياة",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FFF8F0]">
      <div 
        className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-14 text-center text-white shadow-[0_20px_50px_rgba(255,100,0,0.3)] relative overflow-hidden group"
        style={{ background: "linear-gradient(259.14deg, rgba(255, 100, 0, 0.6) 21.85%, rgba(255, 109, 15, 0.553679) 25.16%)" }}
      >
      
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_60%)] pointer-events-none" />

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 shadow-inner animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            ابدأ رحلتك التعليمية اليوم
          </span>
        </div>

        {/* Title */}
        <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          مستعد لتغيير <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">مستقبلك؟</span>
        </h2>

        {/* Description */}
        <p className="relative max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 mb-10 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          انضم لأكثر من <span className="font-bold text-white">50,000 متعلم</span> واحصل على وصول فوري لأكثر من
          <span className="font-bold text-white"> 500 دورة تعليمية</span> مع أفضل المدربين في الوطن العربي
        </p>

        {/* Buttons */}
        <div className="relative flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Link href="/list-of-courses" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2">
              تصفح الدورات
            </button>
          </Link>

          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 hover:border-white/80 hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2">
              ابدأ رحلتك الآن
            </button>
          </Link>
        </div>

        {/* Perks */}
        <div className="relative flex flex-wrap justify-center gap-4 sm:gap-8 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          {perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
              {perk}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
