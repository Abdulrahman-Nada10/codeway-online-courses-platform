import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] overflow-x-hidden">
      {/* <Navbar />
      <Sidebar /> */}
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <Testimonials/>
      <CTA />
      <Footer />
    </main>
  );
}