"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "@/app/components/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    let newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) newErrors.email = "البريد الإلكتروني غير صالح";
    if (password.length < 6) newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (isValid) {
      console.log({ email, password });
      router.push("/"); // بعد تسجيل الدخول توجه للصفحة الرئيسية
      target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4 max-w-md mx-auto mt-10">
      {/* Logo */}
     <div className="pb-3 sm:pb-4  flex items-center justify-center">
             <div className="w-20 h-14 sm:w-22 sm:h-16 flex items-center justify-center overflow-hidden">
               <Image
                 src="/logo.png"
                 alt="شعار الموقع"
                 width={64}
                 height={64}
                 className="w-full h-full object-contain"
               />
             </div>
     </div>

      {/* Title */}
      <h2 className="text-center text-xl font-bold text-[var(--primary)] mb-2">
        مرحبا بعودتك 
      </h2>
      <p className="text-center text-sm text-[var(--primary)] mb-6">
        انضم لأكثر من 50,000 متعلم
      </p>

      {/* Google Login placeholder */}
      <button
        type="button"
        className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 mb-4 hover:bg-gray-50 transition"
      >
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-xs text-gray-400">أو تسجيل الدخول ببياناتك الشخصية</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Inputs */}
      <Input icon={<Mail size={18} />} name="email" placeholder="البريد الإلكتروني"  
       
        
      />
      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}

      <Input
        icon={<Lock size={18} />}
        leftIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        type={showPassword ? "text" : "password"}
        placeholder="كلمة المرور"
        name="password"
        onLeftIconClick={() => setShowPassword(!showPassword)}
      />
      {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

      {/* Forgot Password */}
      <div className="text-left text-xs mb-4">
        <Link href="/forgetpassword" className="hover:underline text-[var(--primary)]">
          هل نسيت كلمة المرور؟
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[var(--primary)] hover:brightness-90 text-white py-3 rounded-lg font-semibold transition"
      > 
        دخول
      </button>

      {/* Links */}
      <p className="text-center text-sm text-[var(--secondary)] mt-4">
        ليس لديك حساب؟
        <Link href="/register" className="text-[var(--primary)] font-medium mr-1 hover:underline">
          إنشاء حساب
        </Link>
      </p>

      <p className="text-center text-sm text-[var(--secondary)] mt-2">
        هل لديك حساب وتريد استرجاعه؟
        <Link href="/forgetaccount" className="text-[var(--primary)] font-medium mr-1 hover:underline">
          استرجاع الحساب
        </Link>
      </p>
    </form>
  );
}