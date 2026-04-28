import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { CirclePlay, MonitorPlay, Settings, Users, Volume2 } from 'lucide-react';
import { LiveSession } from '../../types';

interface VideoPanelProps {
  elapsedTime: string;
  session: LiveSession;
  totalDuration: string;
  viewers: number;
}

export function VideoPanel({ elapsedTime, session, totalDuration, viewers }: VideoPanelProps) {
  const { t } = useTranslation();
  return (
    <section className="overflow-hidden rounded-2xl bg-white p-3 shadow-[0_10px_35px_rgba(17,53,85,0.06)] dark:bg-slate-900 sm:p-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#030712]">
        <div className="relative aspect-video">
          <Image src={session.image} alt={session.title} fill className="object-cover" priority />
        </div>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#eb001b] px-3 py-1 text-xs font-semibold text-white">{t('dashboard.liveNow')}</span>
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">{viewers}</span>
          </div>

          <div className="rounded-full bg-black/50 px-3 py-1 text-xs text-white">{session.timeLabel}</div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4">
          <div className="mb-3 h-1.5 rounded-full bg-white/20">
            <div className="h-full w-[72%] rounded-full bg-[#ff6400]" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <button type="button" className="rounded-full bg-white/10 p-2 text-white" aria-label={t('common.play')}>
                <CirclePlay className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button type="button" className="rounded-full bg-white/10 p-2 text-white" aria-label={t('common.volume')}>
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <span>
                {elapsedTime} / {totalDuration}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <Users className="h-4 w-4" />
                <span>{viewers} {t('dashboard.learner')}</span>
              </div>

              <button type="button" className="rounded-full bg-white/10 p-2 text-white" aria-label={t('common.screen')}>
                <MonitorPlay className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button type="button" className="rounded-full bg-white/10 p-2 text-white" aria-label={t('common.settings')}>
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
