import { PlayCircle, Award, Users, Video, Play } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden font-[Cairo] bg-[#0A2540] min-h-screen"
    >
      {/* خلفية متدرجة */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(275deg, rgba(255, 255, 255, 0.77) 0%, rgba(234, 88, 12, 0.77) 22%, rgba(17, 53, 85, 0.78) 74%, rgba(255, 255, 255, 0.25) 99%)",
          backgroundColor: "#ffffff"
        }}
      />

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-48 sm:pb-52 md:pb-56 lg:pb-60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* النصوص - يظهر أولاً دائماً */}
          <div className="space-y-5 sm:space-y-7 text-right order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">اكتشف عالم</span>
              <br />
              <span className="text-white">التعليم الإلكتروني</span>
              <br />
              <span className="text-white">المميز</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              انضم لأكثر من 50,000 متعلم واحصل على شهادات معتمدة من نخبة المدربين
              والخبراء في الوطن العربي.
            </p>

            {/* الأزرار */}
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <button
                className="bg-[#FF6400] hover:bg-[#FF7A33] transition-colors text-white font-bold rounded-lg text-sm sm:text-base px-6 sm:px-12 py-3 sm:py-3.5"
                style={{
                  boxShadow: "0px 8px 24px rgba(255, 100, 0, 0.4)",
                }}
              >
                ابدأ رحلتك الآن
              </button>

              <button
                className="flex items-center gap-2 text-white hover:text-[#FFB987] font-bold rounded-lg transition-colors text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-3.5"
                style={{
                  border: "2px solid rgba(255, 181, 135, 0.5)",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                شاهد فيديو تعريفي
              </button>
            </div>

            {/* الإحصائيات */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 text-white font-semibold text-xs sm:text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center">
                  <Award size={18} className="text-primary sm:w-5 sm:h-5" />
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm sm:text-base">+10K</div>
                  <div className="text-[10px] sm:text-xs text-white/80">شهادة</div>
                </div>
              </span>

              <span className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center">
                  <Users size={18} className="text-primary sm:w-5 sm:h-5" />
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm sm:text-base">+50K</div>
                  <div className="text-[10px] sm:text-xs text-white/80">طالب</div>
                </div>
              </span>

              <span className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center">
                  <Video size={18} className="text-primary sm:w-5 sm:h-5" />
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm sm:text-base">+500</div>
                  <div className="text-[10px] sm:text-xs text-white/80">دورة</div>
                </div>
              </span>
            </div>
          </div>

          {/* كرت الفيديو - يظهر ثانياً على الموبايل */}
          <div className="flex justify-center lg:justify-end order-2">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div
                className="relative rounded-[24px] sm:rounded-[32px] p-3 sm:p-5 w-full"
                style={{
                  maxWidth: "600px",
                  backgroundColor: "#F7C19B",
                  boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="relative rounded-[16px] sm:rounded-[24px] overflow-hidden flex items-center justify-center w-full aspect-[16/9] mb-3 sm:mb-5">
                  <Image
                    src="/hero-image.png"
                    alt="Course preview"
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />

                  <div className="relative z-10 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <Play size={28} className="text-primary ml-1 sm:ml-2 sm:w-8 sm:h-8" fill="currentColor" />
                  </div>
                </div>

                <div className="px-1 sm:px-2 pb-1 sm:pb-2">
                  <div className="flex justify-between text-xs sm:text-base font-bold text-secondary mb-2 sm:mb-3">
                    <span>التقدم في الدورة</span>
                    <span>75%</span>
                  </div>

                  <div className="w-full h-2 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E6AE88" }}>
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              </div>

              {/* بادج الانضمام */}
              <div
                className="absolute -bottom-8 sm:-bottom-14 right-2 sm:-right-6 lg:-right-12 bg-primary rounded-2xl sm:rounded-[20px] px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-8 min-w-[220px] sm:min-w-[280px] z-10"
                style={{
                  boxShadow: "0px 12px 30px rgba(255, 100, 0, 0.25)",
                }}
              >
                <div className="text-right text-secondary">
                  <div className="font-bold text-base sm:text-xl">+1.234</div>
                  <div className="text-[9px] sm:text-xs font-semibold">
                    انضموا هذا الأسبوع
                  </div>
                </div>

                <div className="flex -space-x-2 sm:-space-x-3 space-x-reverse">
                  {["A", "B", "C", "D"].map((avatar, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-full font-bold flex items-center justify-center text-[10px] sm:text-sm bg-[#E2E8F0] text-secondary shadow-sm"
                      style={{
                        border: "2px solid #F7C19B"
                      }}
                    >
                      {avatar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* قسم أرقام تتحدث عن نفسها */}
      <div
        className="text-center px-4 pt-8 pb-5 sm:pt-12 sm:pb-8 absolute left-1/2 -translate-x-1/2 bottom-0 z-10 bg-[#FFF8F0] w-[95%] sm:w-[90%] md:w-[85%] max-w-[1300px] rounded-t-[50px] sm:rounded-t-[100px] lg:rounded-t-[140px]"
        style={{ marginBottom: "-1px" }}
      >
        <h2 className="text-lg sm:text-3xl md:text-4xl font-bold text-primary">
          أرقام تتحدث عن نفسها
        </h2>
        <p className="text-primary/90 mt-1.5 sm:mt-3 text-[10px] sm:text-base md:text-lg font-medium">
          نفتخر بثقة آلاف المتعلمين في منصتنا ونسعى دائما للأفضل
        </p>
      </div>
    </section>
  );
}