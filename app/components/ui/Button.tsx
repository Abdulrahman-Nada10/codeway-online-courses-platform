type ButtonVariant = "primary" | "outline" | "ghost" | "info";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#FF6400] to-[#F5A00F] hover:from-orange-500 hover:to-orange-600 text-white shadow-md hover:shadow-orange-300/50 hover:shadow-lg transition-all duration-300",
  outline:
    "border border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-white/10 rounded-full py-2 flex items-center justify-center gap-2 transition-all duration-300",
  ghost:
    "text-orange-500 hover:bg-orange-50 bg-transparent transition-all duration-300",

  info: " bg-[#F3EAE2] text-[#113555] px-4 py-2 rounded-full text-sm hover:opacity-90 transition transition-all duration-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1 text-sm rounded-xl",
  md: "px-6 py-2 text-base rounded-xl",
  lg: "px-7 py-2 text-lg rounded-3xl",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition-all duration-200 ease-in-out
        active:scale-95 cursor-pointer select-none
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className ?? ""}
      `}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;