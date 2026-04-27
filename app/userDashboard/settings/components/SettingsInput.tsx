'use client';

import { InputHTMLAttributes, ReactNode } from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type SettingsInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  success?: string;
  helperText?: string;
  rightElement?: ReactNode;
};

export default function SettingsInput({
  label,
  error,
  success,
  helperText,
  rightElement,
  className,
  id,
  ...props
}: SettingsInputProps) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-cairo font-medium text-sm text-[#113555] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={cn(
            'w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border outline-none transition-colors input-shadow',
            'border-transparent focus:border-[#FF6400]',
            hasError && 'border-red-400 bg-red-50/40 text-red-900 placeholder:text-red-300',
            hasSuccess && 'border-green-400 bg-green-50/40 text-green-900 placeholder:text-green-300',
            className
          )}
        />
        {rightElement ? (
          <span className="absolute inset-y-0 left-3 flex items-center">
            {rightElement}
          </span>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1 text-right text-[11px] font-medium text-red-500 transition-opacity duration-200">
          {error}
        </p>
      ) : success ? (
        <p className="mt-1 text-right text-[11px] font-medium text-green-600 transition-opacity duration-200">
          {success}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-right text-[11px] font-medium text-gray-400 transition-opacity duration-200">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

