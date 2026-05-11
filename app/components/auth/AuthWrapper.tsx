import React from 'react';
import Image from "next/image";

interface AuthWrapperProps {
    children: React.ReactNode;
    title: string;
    subTitle?: string;
    icon?: React.ReactNode; // ضفنا الـ icon هنا عشان الكود ميعملش Error
}

const AuthWrapper = ({ children, title, subTitle, icon }: AuthWrapperProps) => {
    return (
        <main className="min-h-screen bg-page-bg flex items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
            {/* الكارت الأبيض الرئيسي */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 w-full max-w-[500px] flex flex-col items-center border border-white/20">
                
                {/* Logo Section */}
                <div className="flex justify-center mb-4">
                    <Image
                        src="/logo.png" 
                        alt="EGC Logo"
                        width={100}
                        height={45}
                        className="h-auto object-contain"
                        priority
                    />
                </div>

                {/* Icon (لو موجود بيظهر تحت اللوجو) */}
                {icon && <div className="mt-2 flex justify-center">{icon}</div>}

                {/* Title */}
                <h1 className="mt-4 text-[20px] font-bold text-primary sm:text-[22px] text-center">
                    {title}
                </h1>

                {/* Subtitle */}
                {subTitle && (
                    <p className="mt-1 text-[12px] font-medium text-gray-400 text-center">
                        {subTitle}
                    </p>
                )}

                {/* الـ Form أو المحتوى اللي بيبعت من الصفحات التانية */}
                <div className="w-full mt-8">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default AuthWrapper;