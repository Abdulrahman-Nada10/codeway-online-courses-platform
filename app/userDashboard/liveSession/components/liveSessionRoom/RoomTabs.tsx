import { roomTabs } from './constants';
import { RoomTab, RoomTabCount } from './types';

interface RoomTabsProps {
  activeTab: RoomTab;
  counts: RoomTabCount;
  onChange: (tab: RoomTab) => void;
}

export function RoomTabs({ activeTab, counts, onChange }: RoomTabsProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-hidden text-right">
      {roomTabs.map((tab) => {
        const count = counts[tab.id];
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 text-sm transition-colors sm:text-base ${
              isActive ? 'border-[#ff6400] text-[#111827]' : 'border-transparent text-[#6b7280]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive ? 'bg-[#fff0e6] text-[#ff6400]' : 'bg-[#f3f4f6] text-[#9ca3af]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
