import Hero from "@/components/sections/Hero";
import CoffeeStory from "@/components/sections/CoffeeStory";
import MenuStory from "@/components/sections/MenuStory";
import WhyBelluno from "@/components/sections/WhyBelluno";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
// Force update 1
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="bg-transparent dummy-hash-1">
      <Navbar />
      <Hero />
      <CoffeeStory />
      <MenuStory />
      <WhyBelluno />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
