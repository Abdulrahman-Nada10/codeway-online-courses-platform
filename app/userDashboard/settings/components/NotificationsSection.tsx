'use client';

import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NotificationToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function NotificationToggle({
  title,
  description,
  enabled,
  onToggle
}: NotificationToggleProps) {
  const { t , i18n} = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl bg-white p-4 dark:bg-slate-900 sm:flex-row sm:items-center">
      <div className="text-start">
        <h4 className="font-cairo text-base font-medium text-[#113555] dark:text-slate-100">{title}</h4>
        <p className="mt-1 font-cairo text-sm text-gray-500 dark:text-slate-400">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-18 h-8 rounded-full transition-all duration-300 shrink-0 ${
          enabled ? 'bg-[#FF6400]' : 'bg-gray-300'
        }`}
        aria-label={`${title}: ${enabled ? t('dashboard.enabled') : t('dashboard.disabled')}`}
        type="button"
      >
        <span
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-600 ${
            enabled
              ? isRTL
                ? 'left-1'
                : 'right-1'
              : isRTL
                ? 'right-1'
                : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

interface NotificationsSectionProps {
  notificationSettings: {
    emailNotifications: boolean;
    newCourses: boolean;
    studyReminders: boolean;
    offersAndDiscounts: boolean;
  };
  onToggle: (key: 'emailNotifications' | 'newCourses' | 'studyReminders' | 'offersAndDiscounts') => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function NotificationsSection({
  notificationSettings,
  onToggle,
  onSave,
  onCancel
}: NotificationsSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="pb-4 text-start">
        <h3 className="font-cairo text-lg font-bold text-[#113555] dark:text-slate-100">
          {t('dashboard.notificationSettings')}
        </h3>
      </div>

      <div className="space-y-4">
        <NotificationToggle
          title={t('dashboard.emailNotifications')}
          description={t('dashboard.emailNotificationsDesc')}
          enabled={notificationSettings.emailNotifications}
          onToggle={() => onToggle('emailNotifications')}
        />

        <NotificationToggle
          title={t('dashboard.newCourses')}
          description={t('dashboard.newCoursesDesc')}
          enabled={notificationSettings.newCourses}
          onToggle={() => onToggle('newCourses')}
        />

        <NotificationToggle
          title={t('dashboard.studyReminders')}
          description={t('dashboard.studyRemindersDesc')}
          enabled={notificationSettings.studyReminders}
          onToggle={() => onToggle('studyReminders')}
        />

        <NotificationToggle
          title={t('dashboard.offersAndDiscounts')}
          description={t('dashboard.offersAndDiscountsDesc')}
          enabled={notificationSettings.offersAndDiscounts}
          onToggle={() => onToggle('offersAndDiscounts')}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors w-full sm:w-auto"
        >
          {t('common.cancel')}
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-sm hover:bg-[#E55A00] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {t('common.saveChanges')}
        </button>
      </div>
    </div>
  );
}

