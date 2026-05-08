import type { InputHTMLAttributes, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "w-full px-4 py-3 rounded-xl font-cairo text-sm bg-[#FFF3EB] border outline-none transition-colors duration-200 input-shadow";

type FieldState = "error" | "success" | "default";

function getFieldState(error?: string, success?: string): FieldState {
  if (error) return "error";
  if (success) return "success";
  return "default";
}
2
function FieldMessage({
  error,
  success,
  helperText,
}: {
  error?: string;
  success?: string;
  helperText?: string;
}) {
  const message = error || success || helperText;
  if (!message) return null;

  return (
    <p
      className={cn(
        "mt-1.5 text-start text-xs font-medium transition-all duration-300 ease-out animate-fade-in-up",
        error && "text-red-500",
        success && "text-green-600",
        !error && !success && "text-gray-400"
      )}
    >
      {message}
    </p>
  );
}

type DashboardInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
};

export default function DashboardInput({
  label,
  leftIcon,
  rightIcon,
  className,
  error,
  success,
  helperText,
  ...props
}: DashboardInputProps) {
  const state = getFieldState(error, success);

  return (
    <div className={cn("relative", className)}>
      {label ? (
        <label
          htmlFor={props.id}
          className="block font-cairo font-semibold text-sm text-[#000000] mb-2"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <input
          {...props}
          className={cn(
            baseClasses,
            "text-[#000000] placeholder:text-gray-400",
            rightIcon ? "pe-11" : "pe-4",
            leftIcon ? "ps-11" : "ps-4",
            state === "error" &&
              "border-red-400 bg-red-50/40 text-red-900 placeholder:text-red-300",
            state === "success" &&
              "border-green-400 bg-green-50/40 text-green-900 placeholder:text-green-300",
            state === "default" &&
              "border-transparent focus:border-[#FF6400]"
          )}
        />

        {rightIcon ? (
          <span className="pointer-events-none absolute inset-y-0 inset-e-3 flex items-center text-[#B6BCC5]">
            {rightIcon}
          </span>
        ) : null}

        {leftIcon ? (
          <span className="absolute inset-y-0 inset-s-3 flex items-center text-[#B6BCC5]">
            {leftIcon}
          </span>
        ) : null}
      </div>

      <FieldMessage error={error} success={success} helperText={helperText} />
    </div>
  );
}

