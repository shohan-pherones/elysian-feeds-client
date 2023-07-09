import Image from "next/image";
import SectionTitle from "./SectionTitle";

const OurVision = () => {
  return (
    <section id="our-vision" className="wrapper section-padding">
      <SectionTitle title="Our Vision" />

      <div className="flex flex-col gap-20 text-xl">
        {/* PART 1 */}
        <div className="grid lg:grid-cols-5 gap-20">
          <div className="space-y-5 lg:col-span-3">
            <p className="text-9xl font-bold opacity-10">01</p>
            <h3 className="text-5xl font-semibold uppercase">
              Harmony for Hounds and Felines
            </h3>
            <p>
              With 80 rescue volunteers, 2 shelter homes capable of housing 600
              homeless animals, and 3 medical service centers staffed by 8
              dedicated veterinary doctors, we ensure the health and well-being
              of over 450 needy animals.
            </p>
            <p>
              Alongside our commitment to humans, our organization is also
              dedicated to animal welfare. Our vision encompasses a world where
              compassion knows no species boundaries, eradicating hunger and
              suffering for all. Through our dedicated efforts, including
              feeding of needy animals with nutritious animal-friendly foods, we
              alleviate the plight of needy animals, providing not only
              sustenance but also essential medical care and shelter. Our
              holistic approach aims to cultivate empathy and foster a society
              where the well-being of every living being is cherished and
              protected.
            </p>
          </div>
          <div className="lg:col-span-2 w-full h-full overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/1981111/pexels-photo-1981111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Black and White Bicolor Cat"
              width={1280}
              height={720}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* PART 2 */}
        <div className="grid lg:grid-cols-5 gap-20">
          <div className="order-2 lg:order-1 lg:col-span-2 w-full h-full overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="A Group of Volunteers Assisting an Elderly Person on a Black Wheelchair For Charity"
              width={1280}
              height={720}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5 lg:col-span-3 order-1 lg:order-2">
            <p className="text-9xl font-bold opacity-10 lg:text-right">02</p>
            <h3 className="text-5xl font-semibold uppercase lg:text-right">
              A True Friend in Need
            </h3>
            <p className="lg:text-right">
              Having more than 200 food suppliers and 60 volunteers, we serve
              nutritious and balanced diets to 4 assisted living facilities with
              over 400 elderly individuals, 6 orphanages with more than 600
              children, and an average of 200 homeless people on a regular
              basis.
            </p>
            <p className="lg:text-right">
              Our organization is dedicated to human welfare and envisions a
              future where no individual experiences hunger. Through tireless
              efforts, we collect surplus food from restaurants and events,
              transforming it into nourishing meals for the less fortunate. We
              strive to eliminate hunger by bridging the gap between food waste
              and the needs of underprivileged individuals. With compassion and
              determination, we envision a society where every person has access
              to an ample supply of nutritious food, ensuring their well-being
              and preserving their dignity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
