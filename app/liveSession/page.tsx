'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import { CircleHelp, User, Users, Clock, Eye } from 'lucide-react';

interface LiveSession {
  id: number;
  title: string;
  instructor: string;
  image: string;
  viewers?: number;
  startTime?: Date;
  endTime?: Date;
}

export default function LiveSessionPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'past'>('live');

  const upcomingSessions: LiveSession[] = [
    {
      id: 1,
      title: 'دورة البرمجة المتقدمة',
      instructor: 'أحمد محمد',
      image: '/card.jpg',
      startTime: new Date(Date.now() + (2 * 3600000 + 10 * 60000)),
    },
    {
      id: 2,
      title: 'دورة التصميم UI/UX',
      instructor: 'فاطمة علي',
      image: '/card.jpg',
      startTime: new Date(Date.now() + (5 * 3600000 + 30 * 60000)),
    },
  ];

  const liveNowSessions: LiveSession[] = [
    {
      id: 4,
      title: 'دورة التسويق الرقمي',
      instructor: 'سارة أحمد',
      image: '/liveCard.png',
      viewers: 120,
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() + 7200000),
    },
    {
      id: 5,
      title: 'دورة تطوير التطبيقات',
      instructor: 'محمد علي',
      image: '/liveCard.png',
      viewers: 85,
      startTime: new Date(Date.now() - 1800000),
      endTime: new Date(Date.now() + 5400000),
    },
  ];

  const pastSessions: LiveSession[] = [
    {
      id: 6,
      title: 'دورة الذكاء الاصطناعي',
      instructor: 'فاطمة صالح',
      image: '/liveCard.png',
      viewers: 120,
      startTime: new Date(Date.now() - (2 * 3600000 + 23 * 60000 + 55 * 1000)),
      endTime: new Date(Date.now() - 3600000),
    },
  ];

  const visiblePastSessions = useMemo(() => {
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    return pastSessions.filter((s) => s.endTime && Date.now() - s.endTime.getTime() < THIRTY_DAYS_MS);
  }, [pastSessions]);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  const formatEndedSince = (endTime?: Date) => {
    if (!endTime) return 'انتهت منذ قليل';
    const diffMs = Date.now() - endTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours <= 3) return 'انتهت منذ قليل';
    if (diffHours < 24) return `انتهت منذ ${diffHours} ساعات`;
    return `انتهت منذ ${diffDays} أيام`;
  };

  const UpcomingSessionCard = ({ session }: { session: LiveSession }) => {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, isReady: false });

    useEffect(() => {
      if (!session.startTime) return;

      const update = () => {
        const diff = session.startTime!.getTime() - Date.now();

        if (diff <= 0) {
          setTimeLeft({ h: 0, m: 0, s: 0, isReady: true });
          return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ h, m, s, isReady: false });
      };

      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
    }, [session.startTime]);

    return (
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden pb-4 sm:pb-5">
        <div className="relative w-full aspect-video">
          <Image src={session.image} alt={session.title} fill className="object-cover" />
        </div>

        <h3 className="font-cairo font-bold text-[15px] max-[375px]:text-sm sm:text-lg lg:text-xl text-[#113555] mb-2 leading-tight line-clamp-2 px-2 sm:px-3 pt-2">
          {session.title}
        </h3>

        <p className="font-cairo text-[11px] max-[375px]:text-[10px] sm:text-sm text-gray-500 flex items-center gap-2 px-2 sm:px-3">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
          <span className="truncate">{session.instructor}</span>
        </p>

        <div className="text-center mb-4 sm:mb-6 px-2 sm:px-3 lg:px-4 pt-3">
          <p className="font-cairo text-xs sm:text-sm text-[#113555] mb-3">تبدأ خلال</p>

          <div className="flex items-center justify-center gap-2 max-[375px]:gap-1.5 sm:gap-4 lg:gap-6">
            {[
              { label: 'ساعة', value: timeLeft.h },
              { label: 'دقيقة', value: timeLeft.m },
              { label: 'ثانية', value: timeLeft.s },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-10 h-10 max-[375px]:w-9 max-[375px]:h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-[#FFF3EB] border border-[#FF6400] flex items-center justify-center text-base sm:text-xl lg:text-2xl font-bold text-[#113555]">
                  {formatTime(item.value)}
                </div>
                <span className="text-[9px] sm:text-[11px] text-[#113555] mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`
            w-[calc(100%-16px)] sm:w-[calc(100%-24px)] mx-2 sm:mx-3 h-10 sm:h-11 rounded-lg
            font-cairo font-semibold text-sm sm:text-base transition-all duration-300
            ${
              timeLeft.isReady
                ? 'bg-[#FF6400] text-white hover:bg-[#FF8C42] shadow-md cursor-pointer'
                : 'bg-[#FEE0CD] text-white opacity-70 cursor-not-allowed border'
            }
          `}
          onClick={() => timeLeft.isReady && alert('انضمام للجلسة: ' + session.title)}
          disabled={!timeLeft.isReady}
        >
          انضم الآن
        </button>
      </div>
    );
  };

  const LiveNowSessionCard = ({ session }: { session: LiveSession }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    useEffect(() => {
      if (!session.endTime) return;

      const update = () => {
        const diff = Math.max(0, Math.floor((session.endTime!.getTime() - Date.now()) / 1000));
        setRemainingSeconds(diff);
      };

      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
    }, [session.endTime]);

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    return (
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden pb-4 sm:pb-5">
        <div className="relative w-full aspect-video">
          <Image src="/liveCard.png" alt={session.title} fill className="object-cover" />
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 h-6 sm:h-7 rounded-[35px] bg-[#EB001B] text-white px-3 sm:px-4 flex items-center justify-center text-[10px] sm:text-xs font-cairo font-medium">
            مباشرة الآن
          </div>
        </div>

        <h3 className="font-cairo font-bold text-[15px] max-[375px]:text-sm sm:text-lg lg:text-xl text-[#113555] mb-2 leading-tight line-clamp-2 px-2 sm:px-3 pt-2">
          {session.title}
        </h3>

        <p className="font-cairo text-[11px] max-[375px]:text-[10px] sm:text-sm text-gray-500 flex items-center gap-2 px-2 sm:px-3 mb-3">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
          <span className="truncate">{session.instructor}</span>
        </p>

        <div className="px-2 sm:px-3 flex flex-col items-start gap-2 mb-4">
          <div className="h-8 sm:h-9 min-w-27.5 sm:min-w-29.5 rounded-[26px] border border-[#FF6400] bg-[#FFF3EB] px-3 sm:px-4 flex items-center justify-center gap-2 text-[#113555] text-[11px] sm:text-sm font-cairo">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">{session.viewers ?? 0} متعلم</span>
          </div>

          <div className="h-8 sm:h-9 min-w-27.5 sm:min-w-29.5 rounded-[26px] border border-[#FF6400] bg-[#FFF3EB] px-3 sm:px-4 flex items-center justify-center gap-2 text-[#113555] text-[11px] sm:text-sm font-cairo">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">{`${formatTime(h)}:${formatTime(m)}:${formatTime(s)}`}</span>
          </div>
        </div>

        <button className="w-[calc(100%-16px)] sm:w-[calc(100%-24px)] mx-2 sm:mx-3 h-10 sm:h-11 rounded-lg font-cairo font-semibold text-sm sm:text-base bg-[#FF6400] text-white hover:bg-[#FF8C42] transition-all duration-300">
          انضم الآن
        </button>
      </div>
    );
  };

  const PastSessionCard = ({ session }: { session: LiveSession }) => {
    const durationSeconds =
      session.startTime && session.endTime
        ? Math.max(0, Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000))
        : 0;

    const durationH = Math.floor(durationSeconds / 3600);
    const durationM = Math.floor((durationSeconds % 3600) / 60);
    const durationS = durationSeconds % 60;

    return (
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden pb-4 sm:pb-5">
        <div className="relative w-full aspect-video">
          <Image src="/liveCard.png" alt={session.title} fill className="object-cover" />
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 h-6 sm:h-7 rounded-[35px] bg-[#E0E0E0] border border-[#717171] text-black px-3 sm:px-4 flex items-center justify-center text-[10px] sm:text-xs font-cairo font-medium">
            تم الانتهاء
          </div>
        </div>

        <h3 className="font-cairo font-bold text-[15px] max-[375px]:text-sm sm:text-lg lg:text-xl text-[#113555] mb-2 leading-tight line-clamp-2 px-2 sm:px-3 pt-2">
          {session.title}
        </h3>

        <p className="font-cairo text-[11px] max-[375px]:text-[10px] sm:text-sm text-gray-500 flex items-center gap-2 px-2 sm:px-3 mb-3">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
          <span className="truncate">{session.instructor}</span>
        </p>

        <div className="px-2 sm:px-3 mb-4 grid grid-cols-3 gap-1 max-[375px]:gap-0.5 sm:gap-2">
          <div className="h-11 sm:h-9 min-w-0 w-full rounded-[26px] border border-[#F64000] bg-[#FFF3EB] px-1 sm:px-2 flex items-center justify-center gap-1 text-[#113555] text-[8px] max-[375px]:text-[7px] sm:text-[11px] font-cairo">
            <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">{session.viewers ?? 0} مشاهدة</span>
          </div>

          <div className="h-11 sm:h-9 min-w-0 w-full rounded-[26px] border border-[#F64000] bg-[#FFF3EB] px-1 sm:px-2 flex items-center justify-center gap-1 text-[#113555] text-[8px] max-[375px]:text-[7px] sm:text-[11px] font-cairo">
            <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">{`${formatTime(durationH)}:${formatTime(durationM)}:${formatTime(durationS)}`}</span>
          </div>

          <div className="h-11 sm:h-9 min-w-0 w-full rounded-[26px] border border-[#717171] bg-[#E0E0E0] px-1 sm:px-2 flex items-center justify-center text-black text-[8px] max-[375px]:text-[7px] sm:text-[11px] font-cairo">
            <span className="truncate">{formatEndedSince(session.endTime)}</span>
          </div>
        </div>

        <button className="w-[calc(100%-16px)] sm:w-[calc(100%-24px)] mx-2 sm:mx-3 h-10 sm:h-11 rounded-lg font-cairo font-semibold text-sm sm:text-base bg-[#FF6400] text-white hover:bg-[#FF8C42] transition-all duration-300">
          عرض التسجيل
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden">
      <Sidebar />

      <div className="lg:mr-70 xl:mr-75">
        <Navbar />

        <main className="px-2 max-[375px]:px-1.5 sm:px-4 lg:px-6 2xl:px-8 py-3 sm:py-4 lg:py-6">
          <div className="mb-4 sm:mb-6 text-right">
            <h1 className="font-cairo font-bold text-lg sm:text-2xl text-[#113555]">حصصي المباشرة</h1>
            <p className="font-cairo text-xs sm:text-sm text-gray-600 mt-1">تابع الحصص القادمة وانضم في الوقت المناسب</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="bg-white rounded-2xl p-2 sm:p-3 lg:p-4 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 border border-gray-200">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`
                  group relative w-full min-h-10 sm:min-h-12 lg:min-h-14 px-3 sm:px-4 lg:px-5 rounded-xl
                  font-cairo font-semibold text-xs sm:text-sm lg:text-base flex items-center justify-between gap-2
                  transition-all duration-300 border
                  ${
                    activeTab === 'upcoming'
                      ? 'bg-linear-to-r from-[#FF6400] to-[#FF8C42] text-white border-transparent shadow-md'
                      : 'bg-white text-[#113555] border-gray-300 hover:border-[#FF6400] hover:shadow-sm'
                  }
                `}
              >
                <span className="truncate">الجلسات القادمة</span>
                <span className={`text-[10px] sm:text-xs px-2 sm:px-4 py-0.5 rounded-full shrink-0 ${activeTab === 'upcoming' ? 'text-white' : 'text-[#113555] group-hover:bg-[#FEE0CD]'}`}>
                  ({upcomingSessions.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab('live')}
                className={`
                  group relative w-full min-h-10 sm:min-h-12 lg:min-h-14 px-3 sm:px-4 lg:px-5 rounded-xl
                  font-cairo font-semibold text-xs sm:text-sm lg:text-base flex items-center justify-between gap-2
                  transition-all duration-300 border
                  ${
                    activeTab === 'live'
                      ? 'bg-linear-to-r from-[#FF6400] to-[#FF8C42] text-white border-transparent shadow-md'
                      : 'bg-white text-[#113555] border-gray-300 hover:border-[#FF6400] hover:shadow-sm'
                  }
                `}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="truncate">مباشرة الآن</span>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${activeTab === 'live' ? 'bg-[#EB001B]' : 'bg-[#113555]'}`} />
                </span>
                <span className={`text-[10px] sm:text-xs px-2 sm:px-4 py-0.5 rounded-full shrink-0 ${activeTab === 'live' ? 'text-white' : 'text-[#113555] group-hover:bg-[#FEE0CD]'}`}>
                  ({liveNowSessions.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab('past')}
                className={`
                  group relative w-full min-h-10 sm:min-h-12 lg:min-h-14 px-3 sm:px-4 lg:px-5 rounded-xl
                  font-cairo font-semibold text-xs sm:text-sm lg:text-base flex items-center justify-between gap-2
                  transition-all duration-300 border
                  ${
                    activeTab === 'past'
                      ? 'bg-linear-to-r from-[#FF6400] to-[#FF8C42] text-white border-transparent shadow-md'
                      : 'bg-white text-[#113555] border-gray-300 hover:border-[#FF6400] hover:shadow-sm'
                  }
                `}
              >
                <span className="truncate">الجلسات المنتهية</span>
                <span className={`text-[10px] sm:text-xs px-2 sm:px-4 py-0.5 rounded-full shrink-0 ${activeTab === 'past' ? 'text-white' : 'text-[#113555] group-hover:bg-[#FEE0CD]'}`}>
                  ({visiblePastSessions.length})
                </span>
              </button>
            </div>
          </div>

          {activeTab === 'upcoming' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {upcomingSessions.map((session) => (
                <UpcomingSessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : activeTab === 'live' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {liveNowSessions.map((session) => (
                <LiveNowSessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : visiblePastSessions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {visiblePastSessions.map((session) => (
                <PastSessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12">
              <CircleHelp className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto" />
              <p className="font-cairo text-sm sm:text-lg text-gray-500 mt-4">لا توجد جلسات في هذا القسم حالياً (0)</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
