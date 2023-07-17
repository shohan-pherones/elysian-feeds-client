"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

const OurVision = () => {
  return (
    <section id="our-vision" className="wrapper section-padding">
      <SectionTitle title="Our Vision" />

      <div className="flex flex-col gap-10 md:gap-20 md:text-xl">
        {/* PART 1 */}
        <div className="grid xl:grid-cols-5 gap-10 md:gap-20">
          <div className="space-y-5 xl:col-span-3">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="text-7xl md:text-9xl font-bold opacity-10"
              >
                01
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
                className="text-3xl md:text-5xl font-semibold uppercase"
              >
                Harmony for Hounds and Felines
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
              >
                With 80 rescue volunteers, 2 shelter homes capable of housing
                600 homeless animals, and 3 medical service centers staffed by 8
                dedicated veterinary doctors, we ensure the health and
                well-being of over 450 needy animals.
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
              >
                Alongside our commitment to humans, our organization is also
                dedicated to animal welfare. Our vision encompasses a world
                where compassion knows no species boundaries, eradicating hunger
                and suffering for all. Through our dedicated efforts, including
                feeding of needy animals with nutritious animal-friendly foods,
                we alleviate the plight of needy animals, providing not only
                sustenance but also essential medical care and shelter. Our
                holistic approach aims to cultivate empathy and foster a society
                where the well-being of every living being is cherished and
                protected.
              </motion.p>
            </div>
          </div>
          <div className="xl:col-span-2 w-full h-full overflow-hidden">
            <motion.div
              initial={{ y: "-100%" }}
              whileInView={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
              className="w-full h-full"
            >
              <Image
                src="https://images.pexels.com/photos/1981111/pexels-photo-1981111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Black and White Bicolor Cat"
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        {/* PART 2 */}
        <div className="grid xl:grid-cols-5 gap-10 md:gap-20">
          <div className="order-2 xl:order-1 xl:col-span-2 w-full h-full overflow-hidden">
            <motion.div
              initial={{ y: "-100%" }}
              whileInView={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
              className="w-full h-full"
            >
              <Image
                src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="A Group of Volunteers Assisting an Elderly Person on a Black Wheelchair For Charity"
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <div className="space-y-5 xl:col-span-3 order-1 xl:order-2">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="text-7xl md:text-9xl font-bold opacity-10 xl:text-right"
              >
                02
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
                className="text-3xl md:text-5xl font-semibold uppercase xl:text-right"
              >
                A True Friend in Need
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
                className="xl:text-right"
              >
                Having more than 200 food suppliers and 60 volunteers, we serve
                nutritious and balanced diets to 4 assisted living facilities
                with over 400 elderly individuals, 6 orphanages with more than
                600 children, and an average of 200 homeless people on a regular
                basis.
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
                className="xl:text-right"
              >
                Our organization is dedicated to human welfare and envisions a
                future where no individual experiences hunger. Through tireless
                efforts, we collect surplus food from restaurants and events,
                transforming it into nourishing meals for the less fortunate. We
                strive to eliminate hunger by bridging the gap between food
                waste and the needs of underprivileged individuals. With
                compassion and determination, we envision a society where every
                person has access to an ample supply of nutritious food,
                ensuring their well-being and preserving their dignity.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
