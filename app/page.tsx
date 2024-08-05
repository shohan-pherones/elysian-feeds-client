import Consumers from "@/components/Consumers";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import OurVision from "@/components/OurVision";
import Providers from "@/components/Providers";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
  return (
    <main className="mt-16">
      <Hero />
      <OurVision />
      <Providers />
      <Consumers />
      <OurStory fromHome />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;
