import type { CourseStatus } from '../store/types';

interface StatusBadgeProps {
  status: CourseStatus;
}

const statusConfig: Record<CourseStatus, { label: string; className: string }> = {
  active: {
    label: 'نشط',
    className: 'bg-green-500 text-white',
  },
  pending: {
    label: 'قيد المراجعة',
    className: 'bg-amber-500 text-white',
  },
  inactive: {
    label: 'غير نشط',
    className: 'bg-stone-400 text-white',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${config.className}`}
      aria-label={`الحالة: ${config.label}`}
    >
      {config.label}
    </span>
  );
}