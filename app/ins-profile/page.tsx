import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import ProfileContent from "./components/ProfileContent";

export const metadata = {
  title: "الملف الشخصي | منصة التعلم الإلكترونية",
  description: "عرض وإدارة معلوماتك الشخصية",
};

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-[#FDFBF7] flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          <ProfileContent />
        </main>
      </div>
    </>
  );
}
