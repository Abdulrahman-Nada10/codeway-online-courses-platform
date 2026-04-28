import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { CalendarDays, Download, FileText, Mic, Share2 } from 'lucide-react';
import { LiveSession } from '../../types';

function ResourceIcon({ type }: { type: 'pdf' | 'link' }) {
  if (type === 'pdf') {
    return <FileText className="h-4 w-4 text-[#ff6400]" />;
  }

  return <Download className="h-4 w-4 text-[#ff6400]" />;
}

export function SessionDetails({ session }: { session: LiveSession }) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_10px_35px_rgba(17,53,85,0.06)] dark:bg-slate-900 sm:p-5" dir={dir}>
      <div className="flex flex-col gap-4 border-b border-[#f0e6df] pb-5 sm:pb-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            className="flex justify-center h-10 items-center gap-2 rounded-md bg-[#ff6400] px-4 text-xs font-semibold text-white sm:h-11 sm:px-6 sm:text-sm"
          >
            <span>{t('dashboard.addToCalendar')}</span>
            <span>+</span>
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-[#f0e6df] px-4 text-xs font-medium text-[#6b7280] sm:h-11 sm:px-6 sm:text-sm"
          >
            <span>{t('dashboard.shareSession')}</span>
            <Share2 className="h-4 w-4" />
          </button>

        </div>

        <div className="text-start">
          <h1 className="text-xl font-semibold leading-[1.8] text-[#111827] dark:text-slate-100 sm:text-2xl xl:max-w-3xl xl:text-3xl">
            {session.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center justify-end gap-3 text-xs text-[#8c8c8c] sm:gap-5 sm:text-sm">
            <div className="flex items-center gap-2">
              <span>{session.timeLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{session.dateLabel}</span>
            </div>

          </div>
        </div>
      </div>

      <div className="grid gap-6 pt-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:pt-6">
        <div className="text-start">
          <h2 className="text-lg font-semibold text-[#8c8c8c] dark:text-slate-300 sm:text-xl">{t('dashboard.aboutThisSession')}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#4b5563] dark:text-slate-400 sm:text-base sm:leading-8">{session.description}</p>

          <div className="mt-6 flex items-center justify-start gap-3">

            <div className="relative h-12 w-12 overflow-hidden rounded-full sm:h-14 sm:w-14">
              <Image src={session.instructorAvatar} alt={session.instructor} fill className="object-cover" />
            </div>
            <div className="text-start">
              <p className="text-base font-semibold text-[#111827] dark:text-slate-100">{session.instructor}</p>
              <p className="text-sm text-[#9ca3af] dark:text-slate-400">{session.instructorRole}</p>
            </div>

          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-start text-lg font-semibold text-[#8c8c8c] dark:text-slate-300 sm:text-xl">{t('dashboard.resources')}</h2>

          <div className="space-y-3">
            {session.resources?.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e7eb] px-4 py-3 text-xs text-[#374151] sm:text-sm"
              >
                <Download className="h-4 w-4 shrink-0 text-[#9ca3af]" />

                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{resource.name}</span>
                  <ResourceIcon type={resource.type} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
