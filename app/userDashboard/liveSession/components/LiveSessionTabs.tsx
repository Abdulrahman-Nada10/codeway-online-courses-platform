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
    <div className="grid gap-3 rounded-[28px] border border-[#eeded3] bg-white p-3 md:grid-cols-3">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 text-sm font-semibold transition-all ${
              isActive
                ? 'border-transparent bg-linear-to-r from-[#ff6400] to-[#ff9152] text-white shadow-[0_15px_30px_rgba(255,100,0,0.18)]'
                : 'border-[#e7ddd6] bg-white text-[#113555] hover:border-[#ff6400]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{tab.label}</span>
              {tab.id === 'live' ? (
                <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#eb001b]' : 'bg-[#113555]'}`} />
              ) : null}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs ${isActive ? 'bg-white/10' : 'bg-[#fff3eb]'}`}>
              ({counts[tab.id]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
