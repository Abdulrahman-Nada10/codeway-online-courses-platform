import AuthWrapper from "@/app/components/auth/AuthWrapper";
import { Input } from "@/app/components/auth/Input";
import { GenderSelect } from "@/app/components/auth/GenderSelect";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiUserSharedLine } from 'react-icons/ri'; // محتاجة تثبتي react-icons لو مش موجودة
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function RegisterPage() {
    return (
        <AuthWrapper title="إنشاء حساب جديد" subTitle="انضم لأكثر من 50,000 متعلم">

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-100 rounded-full py-2.5 text-sm font-bold text-gray-700 mb-6 hover:bg-gray-50 transition-all shadow-sm">
                <FcGoogle size={20} />
                <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative w-full flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-medium">أو تسجيل الدخول ببياناتك الشخصية</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form className="w-full space-y-4">
                {/* الاسم */}
                <Input placeholder="الإسم" icon={<AiOutlineUser size={20} />} />

                {/* البريد */}
                <Input type="email" placeholder="البريد الإلكتروني" icon={<AiOutlineMail size={20} />} />

                {/* كلمة المرور */}
                <Input type="password" placeholder="كلمة المرور" icon={<AiOutlineLock size={20} />} leftIcon={<AiOutlineEye size={18} />} />

                {/* تأكيد كلمة المرور */}
                <Input type="password" placeholder="تأكيد كلمة المرور" icon={<AiOutlineLock size={20} />} leftIcon={<AiOutlineEye size={18} />} />

                {/* السن */}
                <Input type="number" placeholder="السن" />

                {/* المحافظة والمنطقة (نصين في سطر واحد) */}
                <div className="flex gap-4">
                    <div className="flex-[1.2]"> {/* المحافظة Select أو Input */}
                        <select className="w-full bg-input-bg border border-[#FFD8BF] rounded-xl py-3 px-4 text-right outline-none text-sm input-shadow text-gray-400 appearance-none">
                            <option>المحافظة</option>
                        </select>
                    </div>
                    <div className="flex-[2]">
                        <Input placeholder="المنطقة / الشارع" />
                    </div>
                </div>

                {/* اختيار النوع */}
                <GenderSelect />

                {/* زرار الإنشاء */}
                <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2">
                    إنشاء الحساب
                </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-gray-600 font-medium">
                    لديك حساب بالفعل؟ <Link href="/login" className="text-primary font-bold hover:underline">تسجيل الدخول</Link>
                </p>
                <p className="text-xs text-gray-400">
                    هل لديك حساب وتريد استرجاعه؟ <Link href="/forgetpassword" className="text-primary font-bold hover:underline">استرجاع حساب</Link>
                </p>

                {/* Social Icons */}
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