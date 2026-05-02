import { Star, Clock, User } from "lucide-react";
import Link from "next/link";

interface Course {
  title: string;
  instructor: string;
  category: string;
  rating: number;
  students: number;
  hours: number;
  price: string;
  oldPrice: string;
  image: string;
  discount: string;
}

export default function Courses() {
  const courses: Course[] = [
    {
      title: "تحليل البيانات باستخدام Python",
      instructor: "م. محمود رضا",
      category: "علم البيانات",
      rating: 4.9,
      students: 4200,
      hours: 128,
      price: "1,000",
      oldPrice: "1,500",
      image: "/hero-image.png",
      discount: "50%",
    },
    {
      title: "تصميم تجربة المستخدم UX",
      instructor: "م. سارة أحمد",
      category: "التصميم",
      rating: 4.9,
      students: 4200,
      hours: 328,
      price: "500",
      oldPrice: "600",
      image: "/hero-image.png",
      discount: "50%",
    },
    {
      title: "التسويق الرقمي المتقدم",
      instructor: "م. محمود علي",
      category: "التسويق",
      rating: 4.9,
      students: 4200,
      hours: 28,
      price: "199",
      oldPrice: "250",
      image: "/hero-image.png",
      discount: "50%",
    },
    {
      title: "تطوير ويب Django",
      instructor: "م. فاطمة محمود",
      category: "تطوير ويب",
      rating: 4.9,
      students: 4200,
      hours: 28,
      price: "900",
      oldPrice: "1800",
      image: "/hero-image.png",
      discount: "50%",
    },
    {
      title: "تنمية مهارات Soft Skills",
      instructor: "م. عبد الرحمن",
      category: "المهارات الشخصية",
      rating: 4.7,
      students: 5100,
      hours: 28,
      price: "4,200",
      oldPrice: "8,400",
      image: "/hero-image.png",
      discount: "50%",
    },
    {
      title: "الذكاء الاصطناعي المتقدم",
      instructor: "د. أحمد محمود",
      category: "الذكاء الاصطناعي",
      rating: 4.9,
      students: 6000,
      hours: 28,
      price: "4,200",
      oldPrice: "8,400",
      image: "/hero-image.png",
      discount: "50%",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            اكتشف
          </h2>
          <h3 className="text-2xl sm:text-3xl font-medium text-gray-800">
            أفضل الدورات
          </h3>
        </div>
        
        <Link href="/list-of-courses" className="w-full sm:w-auto">
          <button className="bg-primary hover:bg-primary/90 transition text-white px-4 sm:px-6 py-2 rounded-lg font-bold text-sm sm:text-base w-full sm:w-auto">
            عرض جميع الدورات
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-44 sm:h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {course.discount}
              </span>

              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {course.category}
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 leading-snug line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4 font-medium">
                {course.instructor}
              </p>

              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock size={16} className="text-primary/70" />
                  <span>{course.hours} ساعة</span>
                </div>

                <div className="flex items-center gap-1.5 font-medium">
                  <User size={16} className="text-primary/70" />
                  <span>{course.students.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-1 font-bold text-yellow-500">
                  <span>{course.rating}</span>
                  <Star size={16} fill="currentColor" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-primary block leading-none">
                    {course.price.toLocaleString()} EGP
                  </span>
                  <span className="text-sm line-through text-gray-400 mt-1 block">
                    {course.oldPrice.toLocaleString()} EGP
                  </span>
                </div>

                <button className="px-4 py-2 text-sm font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                  التسجيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
