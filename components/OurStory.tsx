"use client";

import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface OurStoryProps {
  fromHome?: boolean;
}

const OurStory: React.FC<OurStoryProps> = ({ fromHome }) => {
  return (
    <section className="wrapper section-padding min-h-screen">
      <SectionTitle title="Our Story" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="w-full rounded-xl overflow-hidden h-[20rem] group hover:scale-90 duration-500">
          <motion.div
            initial={{ y: "-100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Man Assisting Person with Walker"
              width={360}
              height={640}
              priority
              className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            />
          </motion.div>
        </div>
        <div className="w-full rounded-xl overflow-hidden h-[20rem] group hover:scale-90 duration-500">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/3996734/pexels-photo-3996734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Man In Blue Clothing Giving An Old Man Water"
              width={360}
              height={640}
              priority
              className="w-full h-[20rem] object-cover group-hover:scale-125 duration-1000"
            />
          </motion.div>
        </div>
        <div className="w-full h-[20rem] rounded-xl overflow-hidden group hover:scale-90 duration-500">
          <motion.div
            initial={{ y: "-100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/6647011/pexels-photo-6647011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Volunteers Cleaning the Street"
              width={360}
              height={640}
              priority
              className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            />
          </motion.div>
        </div>
        <div className="w-full h-[20rem] rounded-xl overflow-hidden group hover:scale-90 duration-500">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.6 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/6647009/pexels-photo-6647009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Volunteers Cleaning the Street"
              width={360}
              height={640}
              priority
              className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            />
          </motion.div>
        </div>
        <div className="hidden lg:block w-full h-[20rem] rounded-xl overflow-hidden group hover:scale-90 duration-500">
          <motion.div
            initial={{ y: "-100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.8 }}
            className="w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="A Woman Wearing Face Mask while Holding a Patient's Hand"
              width={360}
              height={640}
              priority
              className="w-full h-full object-cover group-hover:scale-125 duration-1000"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center mt-10">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "-100%" }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="text-4xl md:text-8xl font-bold uppercase text-center"
          >
            We are <span className="text-accent">Elysian Feeds</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 md:text-xl">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "-100%" }}
              whileInView={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
            >
              With 80 rescue volunteers, 2 shelter homes capable of housing 600
              homeless animals, and 3 medical service centers staffed by 8
              dedicated veterinary doctors, we ensure the health and well-being
              of over 450 needy animals.
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "-100%" }}
              whileInView={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
            >
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
            </motion.p>
          </div>
        </div>

        {!fromHome && (
          <div className="flex justify-center mt-5">
            <Link href="/" className="btn btn-accent">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurStory;
