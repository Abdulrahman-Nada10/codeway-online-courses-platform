import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import InstructorDashboard from "./components/InstructorDashboard";

export const metadata = {
  title: "لوحة التحكم - المدرب | منصة التعلم الإلكترونية",
  description: "لوحة تحكم المدرب - إدارة الدورات والطلاب والأرباح",
};

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-page-bg flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          <InstructorDashboard />
        </main>
      </div>
    </>
  );
}
