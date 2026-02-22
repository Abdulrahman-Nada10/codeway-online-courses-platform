"use client"
import { useState } from "react";
import { Search, Funnel } from "lucide-react";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FavoriteCourseCard from "../components/FavoriteCourseCard";
import CourseCardSkeleton from "../components/ui/CourseCardSkeleton";
import ErrorState from "../components/ui/ErrorState";
import CustomDropdown from "../components/ui/CustomDropdown";

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "popular", label: "الأكثر شعبية" },
  { value: "rated", label: "الأعلى تقييماً" },
];

const ListOfCoursesPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isError = false;
  const favoriteCourses = useSelector((state: RootState) => state.favorites.courses)
  const hasMore = true;

  if(isError)
  {
    return(
        <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#fdf6ef]">
            <ErrorState  />
        </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdf6ef] flex flex-col ">
      
      <section className="text-center pt-14 pb-10 px-4">
        <h1 className="text-4xl md:text-[40px] font-bold mb-3 text-[#FF6400]">
          الدورات التعليمية
        </h1>
        <p className="text-[#113555] text-sm">
          اكتشف أكثر من 60+ دورة تعليمية في مختلف المجالات مع أفضل المدربين العرب
        </p>
      </section>

      <section className="w-full  max-w-3xl lg:max-w-6xl  mx-auto px-4 mb-10">
        <div className="bg-linear-to-r from-[#f5a10f75] to-[#ff660089] flex flex-col md:flex-row  md:items-center gap-5 px-9 pt-3.5 pb-10 rounded-2xl shadow-sm">
          <div className="flex-1 relative">
            <Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن دوره او المدرس ..."
              className="w-full bg-[#EDEFF2] rounded-xl py-2.5 pr-10 pl-4 text-sm text-[#626262B8] placeholder-gray-400 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <CustomDropdown
            options={SORT_OPTIONS}
            value={sort}
            onChange={setSort}
          />

          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`
              w-fit
              flex items-center gap-1.5 bg-[#D9D9D9] hover:bg-white
              text-[#535353] font-semibold text-sm px-4 py-2.5 rounded-full
              transition-all whitespace-nowrap shadow-sm
              ${showFilters ? "bg-white ring-2 ring-orange-300" : ""}
            `}
          >
            <Funnel size={16} />
            فلاتر
          </button>
          </div>
        </div>
      
        {showFilters && (
          <div className="mt-3 bg-white rounded-2xl p-5 shadow-md border border-orange-100 flex flex-wrap gap-3">
            {["برمجة", "تصميم", "تسويق", "لغات", "أعمال"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-1.5 rounded-full border border-orange-300 text-orange-600 text-sm hover:bg-orange-50 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="w-full mx-auto  sm:max-w-3xl lg:max-w-6xl px-4 pb-6 mt-3">
        
        {
        isLoading?
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 lg:gap-x-15 gap-y-8">

      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
        ):favoriteCourses.length===0? (
          <p className="text-center text-[#113555] py-16 text-lg">
            لا توجد دورات مطابقة للبحث
          </p>
        ) : (
         <>
         <h2 className=" text-center sm:text-right text-sm md:text-base font-medium mb-7">عرض {favoriteCourses.length} دورات</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 lg:gap-x-15 gap-y-8  w-full place-items-center">

            {favoriteCourses.map((course) => (
              <FavoriteCourseCard key={course.id} course={course} />
            ))}
          </div>
         </>
        )}
      </section>

      {hasMore && (
        <div className="flex justify-center py-10">
          <Button size="lg" >
            عرض المزيد من الدورات
          </Button>
        </div>
      )}

    </div>
  );
};

export default ListOfCoursesPage;

