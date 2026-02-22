import React from "react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

const StarRating = React.memo(({ rating, max = 5, size = "md" }: StarRatingProps) => {
  const starSize = sizeMap[size];
  return (
    <div className="flex items-center gap-0.5" aria-label={`تقييم ${rating} من ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <svg
            key={i}
            className={starSize}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {partial ? (
              <>
                <defs>
                  <linearGradient id={`partial-${i}`}>
                    <stop offset={`${(rating % 1) * 100}%`} stopColor="#FF6400" />
                    <stop offset={`${(rating % 1) * 100}%`} stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  fill={`url(#partial-${i})`}
                />
              </>
            ) : (
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={filled ? "#FF6400" : "#d1d5db"}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
});

StarRating.displayName = "StarRating";
export default StarRating;
