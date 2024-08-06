"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryItemProps {
  src: string;
  alt: string;
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, index }) => {
  return (
    <div className="w-full h-[25rem] overflow-hidden rounded-xl group hover:scale-90 duration-700">
      <motion.div
        initial={{ scale: 0, borderRadius: "100px" }}
        whileInView={{ scale: 1, borderRadius: "0.75rem" }}
        transition={{ ease: "easeInOut", duration: 0.75, delay: index / 10 }}
        className="w-full h-full overflow-hidden rounded-xl"
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          priority
          className="w-full h-full object-cover group-hover:scale-125 duration-1000"
        />
      </motion.div>
    </div>
  );
};

export default GalleryItem;
