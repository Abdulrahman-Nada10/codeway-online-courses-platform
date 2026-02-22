import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";

export default function Page() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main dir="rtl" className="p-8 md:mr-64">
        <h1 className="text-2xl font-bold mb-2">نظرة عامة</h1>
        <p className="text-gray-600">هذه صفحة نظرة عامة للمدرّس. أضف هنا إحصاءات وتعليمات سريعة.</p>
      </main>
    </>
  );
}
