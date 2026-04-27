import { SessionTab } from '../types';

const tabs: Array<{ id: SessionTab; label: string }> = [
  { id: 'upcoming', label: 'الجلسات القادمة' },
  { id: 'live', label: 'مباشرة الآن' },
  { id: 'past', label: 'الجلسات المنتهية' },
];

interface LiveSessionTabsProps {
  activeTab: SessionTab;
  counts: Record<SessionTab, number>;
  onChange: (tab: SessionTab) => void;
}

export function LiveSessionTabs({ activeTab, counts, onChange }: LiveSessionTabsProps) {
  return (
    <div className="grid gap-2 rounded-[28px] border border-[#eeded3] bg-white p-2 sm:gap-3 sm:p-3 md:grid-cols-3" dir="rtl">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-xs font-semibold transition-all sm:min-h-14 sm:px-5 sm:text-sm ${
              isActive
                ? 'border-transparent bg-linear-to-r from-[#ff6400] to-[#ff9152] text-white shadow-[0_15px_30px_rgba(255,100,0,0.18)]'
                : 'border-[#e7ddd6] bg-white text-[#113555] hover:border-[#ff6400]'
            }`}
          >
            <span className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right">
              <span className="truncate">{tab.label}</span>
              {tab.id === 'live' ? (
                <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#eb001b]' : 'bg-[#113555]'}`} />
              ) : null}
            </span>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] sm:text-xs ${isActive ? 'bg-white/10' : 'bg-[#fff3eb]'}`}>
              ({counts[tab.id]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
