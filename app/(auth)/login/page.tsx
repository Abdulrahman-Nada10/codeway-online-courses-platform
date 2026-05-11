import AuthWrapper from "@/app/components/auth/AuthWrapper"; // التعديل: استيراد بدون أقواس
import { Input } from "@/app/components/auth/Input";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from "next/link";

export default function LoginPage() {
    return (
        <AuthWrapper title="مرحباً بعودتك" subTitle="انضم لأكثر من 50,000 متعلم">

            {/* Google Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-100 rounded-full py-3 text-sm font-bold text-gray-700 mb-6 hover:bg-gray-50 transition-all shadow-sm">
                <FcGoogle size={22} />
                <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative w-full flex items-center mb-8">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-medium">أو تسجيل الدخول ببياناتك الشخصية</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form className="w-full space-y-5">
                <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    icon={<AiOutlineMail size={20} />}
                />

                <div className="space-y-2">
                    <Input
                        type="password"
                        placeholder="كلمة المرور"
                        icon={<AiOutlineLock size={20} />}
                        leftIcon={<AiOutlineEye size={20} />}
                    />
                    <div className="text-right">
                        {/* شيلنا size="sm" لأن تيلويند text-xs بيقوم بالواجب */}
                        <Link href="/forgetpassword" className="text-blue-500 text-xs font-bold hover:underline">
                            هل نسيت كلمة المرور؟
                        </Link>
                    </div>
                </div>

                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                    دخول
                </button>
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-3">
                <p className="text-sm text-gray-600">
                    ليس لديك حساب؟ <Link href="/register" className="text-primary font-black hover:underline">إنشاء حساب</Link>
                </p>
                <p className="text-xs text-gray-400">
                    هل لديك حساب وتريد استرجاعه؟ <Link href="/forgetaccount" className="text-primary font-black hover:underline">استرجاع حساب</Link>
                </p>
            </div>
        </AuthWrapper>
    );
}