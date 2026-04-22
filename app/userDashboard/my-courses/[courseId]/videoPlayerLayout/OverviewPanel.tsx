'use client';

import Image from 'next/image';
import { Clock3, FileText } from 'lucide-react';

export default function OverviewPanel({
  duration,
  instructorName,
  instructorAvatar,
  points,
}: {
  duration: string;
  instructorName: string;
  instructorAvatar: string;
  points: string[];
}) {
  if (points.length === 0) {
    return (
      <div className="flex h-50 flex-col items-center justify-center rounded-2xl border border-[#E8D8CA] bg-white text-[#8B8B8B] shadow-[0_10px_24px_rgba(17,53,85,0.06)]">
        <FileText className=" mb-3 h-19 w-12 text-[#C1C1C1]" />
        <p className="text-[12px] pb-4">لا توجد نظرة عامة</p>
      </div>
    );
  }

  return (
    <div className="h-50 overflow-hidden rounded-2xl border border-[#E8D8CA] bg-white px-5 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#7B7B7B]">
          <Clock3 className="h-4 w-4" />
          <span className="text-[12px] font-medium">{duration || 'غير محدد'}</span>
        </div>

        <div className="flex items-center gap-2 h-2 m-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#F0D9CB]">
            <Image src={instructorAvatar} alt={instructorName} fill className="object-cover" sizes="24px" />
          </div>
          <p className="text-[12px] font-semibold text-[#113555]">{instructorName}</p>
        </div>
      </div>

      <div className="custom-scrollbar mt-2 h-22 overflow-y-auto text-right text-[11px] leading-5 text-[#4B5563]">
        {points.map((point, index) => (
          <p key={index} className="mb-1 last:mb-0">
            {index === 0 ? point : `- ${point}`}
          </p>
        ))}
      </div>
    </div>
  );
}
