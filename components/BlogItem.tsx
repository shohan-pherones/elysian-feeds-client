"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface BlogItemProps {
  blog: {
    id: string;
    title: string;
    banner: string;
    author: string;
    publishedDate: string;
    body: string;
  };
  index: number;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, index }) => {
  return (
    <div className="overflow-hidden h-full">
      <motion.div
        initial={{ y: "-100%" }}
        whileInView={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 1, delay: index / 20 }}
        className="card h-full w-full bg-base-300 border border-white/30"
      >
        <figure>
          <Image
            src={blog.banner}
            alt={blog.title}
            width={400}
            height={300}
            priority
            className="h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          <div className="flex items-center justify-between gap-5">
            <p>{blog.author}</p>
            <p>{blog.publishedDate}</p>
          </div>
          <hr className="border-white/30" />
          <p className="opacity-60">{blog.body.substring(0, 200)}...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogItem;
