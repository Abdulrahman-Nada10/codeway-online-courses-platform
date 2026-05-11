import AuthWrapper from "@/app/components/auth/AuthWrapper";
import { Input } from "@/app/components/auth/Input";
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

export default function ContactPage() {
    return (
        <AuthWrapper title="الشكاوي والإقتراحات">
            <form className="w-full space-y-4">
                {/* حقل الإسم */}
                <Input
                    placeholder="الإسم"
                    icon={<AiOutlineUser size={20} />}
                />

                {/* حقل البريد الإلكتروني */}
                <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    icon={<AiOutlineMail size={20} />}
                />

                {/* حقل الرسالة (Textarea) */}
                <div className="w-full space-y-2">
                    <div className="relative group">
                        <textarea
                            placeholder="أكتب النص................."
                            rows={5}
                            className="w-full bg-input-bg border border-transparent rounded-xl py-3.5 px-4 text-right outline-none 
                         focus:border-primary/30 focus:bg-white transition-all text-sm input-shadow 
                         placeholder:text-gray-400 font-medium resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* زرار إرسال */}
                <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2">
                    إرسال
                </button>
            </form>
        </AuthWrapper>
    );
}