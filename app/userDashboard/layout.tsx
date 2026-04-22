import Navbar from "../components/NavbarUser";
import Sidebar from "../components/SidebarUser";



export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <main className="p-4">
          {children}
        </main>
      </div>

    </div>
  )
}





















