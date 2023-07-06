"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Consumers from "@/components/Consumers";
import Hero from "@/components/Hero";
import Providers from "@/components/Providers";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import OurVision from "@/components/OurVision";

const HomePage = () => {
  useSmoothScroll();

  return (
    <main className="mt-16">
      <Hero />
      <OurVision />
      <Providers />
      <Consumers />
      <Gallery />
      <Testimonials />
    </main>
  );
};

export default HomePage;
