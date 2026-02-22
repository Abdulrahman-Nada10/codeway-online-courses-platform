import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import CertificatesDashboard from "./components/CertificatesDashboard";

export const metadata = {
    title: "الشهادات | منصة التعلم الإلكترونية",
    description: "إدارة شهادات الطلاب ومتابعتها",
};

export default function Page() {
    return (
        <>
            <Sidebar />
            <div className="md:mr-64 min-h-screen bg-[#fdfaf7] flex flex-col">
                <Navbar />
                <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8">
                    <CertificatesDashboard />
                </main>
            </div>
        </>
    );
}
