import type { ReactNode, InputHTMLAttributes } from "react";

type Props = {
  placeholder: string;
  icon?: ReactNode;         
  leftIcon?: ReactNode;      
  type?: string;             
  name?: string;             
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLeftIconClick?: () => void; 
} & InputHTMLAttributes<HTMLInputElement>; 

export default function Input({
  placeholder,
  icon,
  leftIcon,
  type = "text",
  name,
  value,
  onChange,
  onLeftIconClick,
  ...rest
}: Props) {
  return (
    <div className="relative mb-4">
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className="w-full py-2 px-3 pr-9 pl-9 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--input-bg)]"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      {leftIcon && (
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={onLeftIconClick}
        >
          {leftIcon}
        </div>
      )}
    </div>
  );
}