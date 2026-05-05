'use client';

import { useState } from 'react';
import { Check, Download, FileArchive, FileText, FileType2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { LessonResource } from './types';

function ResourceIcon({ kind }: { kind: LessonResource['kind'] }) {
  if (kind === 'zip') return <FileArchive className="h-4 w-4" />;
  if (kind === 'ppt') return <FileType2 className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

export default function ResourcesPanel({ resources }: { resources: LessonResource[] }) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  if (resources.length === 0) {
    return (
      <div className="flex h-37 flex-col items-center justify-center rounded-2xl border border-[#E8D8CA] bg-white text-[#8B8B8B] shadow-[0_10px_24px_rgba(17,53,85,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <FileText className="mb-3 h-19 w-12 text-[#C1C1C1]" />
        <p className="pb-4 text-[12px]">{t('player.noResources')}</p>
      </div>
    );
  }

  return (
    <div className="h-37 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white p-4 shadow-[0_10px_24px_rgba(17,53,85,0.06)] dark:border-slate-800 dark:bg-slate-900" dir={dir}>
      <div className="custom-scrollbar h-full space-y-2 overflow-y-auto rtl:pl-1 ltr:pr-1">
        {resources.map((resource) => {
          const isDownloaded = downloadedIds.includes(resource.id);

          return (
            <div
              key={resource.id}
              className="flex items-center justify-between rounded-xl bg-background px-2 py-2.5 text-[#113555] dark:bg-slate-800 dark:text-slate-100"
            >
              <button
                type="button"
                onClick={() =>
                  setDownloadedIds((prev) =>
                    isDownloaded
                      ? prev.filter((id) => id !== resource.id)
                      : [...prev, resource.id]
                  )
                }
                className="text-[#6B7280] transition hover:text-[#113555] dark:text-slate-400 dark:hover:text-slate-100"
                aria-label={t('player.downloadFile')}
              >
                {isDownloaded ? (
                  <span className="inline-flex items-center">
                    <Check className="h-4 w-5" />
                    <span className="relative mt-5.5 inline-flex w-5 border-b border-current rtl:right-5.5 ltr:left-5.5" />
                  </span>
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </button>

              <div className="flex items-center gap-2 text-[13px]">
                <span>{resource.title}</span>
                <ResourceIcon kind={resource.kind} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
