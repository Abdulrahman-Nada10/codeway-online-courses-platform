'use client';

import { useState } from 'react';
import { Check, Download, FileText } from 'lucide-react';
import { LessonAssignment } from './types';

function AssignmentIcon({ icon }: { icon: LessonAssignment['icon'] }) {
  if (icon === 'check') return <Check className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

export default function AssignmentsPanel({ assignments }: { assignments: LessonAssignment[] }) {
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  if (assignments.length === 0) {
    return (
      <div className="flex h-44 flex-col items-center justify-center rounded-2xl border border-[#E8D8CA] bg-white text-[#8B8B8B] shadow-[0_10px_24px_rgba(17,53,85,0.06)]">
        <FileText className=" mb-3 h-19 w-12 text-[#C1C1C1]" />
        <p className="text-[12px] pb-4">لا توجد مهام او تمارين</p>
      </div>
    );
  }

  return (
    <div className="h-44 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(17,53,85,0.06)]">
      <div className="custom-scrollbar h-full space-y-4 overflow-y-auto pr-1">
        {assignments.map((assignment) => {
          const isDownloaded = downloadedIds.includes(assignment.id);

          return (
            <div key={assignment.id} className="flex items-start justify-between gap-3 rounded-xl py-1">
              <button
                type="button"
                onClick={() =>
                  setDownloadedIds((prev) =>
                    isDownloaded ? prev.filter((id) => id !== assignment.id) : [...prev, assignment.id],
                  )
                }
                className="mt-4 text-[#6B7280] transition hover:text-[#113555]"
                aria-label="تنزيل المهمة"
              >
                {isDownloaded ? (
                  <span className="inline-flex items-center">
                    <Check className="h-4 w-5.3" />
                    <span className="mt-5.5 inline-flex w-5 border-b border-current relative right-5.5" />
                  </span>
                ) : (
                  <Download className="h-4 w-5" />
                )}
              </button>

              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#111111]">{assignment.title}</p>
                <p className="mt-1.5 text-[11px] leading-6 text-[#7B7B7B]">{assignment.description}</p>
                <div className="mt-2.5 flex items-center justify-end gap-2 text-[10px] text-[#7B7B7B]">
                  <span>{assignment.title} (PDF)</span>
                  <AssignmentIcon icon={assignment.icon} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
