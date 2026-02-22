import { PlayCircle, Award, Users, Video, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden font-[Cairo] bg-[#0A2540] min-h-screen mt-32  py-12 sm:py-16 md:py-24"
    >
      {/* خلفية متدرجة منقحة */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 1200px 800px at 20% 30%, 
              rgba(255, 181, 135, 0.3) 0%, 
              rgba(255, 100, 0, 0.15) 25%, 
              transparent 60%
            ),
            radial-gradient(ellipse 1000px 700px at 80% 70%, 
              rgba(223, 129, 71, 0.2) 0%, 
              transparent 50%
            ),
            linear-gradient(180deg, #0A2540 0%, #113555 50%, #1a4566 100%)
          `,
        }}
      />

      {/* موجات الخلفية */}
      <div className="absolute w-full leading-none mt-94">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-75"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6908" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFF1E9" stopOpacity="1" />
            </linearGradient>
          </defs>

          <path
            fill="url(#waveGradient)"
            d="M0,256L60,245.3C120,235,240,213,360,186.7C480,160,600,128,720,138.7C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* النصوص */}
        <div className="space-y-6 sm:space-y-8 text-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">اكتشف عالم</span>
            <br />
            <span className="text-[#FF6908]">التعليم الإلكتروني</span>
            <br />
            <span className="text-white">المميز</span>
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
            انضم لأكثر من 50,000 متعلم واحصل على شهادات معتمدة من نخبة المدربين
            والخبراء في الوطن العربي.
          </p>

          {/* الأزرار */}
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            
          <Link href="/list-of-courses">
            <button
            
              className="bg-[#FF6400] hover:bg-[#FF7A33] transition-colors text-white font-bold rounded-lg text-sm sm:text-base px-6 sm:px-12 py-3 sm:py-3.5"
              style={{
                boxShadow: "0px 8px 24px rgba(255, 100, 0, 0.4)",
              }}
            >
              
            ابدأ رحلتك الآن
            </button>
            </Link>
            
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
          <div className="flex gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 text-white/90 font-semibold text-xs sm:text-sm flex-wrap">
            <span className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#FF6400]/20 flex items-center justify-center">
                <Award size={20} className="text-[#FFB987]" />
              </div>
              <div className="text-right">
                <div className="text-white font-bold">+10K</div>
                <div className="text-xs text-white/60">شهادة</div>
              </div>
            </span>

            <span className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#FF6400]/20 flex items-center justify-center">
                <Users size={20} className="text-[#FFB987]" />
              </div>
              <div className="text-right">
                <div className="text-white font-bold">+50K</div>
                <div className="text-xs text-white/60">طالب</div>
              </div>
            </span>

            <span className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#FF6400]/20 flex items-center justify-center">
                <Video size={20} className="text-[#FFB987]" />
              </div>
              <div className="text-right">
                <div className="text-white font-bold">+500</div>
                <div className="text-xs text-white/60">دورة</div>
              </div>
            </span>
          </div>
        </div>

        {/* كرت الفيديو */}
        <div className="flex justify-center lg:justify-end mb-20 sm:mb-32 lg:mb-48">
          <div className="relative w-full max-w-md lg:max-w-none">
            <div
              className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 backdrop-blur-sm w-full"
              style={{
                maxWidth: "480px",
                aspectRatio: "480/280",
                background:
                  "linear-gradient(135deg, rgba(255, 185, 135, 0.95) 0%, rgba(255, 140, 75, 0.9) 100%)",
                boxShadow:
                  "0px 20px 60px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(255, 100, 0, 0.2)",
              }}
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/hero-image.png"
                  alt="Course preview"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6400]/60 to-[#0A2540]/40" />

                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0A2540] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play size={24} className="text-[#FF6400] ml-1 sm:ml-1" fill="#FF6400" />
                </div>
              </div>

              <div className="mt-2 sm:mt-3 px-2 sm:px-3">
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#0A2540] mb-2">
                  <span>التقدم في الدورة</span>
                  <span>75%</span>
                </div>

                <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6400] rounded-full transition-all"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-16 md:left-32 lg:left-62 bg-gradient-to-r from-[#FF6400] to-[#FF8C4B] text-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 backdrop-blur-sm"
              style={{
                boxShadow:
                  "0px 12px 40px rgba(255, 100, 0, 0.4), 0px 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="text-left">
                <div className="font-bold text-lg sm:text-2xl">+1.234</div>
                <div className="text-[10px] sm:text-xs opacity-90 whitespace-nowrap">
                  انضموا هذا الأسبوع
                </div>
              </div>

              <div className="flex -space-x-1 sm:-space-x-2">
                {[
                  { bg: "#FF6400", text: "ب" },
                  { bg: "#0A2540", text: "ش" },
                  { bg: "#FFB987", text: "ي" },
                  { bg: "#FFFFFF", text: "ر", textColor: "#FF6400" },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold flex items-center justify-center text-xs sm:text-sm border-2 border-white shadow-md"
                    style={{
                      backgroundColor: avatar.bg,
                      color: avatar.textColor || "#FFFFFF",
                    }}
                  >
                    {avatar.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
