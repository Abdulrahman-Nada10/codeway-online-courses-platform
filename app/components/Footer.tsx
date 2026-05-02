import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaLinkedin, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#FFF1E6] pt-12 sm:pt-16 pb-6 sm:pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">

        {/* الدعم */}
        <div>
          <h4 className="font-bold text-primary mb-3 sm:mb-4 text-base sm:text-lg">الدعم</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="/help" className="hover:text-primary">مركز المساعدة</a></li>
            <li><a href="/faq" className="hover:text-primary">الأسئلة الشائعة</a></li>
            <li><a href="/contact" className="hover:text-primary">تواصل معنا</a></li>
            <li><a href="/terms" className="hover:text-primary">الشروط والأحكام</a></li>
            <li><a href="/privacy" className="hover:text-primary">سياسة الخصوصية</a></li>
          </ul>
        </div>

        {/* المنتجات */}
        <div>
          <h4 className="font-bold text-primary mb-3 sm:mb-4 text-base sm:text-lg">التصنيفات</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="/courses" className="hover:text-primary">البرمجه</a></li>
            <li><a href="/tracks" className="hover:text-primary"> التصميم</a></li>
            <li><a href="/certificates" className="hover:text-primary">التسويق</a></li>
            <li><a href="/pricing" className="hover:text-primary">الاداره</a></li>
            <li><a href="/pricing" className="hover:text-primary">اللغات</a></li>
          </ul>
        </div>

        {/* المنصة */}
        <div>
          <h4 className="font-bold text-primary mb-3 sm:mb-4 text-base sm:text-lg">المنصة</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="/about" className="hover:text-primary">عن EGC</a></li>
            <li><a href="/instructors" className="hover:text-primary">كيف تعمل</a></li>
            <li><a href="/blog" className="hover:text-primary">المدربين</a></li>
            <li><a href="/careers" className="hover:text-primary">الشهادات</a></li>
            <li><a href="/price" className="hover:text-primary">الاسعار</a></li>
          </ul>
        </div>

        {/* معلومات الشركة */}
        <div className="text-right lg:col-span-1">
          <img
            src="/logo.png"
            alt="EGC Logo"
            className="w-16 sm:w-20 mb-3 sm:mb-4 ml-auto"
          />

          <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            منصة EGC الرائدة في التعليم الإلكتروني العربي. نقدم أفضل الدورات التعليمية من خبراء ومتخصصين لمساعدتك في تحقيق أهدافك المهنية.
          </p>

          <div className="space-y-2 text-xs mt-10 sm:text-sm">
            <div className="flex items-center gap-2 justify-end">
              <Mail size={14} className="sm:w-4 sm:h-4 text-primary" />
              <a href="mailto:info@egc.com" className="hover:text-primary">
                info@egc.com
              </a>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Phone size={14} className="sm:w-4 sm:h-4 text-primary" />
              <a href="tel:+201001589726" className="hover:text-primary">
                +20 100 158 9726
              </a>
            </div>

            <div className="flex items-center gap-2 justify-end">
  <MapPin size={14} className="sm:w-4 sm:h-4 text-primary" />
  <a
    href="https://www.google.com/maps?q=القاهرة+مصر+EEP+Education+Platform"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-primary"
  >
    القاهرة – مصر
  </a>
</div>

          </div>
        </div>
      </div>

      {/* Social */}
      <div className="max-w-7xl mx-auto top-20 px-4 sm:px-6">
        <div className="flex justify-start lg:justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            className="w-7 h-7 sm:w-8 sm:h-8 text-primary bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaLinkedin size={14} className="sm:w-4 sm:h-4" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="w-7 h-7 sm:w-8 sm:h-8 text-primary bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaFacebook size={14} className="sm:w-4 sm:h-4" />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            className="w-7 h-7 sm:w-8 sm:h-8 text-primary bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaYoutube size={14} className="sm:w-4 sm:h-4" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className="w-7 h-7 sm:w-8 sm:h-8 text-primary bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <FaInstagram size={14} className="sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-orange-200 mt-8 sm:mt-12 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
        جميع الحقوق محفوظة © 2026 منصة EGC التعليمية
      </div>
    </footer>
  );
}
