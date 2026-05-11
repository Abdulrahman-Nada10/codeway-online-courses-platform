"use client";

import AuthWrapper from "@/app/components/auth/AuthWrapper";
import { Input } from "@/app/components/auth/Input"; // ✅ ضفنا الأقواس هنا
import Link from "next/link";

import { HiOutlineUpload } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import {
    FaLinkedin,
    FaFacebook,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa";

export default function ForgetAccountPage() {
    return (
        <AuthWrapper title="بيانات استرجاع الحساب">
            <form className="w-full space-y-4">

                {/* اسم العائلة */}
                <Input
                    placeholder="اسم عائلتك"
                    icon={<AiOutlineUser size={20} />}
                />

                {/* نوع التليفون */}
                <Input
                    placeholder="نوع تليفونك"
                    icon={<MdOutlinePhonelinkSetup size={20} />}
                />

                {/* رفع ملف */}
                <div className="w-full">
                    <label className="w-full flex items-center justify-center gap-2 bg-[#FFD8BF]/40 border-2 border-dashed border-[#FFD8BF] text-secondary py-3 rounded-xl cursor-pointer hover:bg-[#FFD8BF]/60 transition-all">
                        <HiOutlineUpload size={20} className="text-primary" />
                        <span className="text-sm font-bold text-primary">
                            رفع لقطة شاشة
                        </span>
                        <input type="file" className="hidden" />
                    </label>
                </div>

                {/* زر الإرسال */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2 text-sm"
                >
                    إرسال
                </button>
            </form>

            {/* روابط */}
            <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-gray-600 font-medium">
                    لديك حساب بالفعل؟{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        تسجيل الدخول
                    </Link>
                </p>

                <p className="text-xs text-gray-400 font-medium">
                    هل نسيت كلمة المرور؟{" "}
                    <Link href="/forgetpassword" className="text-primary font-bold hover:underline">
                        استرجاع حساب
                    </Link>
                </p>

                {/* Social */}
                <div className="flex justify-center gap-5 text-primary pt-2">
                    <Link href="#"><FaLinkedin size={18} /></Link>
                    <Link href="#"><FaFacebook size={18} /></Link>
                    <Link href="#"><FaYoutube size={18} /></Link>
                    <Link href="#"><FaInstagram size={18} /></Link>
                </div>
            </div>
        </AuthWrapper>
    );
}