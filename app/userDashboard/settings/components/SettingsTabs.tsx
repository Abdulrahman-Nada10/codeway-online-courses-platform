'use client';

import { useTranslation } from 'react-i18next';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'payments';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'profile' as SettingsTab, label: t('dashboard.profile') },
    { id: 'notifications' as SettingsTab, label: t('dashboard.notificationSettings') },
    { id: 'security' as SettingsTab, label: t('dashboard.securityAndPassword') },
    { id: 'payments' as SettingsTab, label: t('dashboard.paymentSettings') },
  ];

  return (
    <div className="mb-6 rounded-2xl bg-white p-3 dark:bg-slate-900 sm:mb-0 sm:p-2 lg:p-0">
      <div className="flex flex-wrap items-center justify-around gap-2 sm:gap-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 sm:px-15 py-2.5 sm:py-3 rounded-xl font-cairo font-medium text-sm sm:text-base transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#FF6400] text-white shadow-md'
                : 'text-[#113555] hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-800'
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

