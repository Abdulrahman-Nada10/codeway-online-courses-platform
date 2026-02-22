'use client';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'payments';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: 'profile' as SettingsTab, label: 'الملف الشخصي' },
    { id: 'notifications' as SettingsTab, label: 'الاشعارات' },
    { id: 'security' as SettingsTab, label: 'الامان' },
    { id: 'payments' as SettingsTab, label: 'المدفوعات' },
  ];

  return (
    <div className="bg-white rounded-2xl p-1 sm:p-2">
      <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 min-w-[7rem] px-3 sm:px-5 py-2.5 rounded-xl font-cairo font-medium text-sm transition-all duration-200 text-center ${activeTab === tab.id
                ? 'bg-[#FF6400] text-white shadow-md'
                : 'text-[#113555] hover:bg-gray-100'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { SettingsTab };
