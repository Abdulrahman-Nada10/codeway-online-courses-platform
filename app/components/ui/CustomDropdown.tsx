import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption { value: string; label: string; }
interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown = ({ options, value, onChange }: DropdownProps) => {
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

  return (
    <div ref={ref} className="relative">
      
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center gap-2 bg-[#D9D9D9] hover:bg-white
          text-[#535353] font-semibold text-sm px-4 py-2.5 rounded-full
          shadow-sm transition-all duration-200 whitespace-nowrap
          ${open ? "bg-white ring-2 ring-orange-300" : ""}
        `}
      >
        
        <ChevronDown
          size={14}
          className={`text-[#33363F] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {selected?.label}
      </button>

      
      {open && (
        <div
          className="
            absolute top-[calc(100%+8px)] right-0 z-50
            bg-white rounded-2xl shadow-xl border border-orange-100
            overflow-hidden min-w-40
          "
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`
                  w-full flex items-center justify-between gap-4
                  px-4 py-2.5 text-sm text-right transition-colors duration-150
                  ${isActive
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 font-medium"
                  }
                `}
              >
                {option.label}
                {isActive && <Check size={14} className="text-orange-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
