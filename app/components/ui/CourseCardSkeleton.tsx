const CourseCardSkeleton = () => {
    return (
    <div className=" flex flex-col animate-pulse rounded-xl bg-gray-200/70 shadow p-3">
        <div className="h-40 w-full rounded-lg bg-gray-100 mb-3" />
        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />

        <div className="flex gap-2 mb-3">
            <div className="h-3 w-10 bg-gray-100 rounded" />
            <div className="h-3 w-10 bg-gray-100 rounded" />
            <div className="h-3 w-10 bg-gray-100 rounded" />
        </div>

        <div className="flex items-center justify-between">
        <div className="h-5 w-16 bg-gray-100 rounded " />
            <div className="h-10 w-16 bg-gray-100 rounded-lg " />
        </div>
    </div>
    );
};
export default CourseCardSkeleton;
