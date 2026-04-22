'use client';

import { Check } from 'lucide-react';

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
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white ">
      <div className="text-right">
        <h4 className="font-cairo font-medium text-base text-[#113555]">{title}</h4>
        <p className="font-cairo text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-18 h-8 rounded-full transition-all duration-300 shrink-0 ${
          enabled ? 'bg-[#FF6400]' : 'bg-gray-300'
        }`}
        aria-label={`${title}: ${enabled ? 'مفعل' : 'غير مفعل'}`}
        type="button"
      >
        <span
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-8' : '-translate-x-2'
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
  return (
    <div className="space-y-8">
      <div className="text-right pb-4 ">
        <h3 className="font-cairo font-bold text-lg text-[#113555]">
          إعدادات الإشعارات
        </h3>
      </div>

      <div className="space-y-4">
        <NotificationToggle
          title="اشعارات البريد الإلكتروني"
          description="استلم إشعارات عبر البريد الإلكتروني"
          enabled={notificationSettings.emailNotifications}
          onToggle={() => onToggle('emailNotifications')}
        />

        <NotificationToggle
          title="دورات جديده"
          description="استلم إشعارات عند إضافة دورات جديدة"
          enabled={notificationSettings.newCourses}
          onToggle={() => onToggle('newCourses')}
        />

        <NotificationToggle
          title="تذكير بالعلم"
          description="تذكيرات منتظمة لمواصلة تعلمك"
          enabled={notificationSettings.studyReminders}
          onToggle={() => onToggle('studyReminders')}
        />

        <NotificationToggle
          title="العرض و الخصومات"
          description="استلم العروض والخصومات الخاصة"
          enabled={notificationSettings.offersAndDiscounts}
          onToggle={() => onToggle('offersAndDiscounts')}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border-2 border-[#FF6400] text-[#FF6400] rounded-xl font-cairo font-medium text-sm hover:bg-[#FFF3EB] transition-colors w-full sm:w-auto"
        >
          الغاء
        </button>
        <button
          onClick={onSave}
          className="px-6 py-3 bg-[#FF6400] text-white rounded-xl font-cairo font-medium text-sm hover:bg-[#E55A00] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}

