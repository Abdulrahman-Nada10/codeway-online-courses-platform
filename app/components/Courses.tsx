import { Star, Clock, User } from "lucide-react";

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
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mb-8 sm:mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-500">
            أفضل الدورات
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-600">
            اكتشف
          </h3>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 sm:px-6 py-2 rounded-lg font-bold text-sm sm:text-base w-full sm:w-auto">
          عرض جميع الدورات
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <div className="relative h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded-2xl">
                {course.discount}
              </span>

              <span className="absolute top-3 right-3 bg-gray-500/80 text-white text-xs px-2 py-1 rounded-2xl">
                {course.category}
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="font-bold text-base sm:text-lg mb-2 leading-snug">
                {course.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {course.instructor}
              </p>

              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  {course.hours} ساعة
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                  <User size={16} className="sm:w-5 sm:h-5" />
                  {course.students.toLocaleString()}
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg text-yellow-500 font-semibold">
                  {course.rating}
                  <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-base sm:text-lg font-bold text-orange-600">
                    {course.price.toLocaleString()} EGP
                  </span>
                  <span className="block text-sm line-through text-gray-400">
                    {course.oldPrice.toLocaleString()} EGP
                  </span>
                </div>

                <button className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-lg border border-orange-500 text-black hover:bg-orange-500 hover:text-white transition">
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
