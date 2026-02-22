import Button from "@/app/components/ui/Button";
import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export default function CourseErrorState({
  title = "حدث خطأ",
  message = "لم نتمكن من تحميل بيانات الدورة. يرجى المحاولة مرة أخرى.",
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#FFF3EB] flex flex-col items-center justify-center text-center px-4" dir="rtl">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-[#FF6400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#113555] mb-2">{title}</h2>
      <p className="text-[#113555]/60 mb-6 max-w-md">{message}</p>
      <Link href="/">
        <Button variant="primary" size="md">
          العودة للرئيسية
        </Button>
      </Link>
    </div>
  );
}
