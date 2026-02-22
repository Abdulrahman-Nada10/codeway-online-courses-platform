export function InstructorCardSkeleton() {
  return (
    <section className="w-full max-w-5xl bg-white rounded-3xl p-5 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-4" />

      <div className="flex flex-col sm:flex-row gap-6">
  
        <div className="w-24 h-24 rounded-2xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-40 bg-gray-200 rounded" />

          <div className="flex gap-4">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-28 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>

          <div className="h-9 w-36 bg-gray-200 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

export function CurriculumSkeleton() {
  return (
    <section className="w-full max-w-5xl bg-white p-5 rounded-3xl animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="h-10 bg-gray-200 rounded-full mt-6" />
    </section>
  );
}

export function CourseHeaderSkeleton() {
  return (
    <section className="w-full bg-[#113555] pt-20 pb-16 px-6 md:px-16 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-10 animate-pulse">
        
 
        <div className="w-full md:w-[320px]">
          <div className="h-44 bg-gray-300 rounded-t-xl" />

          <div className="bg-white p-5 rounded-b-xl space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-3 w-40 bg-gray-200 rounded mx-auto" />
          </div>
        </div>


        <div className="flex-1 space-y-5">
          <div className="h-6 w-28 bg-gray-300 rounded-full" />
          <div className="h-7 w-3/4 bg-gray-300 rounded" />
          <div className="h-4 w-2/3 bg-gray-300 rounded" />

          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-lg" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function WhatYouWillLearnSkeleton() {
  return (
    <div className="bg-white w-full max-w-5xl rounded-3xl p-5 animate-pulse">
      

      <div className="h-6 w-64 bg-gray-200 rounded mb-6" />

 
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, col) => (
          <ul key={col} className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-start gap-3">
                
          
                <div className="w-5 h-5 rounded-full bg-gray-200 mt-1 shrink-0" />

  
                <div className="h-4 bg-gray-200 rounded w-full" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}