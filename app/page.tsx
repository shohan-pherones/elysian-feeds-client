import Consumers from "@/components/Consumers";
import Hero from "@/components/Hero";
import Providers from "@/components/Providers";

const HomePage = () => {
  return (
    <main className="mt-16">
      <Hero />
      <Providers />
      <Consumers />
    </main>
  );
};

export default HomePage;
