"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ConsumerCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  consumptions: number;
  index: number;
}

const ConsumerCard: React.FC<ConsumerCardProps> = ({
  index,
  id,
  name,
  image,
  address,
  consumptions,
}) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "-100%" }}
        whileInView={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 1.35, delay: index / 10 }}
        className="card w-full bg-base-300 shadow-xl"
      >
        <figure>
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            priority
            className="h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate">{name}</h2>
          <p className="truncate">Address: {address}</p>
          <p className="truncate">Total Consumptions: {consumptions}</p>
          <div className="card-actions justify-start mt-3 md:mt-0">
            <Link href={`/providers/${id}`} className="btn btn-accent">
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsumerCard;
