import Link from "next/link";
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";

export default function Page() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main dir="rtl" className="p-8 md:mr-64">
        <h1 className="text-2xl font-bold mb-2">تم تسجيل الخروج</h1>
        <p className="text-gray-600 mb-4">تم تسجيل خروجك بنجاح. اضغط للعودة إلى الصفحة الرئيسية.</p>
        <Link href="/" className="text-orange-600 underline">العودة إلى الصفحة الرئيسية</Link>
      </main>
    </>
  );
}
