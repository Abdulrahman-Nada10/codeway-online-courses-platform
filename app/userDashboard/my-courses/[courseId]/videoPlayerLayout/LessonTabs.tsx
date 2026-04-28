'use client';

import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { VideoPlayerTab } from './types';

export default function LessonTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: VideoPlayerTab; label: string }[];
  activeTab: VideoPlayerTab;
  onTabChange: (tab: VideoPlayerTab) => void;
}) {
  const { dir } = useLocaleDirection();

  return (
    <div className="grid h-auto grid-cols-1 gap-2 rounded-2xl border border-[#E8D8CA] bg-white p-2.5 shadow-[0_8px_20px_rgba(17,53,85,0.05)] dark:bg-slate-900 sm:h-14.5 sm:grid-cols-3 sm:gap-4" dir={dir}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (

          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`rounded-[11px] px-3 py-1.5 text-[10px] font-bold transition min-[360px]:text-[11px] ${
              isActive
                ? 'bg-[#113555] text-white shadow-[0_6px_12px_rgba(17,53,85,0.18)]'
                : 'bg-white text-[#111111] hover:bg-[#FFF3EB] hover:text-[#113555]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
