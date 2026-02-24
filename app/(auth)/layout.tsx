"use client";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--page-bg)] px-4">
      <div className="w-full max-w-md bg-[var(--background)] rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}