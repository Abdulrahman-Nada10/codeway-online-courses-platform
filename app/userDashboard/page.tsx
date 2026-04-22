import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarUser";


export default function UserProfile() {
  return (
    <main className="min-h-screen bg-[#FFF3EB] overflow-x-hidden">
      <Navbar />
      <Sidebar />
    </main>
  );
}