import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    leftIcon?: React.ReactNode;
}

export const Input = ({ label, icon, leftIcon, ...props }: InputProps) => {
    return (
        <div className="w-full space-y-2">
            {label && <label className="text-sm font-bold text-secondary block pr-1">{label}:</label>}
            <div className="relative group">
                <input
                    {...props}
                    className="w-full bg-input-bg border border-transparent rounded-xl py-3.5 px-4 pr-11 pl-11 text-right outline-none 
                     focus:border-primary/30 focus:bg-white transition-all text-sm input-shadow 
                     placeholder:text-gray-400 font-medium"
                />
                {/* أيقونة اليمين (أساسية) */}
                {icon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                {/* أيقونة الشمال (اختيارية مثل العين) */}
                {leftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary transition-colors">
                        {leftIcon}
                    </div>
                )}
            </div>
        </div>
    );
};