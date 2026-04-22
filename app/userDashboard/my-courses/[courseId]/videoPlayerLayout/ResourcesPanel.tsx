'use client';

import { useState } from 'react';
import { Check, Download, FileArchive, FileText, FileType2 } from 'lucide-react';
import { LessonResource } from './types';

function ResourceIcon({ kind }: { kind: LessonResource['kind'] }) {
  if (kind === 'zip') return <FileArchive className="h-4 w-4" />;
  if (kind === 'ppt') return <FileType2 className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

export default function ResourcesPanel({ resources }: { resources: LessonResource[] }) {
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  if (resources.length === 0) {
    return (
      <div className="flex h-37 flex-col items-center justify-center rounded-2xl border border-[#E8D8CA] bg-white text-[#8B8B8B] shadow-[0_10px_24px_rgba(17,53,85,0.06)]">
        <FileText className=" mb-3 h-19 w-12 text-[#C1C1C1]" />
        <p className="text-[12px] pb-4">لا توجد مرفقات او ملفات</p>
      </div>
    );
  }

  return (
    <div className="h-37 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white p-4 shadow-[0_10px_24px_rgba(17,53,85,0.06)]">
      <div className="custom-scrollbar h-full space-y-2 overflow-y-auto pr-1">
        {resources.map((resource) => {
          const isDownloaded = downloadedIds.includes(resource.id);

          return (
            <div key={resource.id} className="flex items-center justify-between rounded-xl bg-white px-2 py-2.5 text-[#113555]">
              <button
                type="button"
                onClick={() =>
                  setDownloadedIds((prev) =>
                    isDownloaded ? prev.filter((id) => id !== resource.id) : [...prev, resource.id],
                  )
                }
                className="text-[#6B7280] transition hover:text-[#113555]"
                aria-label="تنزيل الملف"
              >
                {isDownloaded ? (
                  <span className="inline-flex items-center">
                    <Check className="h-4 w-5" />
                    <span className="mt-5.5 inline-flex w-5 border-b border-current relative right-5.5" />
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
