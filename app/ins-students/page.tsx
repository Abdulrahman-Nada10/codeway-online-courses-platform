import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";
import StudentsMainContent from "./components/StudentsMainContent";

export default function Page() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main dir="rtl" className="p-8 md:mr-64">
        <StudentsMainContent />
      
      </main>
    </>
  );
}









