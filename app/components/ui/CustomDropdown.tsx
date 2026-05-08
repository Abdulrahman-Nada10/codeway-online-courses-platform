import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "pill" | "input";
  label?: string;
  error?: string;
  className?: string;
}

const CustomDropdown = ({
  options,
  value,
  onChange,
  variant = "pill",
  label,
  error,
  className = "",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isPill = variant === "pill";

  return (
    <div ref={ref} className={`relative flex flex-col gap-2 ${isPill ? "" : "w-full"} ${className}`}>
      {label && !isPill && (
        <label className="block font-cairo font-medium text-sm text-[#113555] dark:text-gray-300">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          isPill
            ? `flex items-center gap-2 bg-[#fff3eb] hover:bg-[#e6d1c4]
               text-[#535353] font-semibold text-sm px-4 py-2.5 rounded-full
               shadow-sm transition-all duration-200 whitespace-nowrap
               ${open ? "bg-[#e6d1c4] ring-2 ring-orange-300" : ""}`
            : `w-full flex items-center justify-between px-4 py-3 rounded-xl input-shadow font-cairo text-sm transition-all duration-300
               ${open ? "border-[#FF6400] ring-1 ring-[#FF6400]" : "border-transparent"}
               bg-[#FFF3EB] dark:bg-[#0F172A] border
               text-[#113555] dark:text-white`
        }
      >
        {isPill ? (
          <>
            <ChevronDown
              size={14}
              className={`text-[#33363F] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
            {selected?.label}
          </>
        ) : (
          <>
            <span className="flex-1 text-start">{selected?.label}</span>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {open && (
        <div
          className={`
            absolute top-[calc(100%+8px)] left-0 right-0 z-50
            bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl border border-orange-100 dark:border-gray-800
            overflow-hidden min-w-40 animate-in fade-in slide-in-from-top-2 duration-200
            ${isPill ? "w-auto" : "w-full"}
          `}
        >
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between gap-4
                    px-4 py-3 text-sm font-cairo transition-colors duration-150
                    ${isActive
                      ? "bg-orange-50 dark:bg-orange-900/20 text-[#FF6400] font-bold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
                    }
                  `}
                >
                  {option.label}
                  {isActive && <Check size={14} className="text-orange-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && !isPill && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
