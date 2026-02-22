import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import Earnings from "./components/Earnings";
export default function Page() {
  return (
    <>
      <Sidebar />
      <Navbar />

      <main dir="rtl" className="p-8 md:mr-64">
        <Earnings />
      </main>
    </>
  );
}


