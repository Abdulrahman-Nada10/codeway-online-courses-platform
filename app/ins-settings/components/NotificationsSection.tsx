'use client';

import { Save } from 'lucide-react';

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
    studentMessages: boolean;
    courseUpdates: boolean;
    newEnrollments: boolean;
  };
  onToggle: (key: 'emailNotifications' | 'studentMessages' | 'courseUpdates' | 'newEnrollments') => void;
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
        <p className="font-cairo text-sm text-gray-500 mt-1">تخصيص الإشعارات التي تتلقاها</p>
      </div>

      <div className="space-y-4">
        <NotificationToggle
          title="إشعارات البريد الإلكتروني"
          description="تلقي الإشعارات عبر البريد الإلكتروني"
          enabled={notificationSettings.emailNotifications}
          onToggle={() => onToggle('emailNotifications')}
        />

        <NotificationToggle
          title="رسائل الطلاب"
          description="إشعار عند تلقي رسالة من طالب"
          enabled={notificationSettings.studentMessages}
          onToggle={() => onToggle('studentMessages')}
        />

        <NotificationToggle
          title="تحديثات الدورات"
          description="إشعار عند تسجيل طالب جديد أو تقييم"
          enabled={notificationSettings.courseUpdates}
          onToggle={() => onToggle('courseUpdates')}
        />

        <NotificationToggle
          title="التسجيلات الجديدة"
          description="إشعار عند تسجيل طالب جديد في دوراتك"
          enabled={notificationSettings.newEnrollments}
          onToggle={() => onToggle('newEnrollments')}
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
          <Save className="w-5 h-5" />
          حفظ التغيرات
        </button>
      </div>
    </div>
  );
}
