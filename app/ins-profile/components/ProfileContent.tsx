import React from 'react';
import { Cairo } from 'next/font/google';
import Link from 'next/link';
import {
  Pencil,
  Mail,
  Phone,
  LayoutGrid,
  CalendarDays,
  BookOpen,
  GraduationCap,
  Star,
  DollarSign,
  Trophy,
  FilePlusCorner,
  FileBracesCorner
} from 'lucide-react';

// تهيئة الخط
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

// ==========================================
// Types & Interfaces
// ==========================================
interface StatData {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
}

interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

// ==========================================
// Static Mock Data (خارج المكون لمنع إعادة الإنشاء)
// ==========================================
const STATS_DATA: StatData[] = [
  { id: 's1', label: 'الدورات', value: '5', icon: BookOpen },
  { id: 's2', label: 'الطلاب', value: '500', icon: GraduationCap },
  { id: 's3', label: 'التقييم', value: '4.8', icon: Star },
  { id: 's4', label: 'الأرباح', value: '18,400 ج.م', icon: DollarSign },
];

const SKILLS_DATA: string[] = Array(16).fill('Python');

const ACHIEVEMENTS_DATA: AchievementData[] = [
  { id: 'a1', title: 'مدرب متميز', description: 'أكثر من 500 طالب مسجل', icon: Trophy },
  { id: 'a2', title: 'تقييم متميز', description: 'تقييم 4.5+ في جميع الدورات', icon: Star },
  { id: 'a3', title: 'منشئ محتوى', description: 'أكثر من 100 ساعة محتوى', icon: FilePlusCorner },
  { id: 'a4', title: 'مدرب متميز', description: 'أكثر من 500 طالب مسجل', icon: BookOpen },
];

// ==========================================
// Sub-Components (مكونات مساعدة لتحسين الأداء)
// ==========================================
const StatCard = ({ label, value, Icon }: { label: string; value: string; Icon: React.ElementType }) => (
  <article className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-1 text-right">
      <span className="text-sm font-semibold text-gray-500">{label}</span>
      <strong className="text-2xl font-bold text-gray-800">{value}</strong>
    </div>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-500">
      <Icon size={24} strokeWidth={2} aria-hidden="true" />
    </div>
  </article>
);

const AchievementCard = ({ title, description, Icon }: { title: string; description: string; Icon: React.ElementType }) => (
  <article className="flex items-center gap-4 bg-[#FDFBF7] p-5 rounded-2xl border border-gray-100/50">
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-500">
      <Icon size={24} strokeWidth={2} aria-hidden="true" />
    </div>
    <div className="flex flex-col text-right">
      <h4 className="font-bold text-gray-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  </article>
);

// ==========================================
// Main Component
// ==========================================
export default function ProfileContent() {
  return (
    <main dir="rtl" className={`${cairo.className} w-full max-w-7xl mx-auto space-y-6 text-gray-800`}>

      {/* 1. Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
          <p className="text-sm text-gray-500 mt-1">عرض وإدارة معلوماتك الشخصية</p>
        </div>
        <Link
          href="/ins=settings"
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          aria-label="تعديل الملف الشخصي"
        >
          <Pencil size={18} />
          <span>تعديل الملف</span>
        </Link>
      </header>

      {/* 2. Main Profile Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" aria-label="البيانات الأساسية">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4 flex-1">
            <img
              src="/profile.jpg"
              alt="صورة الملف الشخصي للمدرب"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-50"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-gray-900">م. محمد محمود</h2>
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">نشط</span>
              </div>
              <p className="text-sm text-gray-500">البرمجة وتطوير البرمجيات</p>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4 lg:gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-orange-500" />
              <span dir="ltr">mohamedahmed@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-orange-500" />
              <span dir="ltr">01012345678</span>
            </div>
            <div className="flex items-center gap-2">
              <FileBracesCorner size={16} className="text-orange-500" />
              <span>البرمجه وتطوير البرمجيات</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-orange-500" />
              <span>انضم في 30-12-2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="الإحصائيات">
        {STATS_DATA.map((stat) => (
          <StatCard key={stat.id} label={stat.label} value={stat.value} Icon={stat.icon} />
        ))}
      </section>

      {/* 4. Bio & Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bio Section (Takes 7 columns on Desktop) */}
        <section className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-100" aria-labelledby="bio-title">
          <h3 id="bio-title" className="text-lg font-bold text-gray-900 mb-4">نبذة شخصية</h3>
          <p className="text-sm text-gray-600 leading-loose">
            مدرب وخبير متخصص في مجال البرمجة وتطوير البرمجيات. يمتلك خبرة عملية وتدريبية تمتد لأكثر من 10 سنوات في تأهيل الكوادر التقنية وبناء المطورين المحترفين. حاصل على درجة الدكتوراه في علوم الحاسب، مع خلفية أكاديمية قوية مكنته من الدمج بين الأسس العلمية والتطبيق العملي بما يتماشى مع متطلبات سوق العمل.
            <br className="my-2" />
            شارك في تدريب مئات المتدربين من طلاب الجامعات والخريجين والمهنيين داخل مصر، وساهم في رفع كفاءتهم التقنية وتأهيلهم للعمل في مجالات تطوير الويب، البرمجيات، وقواعد البيانات. يتميز بأسلوب تدريبي مبسط يعتمد على الشرح العملي، المشاريع التطبيقية، وربط المحتوى باحتياجات الشركات وسوق التكنولوجيا المصري.
          </p>
        </section>

        {/* Skills Section (Takes 5 columns on Desktop) */}
        <section className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100" aria-labelledby="skills-title">
          <h3 id="skills-title" className="text-lg font-bold text-gray-900 mb-4">المهارات</h3>
          <ul className="flex flex-wrap gap-2">
            {SKILLS_DATA.map((skill, index) => (
              <li
                key={index}
                className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full cursor-default hover:bg-orange-600 transition-colors"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 5. Achievements Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" aria-labelledby="achievements-title">
        <h3 id="achievements-title" className="text-lg font-bold text-gray-900 mb-6">الإنجازات</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS_DATA.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              Icon={achievement.icon}
            />
          ))}
        </div>
      </section>

    </main>
  );
}