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
    <div className="bg-white rounded-2xl p-3 sm:p-2 lg:p-0 mb-6 sm:mb-0">
      <div className="flex flex-wrap justify-around gap-2 sm:gap-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-cairo font-medium text-sm sm:text-base transition-all duration-200 ${
              activeTab === tab.id
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

