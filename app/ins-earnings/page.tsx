import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import Earnings from "./components/Earnings";

export const metadata = {
  title: "الأرباح | منصة التعلم الإلكترونية",
  description: "تتبع أرباحك ومعاملاتك المالية",
};

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="md:mr-64 min-h-screen bg-gradient-to-br from-[#FDFBF7] via-orange-50/30 to-[#FDFBF7] flex flex-col">
        <Navbar />
        <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
          <Earnings />
        </main>
      </div>
    </>
  );
}
