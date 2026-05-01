import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { SessionTab } from '../types';

interface LiveSessionTabsProps {
  activeTab: SessionTab;
  counts: Record<SessionTab, number>;
  onChange: (tab: SessionTab) => void;
}

export function LiveSessionTabs({ activeTab, counts, onChange }: LiveSessionTabsProps) {
  const { t } = useTranslation();
  const { dir } = useLocaleDirection();

  const tabs: Array<{ id: SessionTab; label: string }> = [
    { id: 'upcoming', label: t('dashboard.upcoming') },
    { id: 'live', label: t('dashboard.liveNow') },
    { id: 'past', label: t('dashboard.past') },
  ];

  return (
    <div className="grid gap-2 rounded-[28px]  bg-background p-2  sm:gap-3 sm:p-3 md:grid-cols-3" dir={dir}>
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
                : 'border-[#e7ddd6] bg-white text-[#113555] hover:border-[#ff6400] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'
            }`}
          >
            <span className="flex min-w-0 flex-1 items-center justify-between gap-2 text-start">
              <span className="truncate">{tab.label}</span>
              {tab.id === 'live' ? (
                <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#eb001b]' : 'bg-[#113555]'}`} />
              ) : null}
            </span>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] sm:text-xs ${isActive ? 'bg-white/10' : 'bg-page-bg'}`}>
              ({counts[tab.id]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
