"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  isCollapsed: boolean;
};

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  isActive,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={`
        group relative flex h-11 items-center gap-3 rounded-xl px-3
        text-sm font-medium transition-all duration-200 ease-in-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      {/* Active indicator bar - left side, 2px width */}
      {isActive && (
        <span className="absolute right-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-orange-500" />
      )}

      <Icon
        size={18}
        strokeWidth={1.75}
        className={`shrink-0 transition-all duration-200 ease-in-out ${
          isActive
            ? "text-orange-500"
            : "text-gray-400 group-hover:translate-x-0.5 group-hover:text-orange-500"
        }`}
      />

      {/* Label — hidden when collapsed */}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
      >
        {label}
      </span>

      {/* Tooltip on collapsed */}
      {isCollapsed && (
        <span
          className="
            pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2
            whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white
            opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100
          "
        >
          {label}
        </span>
      )}
    </Link>
  );
}
