import Link from "next/link";
export default function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#FFF6ED]">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">

        {/* Badge */}
        <span className="inline-block text-[10px] sm:text-xs font-semibold bg-white/20 px-3 sm:px-4 py-1 rounded-full mb-3 sm:mb-4">
          منصة تعليمية رقمية
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          مستعد لتغيير مستقبلك؟
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-orange-50 opacity-90 mb-6 sm:mb-8 leading-relaxed">
          انضم لأكثر من 50,000 متعلم واحصل على وصول فوري لأكثر من
          500 دورة تعليمية مع أفضل المدربين في الوطن العربي
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <Link href="/list-of-courses">
            <button className="bg-white text-orange-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition text-sm sm:text-base">
              تصفح الدورات
            </button>
          </Link>

<Link href="/signup">
          <button className="border border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-white/10 transition text-sm sm:text-base">
            ابدأ رحلتك الآن
          </button>
</Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/30 mb-4 sm:mb-6"></div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-[10px] sm:text-xs text-orange-50 opacity-90">
          <span>ضمان استرجاع المال</span>
          <span>شهادات معتمده</span>
          <span>دعم على مدار الساعه</span>
          <span>وصول مدى الحياه</span>
        </div>
      </div>
    </section>
  );
}
