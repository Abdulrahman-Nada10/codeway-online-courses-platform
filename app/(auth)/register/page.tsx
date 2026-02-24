"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";  
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  
} from "lucide-react";
import Input from "@/app/components/Input";


const governorates = [
  "القاهرة","الإسكندرية","الجيزة","الدقهلية","الشرقية","القليوبية","البحيرة","المنوفية",
  "الغربية","سوهاج","أسيوط","المنيا","أسوان","الأقصر","الفيوم","بورسعيد","دمياط","السويس",
  "شمال سيناء","جنوب سيناء","كفر الشيخ","الوادى الجديد","البحر الأحمر","مطروح","قنا"
];

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", confirm: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string };
      password: { value: string };
      confirm: { value: string };
      name: { value: string };
      age: { value: string };
      governorate: { value: string };
      street: { value: string };
      gender: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();
    const confirm = target.confirm.value.trim();

    let newErrors = { email: "", password: "", confirm: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) newErrors.email = "البريد الإلكتروني غير صالح";
    if (password.length < 6) newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    if (password !== confirm) newErrors.confirm = "كلمة المرور غير متطابقة";

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (isValid) {
      // تسجيل البيانات في console كـ placeholder
      console.log({
        email,
        password,
        name: target.name.value,
        age: target.age.value,
        governorate: target.governorate.value,
        street: target.street.value,
        gender: target.gender.value
      });

      
      router.push("/");

      target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4">
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
      <h2 className="text-center text-xl font-bold text-[var(--primary)] mb-1">
        إنشاء حساب جديد
      </h2>
      <p className="text-center text-sm text-[var(--primary)] mb-6">
        انضم لأكثر من 50,000 متعلم
      </p>

      {/* Google Button placeholder */} 
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
      <Input icon={<User size={18} />} name="name" placeholder="الاسم" />
      <Input icon={<Mail size={18} />} name="email" placeholder="البريد الإلكتروني"  
      
        
      />
      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}

      <Input
        icon={<Lock size={18} />}
        leftIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        placeholder="كلمة المرور"
        type={showPassword ? "text" : "password"}
        name="password"
        onLeftIconClick={() => setShowPassword(!showPassword)}
      />
      {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

      <Input
        icon={<Lock size={18} />}
        leftIcon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        placeholder="تأكيد كلمة المرور"
        type={showConfirmPassword ? "text" : "password"}
        name="confirm"
        onLeftIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}

      <Input name="age" placeholder="السن" />

      {/* Location */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <select
            name="governorate"
            defaultValue=""
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--input-bg)] appearance-none"
          >
            <option value="" disabled>المحافظة</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <input
          name="street"
          placeholder="المنطقة/الشارع"
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] bg-[var(--input-bg)]"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <p className="text-sm mb-2 font-medium text-[var(--secondary)]">النوع:</p>
        <div className="flex gap-3">
          <label className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 cursor-pointer">
            <input type="radio" name="gender" value="ذكر"  />
            أنثي
          </label>
          <label className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 cursor-pointer">
            <input type="radio" name="gender" value="أنثى" />
            ذكر
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[var(--primary)] hover:brightness-90 text-white py-3 rounded-lg font-semibold transition mb-4"
      >
        إنشاء الحساب
      </button>

  

{/* Links */}
<p className="text-center text-sm text-[var(--secondary)] mt-4">
  لديك حساب بالفعل؟
  <Link href="/login" className="text-[var(--primary)] font-medium ml-1 hover:underline">
     تسجيل الدخول
  </Link>
</p>

<p className="text-center text-sm text-[var(--secondary)] mt-2">
  هل لديك حساب وتريد استرجاعه؟
  <Link href="/forgetaccount" className="text-[var(--primary)] font-medium ml-1 hover:underline">
    استرجاع الحساب
  </Link>
</p>

{/* Social Icons */}
<div className="flex justify-center gap-4 mt-6">
      <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Instagram size={24} />
  </a>
        <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Youtube size={24} />
  </a>

  <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Facebook size={24} />
  </a>

   <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Linkedin size={24} />
  </a>
</div>
    </form>
  );
}