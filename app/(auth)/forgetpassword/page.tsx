import AuthWrapper from "@/app/components/auth/AuthWrapper";
import { Input } from "@/app/components/auth/Input";
import { AiOutlineMail } from 'react-icons/ai'; // ✅ Imports سليمة
import { HiLockClosed } from 'react-icons/hi';
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <AuthWrapper title="">
            <div className="flex flex-col items-center w-full">

                <div className="bg-primary p-4 rounded-2xl mb-4 shadow-lg shadow-primary/30">
                    <HiLockClosed size={45} className="text-white" />
                </div>

                <h2 className="text-primary text-2xl font-black mb-2 text-center">
                    نسيت كلمة المرور؟
                </h2>
                <p className="text-gray-400 text-sm mb-8 text-center font-medium">
                    أدخل بريدك الإلكتروني لإعادة التعيين
                </p>

                <form className="w-full space-y-5">
                    <Input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        icon={<AiOutlineMail size={20} />} // ✅ تم التعديل هنا
                    />

                    <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                        إرسال الكود
                    </button>

                    <Link
                        href="/login"
                        className="w-full border-2 border-primary text-primary font-bold py-3 rounded-xl flex items-center justify-center hover:bg-primary/5 transition-all active:scale-[0.98]"
                    >
                        العوده الي تسجيل الدخول
                    </Link>
                </form>
            </div>
        </AuthWrapper>
    );
}