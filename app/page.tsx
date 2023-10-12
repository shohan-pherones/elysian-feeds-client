import Consumers from "@/components/Consumers";
import Hero from "@/components/Hero";
import Providers from "@/components/Providers";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import OurVision from "@/components/OurVision";
import OurStory from "@/components/OurStory";

const HomePage = () => {
  return (
    <main className="mt-16">
      <Hero />
      <OurVision />
      <Providers />
      <Consumers />
      <Gallery />
      <Testimonials />
      <OurStory fromHome />
    </main>
  );
};

export default HomePage;
