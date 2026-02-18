'use client';

import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeFromFavorites } from '../store/favoritesSlice';


interface FavoriteCourse {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
  rating: number;
  studentsCount: number;
  hoursCount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

const FavoriteCourseCard = ({ course }: { course: FavoriteCourse }) => {
  const dispatch = useDispatch()
  return (
    <div className="w-full max-w-86 h-96.25 bg-white rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-45">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        
        <div className="absolute top-2 right-3 bg-[#F7F7F7CC] px-2.5 py-2 rounded-full">
          <span className="font-cairo text-xs font-medium text-[#113555]">
            {course.category}
          </span>
        </div>
        
        <div className="absolute top-3 left-3 w-12.5 h-6.25 bg-[#EB4335] rounded-[14px] flex items-center justify-center">
          <span className="font-cairo font-bold text-white">
            {course.discount}%
          </span>
        </div>
        
        <button 
          className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label="إزالة من المفضلة"
          onClick={() => dispatch(removeFromFavorites(course.id))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="font-cairo font-bold text-base text-[#113555] line-clamp-2">
          {course.title}
        </h3>

        <p className="font-cairo text-sm font-medium text-[#1E3A8A] -mt-1">
          م. {course.instructor}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mt-5">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00976 0.690964C6.30911 -0.230346 7.61252 -0.230344 7.91187 0.690967L8.86919 3.63727C9.00306 4.04929 9.38702 4.32825 9.82024 4.32825H12.9182C13.8869 4.32825 14.2897 5.56787 13.506 6.13727L10.9997 7.95819C10.6492 8.21283 10.5025 8.6642 10.6364 9.07622L11.5937 12.0225C11.8931 12.9438 10.8386 13.71 10.0549 13.1406L7.5486 11.3196C7.19812 11.065 6.72352 11.065 6.37303 11.3196L3.86675 13.1406C3.08304 13.71 2.02856 12.9438 2.32791 12.0225L3.28523 9.07622C3.4191 8.6642 3.27244 8.21283 2.92196 7.95819L0.415677 6.13727C-0.368036 5.56787 0.0347416 4.32825 1.00346 4.32825H4.10139C4.53462 4.32825 4.91857 4.04929 5.05245 3.63727L6.00976 0.690964Z" fill="#F5A00F"/>
            </svg>
            <span className="font-cairo font-medium">{course.rating}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.67934 10.5879L6.39841 10.3976C6.94083 10.2569 7.49734 10.1123 7.94681 9.97281C7.59189 9.44004 7.2916 8.87476 7.05028 8.28508C6.88519 8.14371 6.73797 7.98381 6.61168 7.80874C6.36292 7.47002 6.18516 7.08709 6.08856 6.68176C6.02497 6.4229 5.99257 6.15774 5.99199 5.89162C5.98613 5.45097 6.08819 5.01528 6.28975 4.62045C6.33513 3.75719 6.57584 2.91425 6.99475 2.15158C6.51298 1.79907 5.92682 1.60718 5.32361 1.6045C3.70721 1.60646 2.38618 2.98157 2.35238 4.69158C2.22466 4.89686 2.16002 5.13331 2.16606 5.37307C2.16605 5.50658 2.18254 5.63962 2.21516 5.76932C2.26284 5.97172 2.35103 6.16305 2.47471 6.33242C2.55353 6.44341 2.65139 6.54042 2.76403 6.61923C2.97299 7.17578 3.27658 7.69437 3.66216 8.1534C3.66216 8.15809 3.66216 8.16277 3.66216 8.16707C3.66216 8.17137 3.66216 8.18896 3.66014 8.20381C3.54916 8.26592 3.43168 8.31635 3.30967 8.35425C2.98776 8.46757 2.54512 8.58403 2.07271 8.70595L1.62243 8.82318C0.900944 9.0295 0.0338008 9.70827 0 11.7829C0 11.8063 0 11.8305 0 11.854L0.00363487 11.9274L0.0193287 12.2236L0.306213 12.3253L0.377044 12.3495C1.26579 12.6563 2.18623 12.8684 3.12216 12.9821C3.32151 12.4143 3.65751 11.9008 4.10227 11.4844C4.54703 11.068 5.08769 10.7606 5.67934 10.5879ZM17.4505 11.2831C17.2134 11.219 16.9801 11.158 16.7543 11.0982C16.02 10.9079 15.3266 10.727 14.8164 10.5465C14.6291 10.4871 14.4489 10.4085 14.2788 10.312C14.2788 10.2968 14.2788 10.2815 14.2768 10.2706C14.2748 10.2596 14.2768 10.2464 14.2768 10.2338C14.8789 9.5155 15.3542 8.70512 15.6832 7.8357C15.856 7.71263 16.0067 7.56279 16.1294 7.39219C16.3241 7.12462 16.4632 6.82279 16.539 6.50357C16.5883 6.30137 16.6132 6.09432 16.6135 5.88654C16.6221 5.51247 16.521 5.14373 16.3221 4.82327C16.2759 2.1594 14.2156 0.00273538 11.6757 0C9.15035 0.00273538 7.0861 2.15157 7.03218 4.82365C6.83259 5.14497 6.73153 5.51492 6.74085 5.89006C6.74114 6.09848 6.76693 6.30614 6.81769 6.50865C6.89259 6.8246 7.03037 7.12328 7.2233 7.38788C7.34699 7.56115 7.49958 7.71316 7.67479 7.83766C8.00275 8.70645 8.4772 9.51622 9.07873 10.2338C9.07914 10.241 9.07914 10.2482 9.07873 10.2553C9.07873 10.2706 9.07672 10.2897 9.07551 10.3132C8.902 10.4099 8.71842 10.4885 8.52785 10.5476C8.02688 10.7243 7.33236 10.9064 6.59638 11.0978L5.8922 11.2835C4.76551 11.6062 3.40986 12.6656 3.35715 15.9086C3.35715 15.9442 3.35715 15.9825 3.35715 16.0192L3.36319 16.1337L3.38691 16.5967L3.83479 16.7531L3.94624 16.7921C8.96775 18.4026 14.3894 18.4026 19.4109 16.7921L19.5272 16.7507L19.9895 16.5858L19.9972 16.1075L20 15.977V15.8754C19.9417 12.6668 18.588 11.6074 17.4505 11.2831Z" fill="black"/>
            </svg>
            <span className="font-cairo font-medium">{course.studentsCount}</span>
          </div>

          <div className="flex items-center gap-2.5 ">
            <svg width="20" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z" fill="black"/>
              <path d="M10 5V10L13.5 13.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-cairo font-medium">{course.hoursCount} ساعة</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 ">
          <div className="flex items-center gap-1">
            <span className="font-cairo text-sm font-medium text-[#FF6400]">
              {course.discountedPrice}
            </span>
            <span className="font-cairo text-xs font-medium text-[#FF6400]">EGP</span>
            <span className="font-cairo text-xs font-medium text-gray-400 line-through mx-1">
              {course.originalPrice}
            </span>
            <span className="font-cairo text-xs font-medium text-gray-400">EGP</span>
          </div>

          <button className="w-20 h-8 rounded-lg font-cairo font-semibold text-sm border border-[#FF6400] text-black hover:bg-[#FF6400] hover:text-white transition-all duration-200">
            سجل الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCourseCard;

