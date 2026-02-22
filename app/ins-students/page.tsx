import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import StudentsMainContent from "./components/StudentsMainContent";

export const metadata = {
  title: "الطلاب | منصة التعلم الإلكترونية",
  description: "متابعة تقدم الطلاب في دوراتك",
};

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-[#FCF8F4] flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          <StudentsMainContent />
        </main>
      </div>
    </>
  );
}
