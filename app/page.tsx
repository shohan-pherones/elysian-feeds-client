import Consumers from "@/components/Consumers";
import Hero from "@/components/Hero";
import Providers from "@/components/Providers";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import OurVision from "@/components/OurVision";
import OurStory from "@/components/OurStory";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Blogs from "@/components/Blogs";

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
      <Blogs />
      <FAQ />
      <Contact />
    </main>
  );
};

export default HomePage;
